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
import NodeInformation from "../components/NodeInformation";


const NoPostsPage = () => {
  const [cy, setCy] = useState<cytoscape.Core>();
  const [cyData, setCyData] = useState<string[] | object[]>([]);
  const firstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [subredditName, setSubredditName] = useState("");
  const [postCount, setPostCount] = useState(10);

  const fetchData = () => {
    if (!subredditName) return;
    setLoading(true);
    fetch(`/api/graph?subreddit=${subredditName}&post_count=${postCount}`, {})
      .then(res => res.json())
      .then(doc => {
        if (doc.code === 200) {
          setCyData(oldArray => [...oldArray, doc.data]);
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
    cy && appendData(cyData);
  });

  useEffect(() => {
    if (firstLoad.current) {
      const cytoScape = cytoscape({
        container: document.getElementById('cy'),
      });
      setCy(cytoScape);
      firstLoad.current = false;
      loadFromStorage();
    }
  }, []);

  const loadFromStorage = () => {
    const postsStorage = Object.entries(localStorage);
    postsStorage.forEach((posts) => {
      setCyData(oldArray => [...oldArray, JSON.parse(posts[1])]);
    });
  };

  const appendData = (posts: any[]) => {
    posts.forEach(post => {
      const subredditName = post[0];
      addNode(subredditName, "subreddit");
      colorNode(subredditName, invertColor(stc(subredditName)));
      for (let i = 1; i < post.length; i++) {
        const nodeId = post[i].author;
        addNode(nodeId, "author");
        colorNode(nodeId, stc(subredditName));
        addEdge(subredditName, nodeId);
      }
    });
    cy!.layout(options).run();
  };

  const addNode = (id: string, type: string) => {
    cy!.add([
      {group: 'nodes', data: {id: id, type: type}},
    ]);
  };

  const addEdge = (source: string, target: string) => {
    cy!.add([
      {group: 'edges', data: {id: source + "__" + target, source: source, target: target}}
    ]);
  };

  const removeNodeOrEdge = (id: string) => {
    cy!.remove(cy!.$(`#${id}`));
  };

  const colorNode = (nodeId: string, color: string) => {
    cy!.getElementById(nodeId).style("background-color", color);
  };

  const colorEdge = (sourceId: string, targetId: string, color: string) => {
    cy!.getElementById(sourceId + '__' + targetId).style({
      'width': 3,
      'line-color': color
    });
    cy!.getElementById(targetId + '__' + sourceId).style({
      'width': 3,
      'line-color': color
    });
  };

  const deleteGraph = () => {
    localStorage.clear();
    cy!.elements().remove();
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
              <Button variant="contained" color="secondary" onClick={deleteGraph}>
                Delete Graph
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Box display="flex" flexWrap="nowrap">
        <div id="cy" className={'cytoscape__div'}/>
        {!firstLoad.current && <NodeInformation
            cy={cy}
            removeNodeOrEdge={removeNodeOrEdge}
            addEdge={addEdge}
            colorNode={colorNode}
            colorEdge={colorEdge}
        />}
      </Box>
    </>
  );
};

export default NoPostsPage;