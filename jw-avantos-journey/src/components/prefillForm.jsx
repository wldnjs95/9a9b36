import SelectBox from './selectBox';

function getFields({node,journey}){
    console.log('getFields called with node:', node);
    console.log('getFields called with journey:', journey);

    const componentId = node.data.component_id;
    console.log('Component ID:', componentId);
    const form = journey.forms.find(f=> f.id === componentId);
    console.log('Form found:', form);
    console.log('Returning properties:', form.field_schema.properties);
    return form ? Object.keys(form.field_schema.properties) : [];
}

function prefillForm({node, journey, availableSources, updateMapping}){
    console.log('Prefill Form started with selected node:', node);

    const properties = getFields({node, journey});
    console.log('properties:', properties);

    return(
        <div className="prefill-container">
            <h2>Prefill Form: {node.data.name}</h2>
            {properties.map((property)=>(
                <SelectBox
                key ={property}
                node={node}
                property={property}
                availableSources={availableSources}
                updateMapping={updateMapping}/>
            ))}
        </div>
    )
}

export default prefillForm;