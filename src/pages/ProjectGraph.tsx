import React, {useEffect, useRef, useState} from "react";
import Box from "@material-ui/core/Box";
import NodeInformation from "../components/NodeInformation";
import cytoscape from "cytoscape";

const ProjectGraph = () => {
  const cy: any = useRef();
  const firstLoad = useRef(true);
  const [currentEdge, setCurrentEdge] = useState("");
  const resetEdge = () => {
    setCurrentEdge("");
  };
  const [currentNodeData, setCurrentNodeData] = useState({
    id: "",
    type: "",
    degree: 0,
    edgesSource: null,
    edgesTarget: null,
  });

  useEffect(() => {
    if (firstLoad.current) {
      cy.current = cytoscape({
        container: document.getElementById('cy'),
      });
      cy.current.on('click', 'node', handleNodeClick);
      cy.current.on('click', 'edge', handleEdgeClick);
      firstLoad.current = false;
    }
  });

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

  return (
    <>
      <Box display="flex" flexWrap="nowrap">
        <div id="cy" className={'cytoscape__div'}/>
        {/*<NodeInformation*/}
        {/*  node={currentNodeData}*/}
        {/*  edge={currentEdge}*/}
        {/*  resetEdge={resetEdge}*/}
        {/*  handleCheckbox={handleCheckbox}*/}
        {/*  nodeChecked={nodeChecked}*/}
        {/*  removeNode={removeNode}*/}
        {/*  addEdge={addEdge}*/}
        {/*  cy={cy.current}*/}
        {/*  colorNode={colorNode}*/}
        {/*  colorEdge={colorEdge}*/}
        {/*/>*/}
      </Box>
    </>
  )
};

export default ProjectGraph;