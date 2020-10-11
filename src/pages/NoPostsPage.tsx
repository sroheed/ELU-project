import React, {useEffect, useState} from 'react';
import cytoscape from 'cytoscape';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const NoPostsPage = () => {
  let cy: any = null;
  const [loading, setLoading] = useState(false);
  const [subredditName, setSubredditName] =  useState("");
  const [postCount, setPostCount] = useState(10);

  const fetchData = () => {
    if(!subredditName) return;
    setLoading(true);
    fetch(`/api/graph?subreddit=${subredditName}&post_count=${postCount}`, {
    })
      .then(res => res.json())
      .then(data => {
        if(data.code === 200){
          console.log(data.data);
        }else{
          console.log(data.message)
        }

        setLoading(false);
      })
      .catch(err => {
        console.log("ERROR!!!", err);
        setLoading(false);
      })
  };


  useEffect(() => {
    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [{data: {id: 'a'}},{data: {id: 'b'}}]
    });
    cy.layout({name: 'breadthfirst'}).run();
  }, [] );


  const addElem = () => {
    cy.add([
      { group: 'nodes', data: { id: 'n0' } },
      { group: 'nodes', data: { id: 'n1' } },
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
      <div id="cy" className={'cytoscape__div'} onClick={(e) => console.log(e.screenX, e.screenY)}/>
    </>
  );
};

export default NoPostsPage;