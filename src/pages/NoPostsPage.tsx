import React, {useEffect} from 'react';
import cytoscape from 'cytoscape';

const NoPostsPage = () => {
  let cy: any = null;


  useEffect(() => {
    cy = cytoscape({
      container: document.getElementById('cy'),
      elements: [{data: {id: 'a'}}]
    });
  }, [] );


  const addElem = () => {
    cy.add([
      { group: 'nodes', data: { id: 'n0' } },
      { group: 'nodes', data: { id: 'n1' } },
    ]);
  };


  return(
    <>
      <button onClick={addElem}>Add elements</button>
      <button onClick={() => console.log(cy)}>Log</button>
      <div id="cy" className={'cytoscape__div'} onClick={(e) => console.log(e.screenX, e.screenY)}/>
    </>
  );
};

export default NoPostsPage;