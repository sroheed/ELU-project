import React, {useEffect, useRef, useState} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface Node {
  id: string,
  type: string,
  degree: number,
  edgesSource: any,
  edgesTarget: any,
}

interface NodeCardProps {
  node: Node;
  handleCheckbox: (nodeId: string) => void
  nodeChecked: string;
}

const NodeCard = (props: NodeCardProps) => {
  const {node, handleCheckbox, nodeChecked} = props;
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

  return (
    <>
      <div className={"details"}>
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

                </Grid>
              </CardContent>
            </Card>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

export default NodeCard;