function FormList({journey, selectedNode, setSelectedNode}){
    console.log('FormList called')

    if (!journey){
        return <div>Loading journey ...</div>
    }

    return (
        <div className="formlist-container">
            <h2 className="formlist-heading">Journey Steps</h2>
            <ul className="formlist-list">
                {[...journey.nodes]
                    .sort((a,b)=> a.data.name.localeCompare(b.data.name))
                    .map((node) =>(
                    <li
                    key={node.id}
                    className={`formlist-item ${selectedNode && selectedNode.id === node.id ? 'selected' : ''}`}
                    onClick={()=>setSelectedNode(node)}
                    >
                        <strong>{node.data.name}</strong>
                    </li>

                ))}    
            </ul>
        </div>
    )

}

export default FormList;