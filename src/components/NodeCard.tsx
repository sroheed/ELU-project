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
  cy: any;
  addEdge: (source: string, target: string) => void;
  removeNodeOrEdge: (id: string) => void;
  colorNode: (nodeId: string, color: string) => void;
  colorEdge: (sourceId: string, targetId: string, color: string) => void
}

const NodeCard = (props: NodeCardProps) => {
  const {removeNodeOrEdge, addEdge, cy, colorNode, colorEdge} = props;
  const [path, setPath] = useState<any[]>([]);
  const [savedColors, setSavedColors] = useState<any[]>([]);
  const [colorPathCheckbox, setColorPathCheckbox] = useState(false);
  const [nodeChecked, setNodeChecked] = useState("node1");
  const [selectedEdge, setSelectedEdge] = useState("");
  const [common, setCommon] = useState({
    connected: false,
    distance: 0
  });
  const [selectedNode, setSelectedNode] = useState({
    id: "",
    type: "",
    degree: 0,
    edgesSource: null,
    edgesTarget: null,
  });
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

  useEffect(() => {
      cy.on('click', 'node', handleNodeClick);
      cy.on('click', 'edge', handleEdgeClick);
  }, [cy]);

  useEffect(() => {
    BFSFloyd();
    resetSelectedEdge();
  }, [firstNode, secondNode]);

  useEffect(() => {
    if (colorPathCheckbox) {
      colorPath();
    } else {
      resetColors();
    }
    if (common.distance === -1) {
      resetColors();
    }
  }, [colorPathCheckbox, path]);

  useEffect(() => {
    if (nodeChecked === "node1") {
      setFirstNode({
        name: "node1",
        node: selectedNode
      })
    } else {
      setSecondNode({
        name: "node2",
        node: selectedNode
      })
    }
  }, [selectedNode]);

  const resetSelectedEdge = () => {
    setSelectedEdge("");
  };

  const handleNodeClick = (e: any) => {
    const node = e.target;
    const currentNode = {
      id: node.id(),
      type: node.data().type,
      degree: node.degree(),
      edgesSource: cy.edges(`[source = "${node.id()}"]`),
      edgesTarget: cy.edges(`[target = "${node.id()}"]`),
    };
    setSelectedNode(currentNode);
  };

  const handleEdgeClick = (e: any) => {
    const edge = e.target; // event target
    const currentEdge = edge.id();
    setSelectedEdge(currentEdge);
    console.log("edge click")
  };

  const handleNodeSelectedCheckbox = (nodeId: string) => {
    setNodeChecked(nodeId);
  };

  const removeNodeById = (id: string, nodeName: string) => {
    removeNodeOrEdge(id);
    resetNodeValue(nodeName);
  };

  const resetNodeValue = (nodeName: string) => {
    if (nodeName === "node1") {
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
    } else {
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

  const BFSFloyd = () => {
    if (firstNode.node.id && secondNode.node.id) {
      let distance = 0;
      const searchFloyd = cy.elements().floydWarshall();
      const path = searchFloyd.path('#' + firstNode.node.id, '#' + secondNode.node.id);
      setPath(path);
      for (let i = 0; i < path.length; i += 2) {
        distance++;
      }
      setCommon({
        connected: distance > 0,
        distance: distance - 1
      });
    }
  };

  const colorPath = () => {
    if (path.length > 1) {
      resetColors();
      let previous = "";
      let colors = [];
      for (let i = 0; i < path.length; i += 2) {
        colors.push({
          source: path[i].id(),
          target: path[i].id(),
          color: cy.getElementById(path[i].id()).style('background-color')
        });
        colorNode(path[i].id(), "green");
        if (previous) {
          colorEdge(previous, path[i].id(), "green");
          colors.push({
            source: previous,
            target: path[i].id(),
            color: "gray"
          });
        }
        previous = path[i].id();
      }
      setSavedColors(colors);
    }
  };

  const resetColors = () => {
    savedColors.forEach(item => {
      if (item.source === item.target) {
        colorNode(item.source, item.color);
      }
      colorEdge(item.source, item.target, item.color);
    });
  };

  const nodes = [firstNode, secondNode];

  return (
    <>
      <div className={"details"}>
        {selectedEdge !== "" && <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => {
              removeNodeOrEdge(selectedEdge);
              resetSelectedEdge();
              BFSFloyd();
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
                  onChange={() => handleNodeSelectedCheckbox(item.name)}
                  name="Multiple Nodes"
                  color="primary"
                />
              }
              label="select"
            />
            <Card>
              <CardHeader subheader={`Node ${i + 1} Details`}/>
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
                      <Button variant="contained" color="secondary" disableElevation
                              onClick={() => removeNodeById(item.node.id, item.name)}>
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
        {firstNode.node.id !== "" && secondNode.node.id !== "" && <Card>
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
                          {common.connected.toString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                            Distance:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                          {common.distance}
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
                                  BFSFloyd();
                                }}>
                                Connect
                            </Button>
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={colorPathCheckbox}
                                    onChange={() => setColorPathCheckbox(!colorPathCheckbox)}
                                    name="Multiple Nodes"
                                    color="primary"
                                  />
                                }
                                label="Color Path"
                            />
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