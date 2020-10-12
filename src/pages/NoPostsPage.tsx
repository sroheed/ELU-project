import React, {useEffect, useRef, useState} from 'react';
import cytoscape from 'cytoscape';
import {options} from '../utils/cytoscapeOptions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const NoPostsPage = () => {
  const cy: any = useRef();
  const firstLoad = useRef(true);
  const [loading, setLoading] = useState(false);
  const [subredditName, setSubredditName] =  useState("");
  const [postCount, setPostCount] = useState(10);

  const fetchData = () => {
    if(!subredditName) return;
    setLoading(true);
    fetch(`/api/graph?subreddit=${subredditName}&post_count=${postCount}`, {
    })
      .then(res => res.json())
      .then(doc => {
        if(doc.code === 200){
          appendNodes(doc.data);
        }else{
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
    if(firstLoad.current){
      cy.current = cytoscape({
        container: document.getElementById('cy'),
      });
      firstLoad.current = false;
    }
  });


  const appendNodes = (posts: any[]) => {
    const subredditName = posts[0];
    addNode(subredditName);
    for(let i=1; i<posts.length; i++){
      addNode(posts[i].author);
      addEdge(subredditName, posts[i].author);
    }
  };

  const addNode = (id: string) => {
    cy.current.add([
      { group: 'nodes', data: { id: id } },
    ]);
    cy.current.layout(options).run();
  };

  const addEdge = (source: string, target: string) => {
    cy.current.add([
      { group: 'edges', data: { id: source + "__" + target, source: source, target: target } }
    ]);
  };

  return(
    <>
      {loading &&
      <div className={"loading-spinner"}>
          <CircularProgress color="secondary" size={50}/>
      </div>}
      <div className={"scrape-controls__div"}>
        <Grid container spacing={2} alignItems={"baseline"}>
          <Grid item xs={3} >
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
          <Grid item xs={1}>
            <div className={"line-high"}>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Generate
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div id="cy" className={'cytoscape__div'} />
    </>
  );
};

export default NoPostsPage;