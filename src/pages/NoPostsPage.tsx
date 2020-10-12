import React, {useEffect, useRef, useState} from 'react';
import cytoscape from 'cytoscape';
import {options} from '../utils/cytoscapeOptions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import stc from 'string-to-color';
import {invertColor} from "../utils/invertColor";
import Box from '@material-ui/core/Box';
import NodeCard from "../components/NodeCard";


const NoPostsPage = () => {
  const cy: any = useRef();
  const firstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [subredditName, setSubredditName] = useState("");
  const [postCount, setPostCount] = useState(10);
  const [nodeChecked, setNodeChecked] = useState("node1");
  const [currentEdge, setCurrentEdge] = useState("");
  const [currentNodeData, setCurrentNodeData] = useState({
    id: "",
    type: "",
    degree: 0,
    edgesSource: null,
    edgesTarget: null,
  });

  const fetchData = () => {
    if (!subredditName) return;
    setLoading(true);
    fetch(`/api/graph?subreddit=${subredditName}&post_count=${postCount}`, {})
      .then(res => res.json())
      .then(doc => {
        if (doc.code === 200) {
          appendNodes(doc.data);
          localStorage.setItem(doc.data[0], JSON.stringify(doc.data));
        } else {
          console.log(doc.message)
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("ERROR!!!", err);
        setLoading(false);
      })
  };


  useEffect(() => {
    if (firstLoad.current) {
      cy.current = cytoscape({
        container: document.getElementById('cy'),
      });
      cy.current.on('click', 'node', handleNodeClick);
      cy.current.on('click', 'edge', handleEdgeClick);
      firstLoad.current = false;
      loadFromStorage();
    }
  });

  const loadFromStorage = () => {
    const postsStorage = Object.entries(localStorage);
    postsStorage.forEach((posts) => {
      appendNodes(JSON.parse(posts[1]));
    });
  };

  const appendNodes = (posts: any[]) => {
    const subredditName = posts[0];
    addNode(subredditName, "subreddit");
    colorNode(subredditName, invertColor(stc(subredditName)));
    for (let i = 1; i < posts.length; i++) {
      const nodeId = posts[i].author;
      addNode(nodeId, "author");
      colorNode(nodeId, stc(subredditName));
      addEdge(subredditName, nodeId);
    }
    cy.current.layout(options).run();
  };

  const addNode = (id: string, type: string) => {
    cy.current.add([
      {group: 'nodes', data: {id: id, type: type}},
    ]);
  };

  const removeNode = (id: string) => {
    cy.current.remove(cy.current.$(`#${id}`));
  };

  const addEdge = (source: string, target: string) => {
    cy.current.add([
      {group: 'edges', data: {id: source + "__" + target, source: source, target: target}}
    ]);
  };

  const resetEdge = () => {
    setCurrentEdge("");
  };

  const colorNode = (nodeId: string, color: string) => {
    cy.current.getElementById(nodeId).style("background-color", color);
  };

  const handleNodeClick = (e: any) => {
    const node = e.target; // event target
    const currentNode = {
      id: node.id(),
      type: node.data().type,
      degree: node.degree(),
      edgesSource: cy.current.edges(`[source = "${node.id()}"]`),
      edgesTarget: cy.current.edges(`[target = "${node.id()}"]`),
    };
    setCurrentNodeData(currentNode);
    resetEdge();
  };

  const handleEdgeClick = (e: any) => {
    const edge = e.target; // event target
    const currentEdge = edge.id();
    setCurrentEdge(currentEdge);
  };

  const handleCheckbox = (nodeId: string) => {
    setNodeChecked(nodeId);
  };

  return (
    <>
      {loading &&
      <div className={"loading-spinner"}>
          <CircularProgress color="secondary" size={50}/>
      </div>}
      <div className={"scrape-controls__div"}>
        <Grid container spacing={2} alignItems={"baseline"}>
          <Grid item xs={3}>
            <Typography id="slider" variant={"body2"}>
              Post Count
            </Typography>
            <Slider
              defaultValue={10}
              min={1}
              max={100}
              valueLabelDisplay={'on'}
              aria-labelledby="slider"
              onChangeCommitted={(e, value) => setPostCount(value as number)}
            />
          </Grid>
          <Grid item xs={2}>
            <div className={"line-high"}>
              <TextField
                id="standard-basic"
                label="Subreddit Name"
                aria-labelledby="subredditName"
                onChange={(e) => setSubredditName(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={"line-high"}>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Generate Subreddit
              </Button>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={"line-high"}>
              <Button variant="contained" color="secondary" onClick={() => localStorage.clear()}>
                Delete Graph
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Box display="flex" flexWrap="nowrap">
        <div id="cy" className={'cytoscape__div'}/>
        <NodeCard
          node={currentNodeData}
          edge={currentEdge}
          resetEdge={resetEdge}
          handleCheckbox={handleCheckbox}
          nodeChecked={nodeChecked}
          removeNode={removeNode}
          addEdge={addEdge}
          cy={cy.current}
        />
      </Box>
    </>
  );
};

export default NoPostsPage;