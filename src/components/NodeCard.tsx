import React, {useEffect, useRef, useState} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

interface Node {
  id: string,
  type: string,
  degree: number,
  edgesSource: any,
  edgesTarget: any,
}

interface NodeCardProps {
  node: Node;
  edge: string;
  handleCheckbox: (nodeId: string) => void;
  removeNode: (id: string) => void;
  addEdge: (source: string, target: string) => void;
  resetEdge: () => void;
  nodeChecked: string;
  cy: any;
}

const NodeCard = (props: NodeCardProps) => {
  const {node, handleCheckbox, nodeChecked,
    removeNode, addEdge, edge, resetEdge, cy} = props;
  const [firstNode, setFirstNode] = useState({
    name: "node1",
    node: {
      id: "",
      type: "",
      degree: 0,
      edgesSource: null,
      edgesTarget: null,
    }
  });
  const [secondNode, setSecondNode] = useState({
    name: "node2",
    node: {
      id: "",
      type: "",
      degree: 0,
      edgesSource: null,
      edgesTarget: null,
    }
  });
  const [connectInfo, setConnectInfo] = useState({
    connected: false,
    distance: 0
  });
  const [path, setPath] = useState<any[]>([]);

  useEffect(() => {
    if(nodeChecked === "node1"){
      setFirstNode({
        name: "node1",
        node: node
      })
    }else{
      setSecondNode({
        name: "node2",
        node: node
      })
    }
  }, [node]);

  const nodes = [firstNode, secondNode];

  const removeNodeById = (id: string, nodeName: string) => {
    removeNode(id);
    if(nodeName === "node1"){
      setFirstNode({
        name: "node1",
        node: {
          id: "",
          type: "",
          degree: 0,
          edgesSource: null,
          edgesTarget: null,
        }
      });
    }else{
      setSecondNode({
        name: "node2",
        node: {
          id: "",
          type: "",
          degree: 0,
          edgesSource: null,
          edgesTarget: null,
        }
      });
    }
  };

  useEffect(() => {
    search();
  }, [firstNode, secondNode]);

  const search = () => {
    console.log("eyy");
    if(firstNode.node.id && secondNode.node.id){
      let distance = 0;
      const searchFloyd = cy.elements().floydWarshall();
      const path = searchFloyd.path('#'+firstNode.node.id, '#'+secondNode.node.id);
      setPath(path);
      for(let i = 0; i<path.length; i+=2){
        distance++;
      }
      setConnectInfo({
        connected: distance > 0,
        distance: distance - 1
      });
    }
  };

  const colorPath = () => {
    if(path.length > 1){
      for(let i = 0; i<path.length; i+=2){
        cy.nodes(`[id='${path[i].id() as string}']`).style('background-color', "green");
      }
    }
  };

  return (
    <>
      <div className={"details"}>
        {edge !== "" && <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => {
              removeNode(edge);
              resetEdge();
              search();
            }
            }>
            Remove Edge
        </Button>}
        <br/>
        {nodes.map((item, i) =>
          <React.Fragment key={item.name}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={nodeChecked === item.name}
                  onChange={() => handleCheckbox(item.name)}
                  name="Multiple Nodes"
                  color="primary"
                />
              }
              label="select"
            />
            <Card>
              <CardHeader subheader={`Node ${i+1} Details`}/>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      ID:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      {item.node.id}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      Type:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      {item.node.type}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      Edges:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant={"body2"}>
                      {item.node.degree}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" flexWrap="nowrap" justifyContent={"left"}>
                      <Button variant="contained" color="secondary" disableElevation onClick={() => removeNodeById(item.node.id, item.name)}>
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </React.Fragment>
        )}
        <br/>
        {firstNode.node.id !== "" && secondNode.node.id!=="" && <Card>
            <CardHeader subheader={`Node 1 > Node 2`}/>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                            Connected:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                          {connectInfo.connected.toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                            Distance:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                          {connectInfo.distance}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" flexWrap="nowrap" justifyContent={"space-between"}>
                            <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={() => {
                                  addEdge(firstNode.node.id, secondNode.node.id);
                                  search();
                                }}>
                                Connect
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={colorPath}>
                                Color Path
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>}
      </div>
    </>
  );
};

export default NodeCard;