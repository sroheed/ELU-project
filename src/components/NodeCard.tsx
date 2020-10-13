import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import NodeProps from '../interfaces/Node';

interface Item {
  name:  string;
  node: NodeProps;
}

interface NodeInfoProps {
  item: Item;
  index: number;
  nodeChecked: string;
  handleNodeSelectedCheckbox: (nodeId: string) => void
  removeNodeById: (nodeId: string, itemName: string) => void
}

const NodeCard = (props: NodeInfoProps) => {
  const {item, index, nodeChecked, handleNodeSelectedCheckbox, removeNodeById} = props;
  return (
    <>
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
        <CardHeader subheader={`Node ${index + 1} Details`}/>
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
    </>
  );
};

export default NodeCard;