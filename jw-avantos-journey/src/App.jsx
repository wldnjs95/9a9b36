import { useState, useEffect } from 'react'
import './App.css'
import PrefillForm from './components/prefillForm'
import getAvailableSources from './utils/getSources';

function App() {
  const serverURL = 'http://localhost:3000/api/v1/test_tenant_id/actions/blueprints/test_action_blueprint_id/graph';
  const [journey, setJourney] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    console.log('Selected node:', node);
  }

  useEffect(() => {
    console.log('Fetching data')
    fetch(serverURL)
    .then(response => response.json())
    .then(data => {
      setJourney(data)
      console.log('Journey state updated:', data)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  if(!journey) {
    return <div>Loading...</div>
  }

  console.log('Journey state:', journey)

  function updateMapping(property, value){
    /*node update*/ 
    console.log('Updating mapping for property:', property, 'with value:', value);
    const updatedNode = structuredClone(selectedNode);
    updatedNode.data.input_mapping[property] = value;
    setSelectedNode(updatedNode);

    /*journey update*/
    const updatedJourney = structuredClone(journey);
    const nodeIndex = updatedJourney.nodes.findIndex(n => n.id === updatedNode.id);
    if (nodeIndex !== -1) {
      updatedJourney.nodes[nodeIndex] = updatedNode;
      setJourney(updatedJourney);
      console.log('Journey updated with new node mapping:', updatedJourney);
    } else {
      console.error('Node not found in journey:', updatedNode.id);
    }

  }



  return (
    <div className="journey-container">
      {/* Journey Form*/}
      <h2>Journey Coding</h2>
      {[...journey.nodes]
      .sort((a,b)=> a.data.name.localeCompare(b.data.name))
      .map((node) => {
        return(
          <div key={node.id} onClick={()=>handleNodeClick(node)}>
            <p>{node.data.name}</p>
          </div>
        )
      })}

      {/* selectedNode Form Modal*/}
      
      {selectedNode && (
        <PrefillForm
        node={selectedNode}
        journey={journey}
        availableSources={getAvailableSources({node:selectedNode,journey: journey}) ?? []}
        updateMapping={updateMapping}
        />
      )}
      
    </div>
  )
}

export default App
