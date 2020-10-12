import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Picture1 from "../assets/reddit1.png";
import Picture2 from "../assets/reddit2.png";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Typography from "@material-ui/core/Typography";


const InfoPage = () => {
  return (
    <>
      <div className={"info-images-title"}>
        <Typography id="slider" variant={"h5"} >
          Subreddit Connections
        </Typography>
      </div>
      <div className="info-images__div">
        <GridList cols={2}>
          <GridListTile>
            <Zoom>
              <img src={Picture1} alt={"Gamedev connections"} />
            </Zoom>
            <GridListTileBar
              title={"Gamedev connections"}
            />
          </GridListTile>
          <GridListTile>
            <Zoom>
              <img src={Picture2} alt={"Devblogs connections"} />
            </Zoom>
            <GridListTileBar
              title={"Devblogs connections"}
            />
          </GridListTile>
        </GridList>
      </div>
    </>
  );
};

export default InfoPage;