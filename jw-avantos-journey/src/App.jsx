import { useState, useEffect } from 'react'
import './App.css'
import PrefillForm from './components/prefillForm'
import getAvailableSources from './utils/getSources';
import FormList from './components/FormList';
function App() {
  const serverURL = 'http://localhost:3000/api/v1/test_tenant_id/actions/blueprints/test_action_blueprint_id/graph';
  const [journey, setJourney] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);


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
      <div className="sidebar">
        {/* Journey Form*/}
        <FormList
        journey={journey}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}/>
      </div>
      {/* selectedNode Form Modal*/}
      
      <div className="main-content">
      {selectedNode && (
        <PrefillForm
        node={selectedNode}
        journey={journey}
        availableSources={getAvailableSources({node:selectedNode,journey: journey}) ?? []}
        updateMapping={updateMapping}
        />
      )}
      </div>
      
    </div>
  )
}

export default App
