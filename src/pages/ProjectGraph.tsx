import React, {useEffect, useRef, useState} from "react";
import Box from "@material-ui/core/Box";
import NodeInformation from "../components/NodeInformation";
import cytoscape from "cytoscape";
// @ts-ignore
import coseBilkent from 'cytoscape-cose-bilkent';
import {invertColor} from "../utils/invertColor";
import stc from "string-to-color";
import {coseb} from "../utils/cytoscapeOptions";
import {generateAllData} from "../utils/projectData";

cytoscape.use( coseBilkent );


const ProjectGraph = () => {
  const [cy, setCy] = useState<cytoscape.Core>();
  const [cyData, setCyData] = useState<string[] | object[]>([]);
  const firstLoad = useRef(true);

  useEffect(() => {
    cy && appendData(cyData);
  }, [cyData]);

  useEffect(() => {
    if (firstLoad.current) {
      const cytoScape = cytoscape({
        container: document.getElementById('cy'),
      });
      setCy(cytoScape);
      firstLoad.current = false;
      loadProjectData();
    }
  }, []);

  const loadProjectData = () => {
    const data = generateAllData();
    data.forEach((posts) => {
      setCyData(oldArray => [...oldArray, posts]);
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
      cy!.layout(coseb).run();
      sizeNodes();
    });
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

  const sizeNodes = () => {
    console.log("slss");
    cy!.$('node').forEach((node: any) => {
      if(node.data().type !== "subreddit"){
        node.style({
          width: node.degree() * 20,
          height: node.degree() * 20
        });
      }else{
        node.style({
          width: node.degree() / 2,
          height: node.degree() / 2
        });
      }
    });
  };

  return (
    <>
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

export default ProjectGraph;