import React, {useEffect, useState} from 'react';
import cytoscape from 'cytoscape';
import CircularProgress from '@material-ui/core/CircularProgress';


const NoPostsPage = () => {
  let cy: any = null;
  let [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`/api/graph`, {
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
      <button onClick={addElem}>Add elements</button>
      <button onClick={() => fetchData()}>Log</button>
      <div id="cy" className={'cytoscape__div'} onClick={(e) => console.log(e.screenX, e.screenY)}/>
    </>
  );
};

export default NoPostsPage;