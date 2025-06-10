import DEFAULT_PREFILL_SOURCE from './globalSources';

function getAllPreReqNodes(node,journey, visited = new Set()) {
    console.log('getAllPreReqNodes called with node:', node);

    const preReqIds = node.data.prerequisites || [];
    const directNodes = journey.nodes.filter(n => preReqIds.includes(n.id));
    console.log('Direct prerequisite nodes:', directNodes);

    directNodes.forEach(n => {
        if (!visited.has(n.id)) {
            visited.add(n.id);
            getAllPreReqNodes(n, journey, visited);
        }
    });

    return journey.nodes.filter(n => visited.has(n.id));

}

function getAvailableSources({node, journey}){

    const sources = [];

    console.log('getAvailableSources called');
    const preReqNodes = getAllPreReqNodes(node, journey);
    console.log('Prerequisite nodes:', preReqNodes);

    preReqNodes.forEach(n => {
        const form = journey.forms.find(f=> f.id === n.data.component_id);
        console.log('Form found for node:', n.data.name, form);
        if (!form) return;

        const properties = Object.keys(form.field_schema.properties);
        console.log('Properties of form:', properties);

        sources.push({
            formName: n.data.name,
            properties: properties.map((prop) => ({
                label: prop,
                value: `${n.data.name}.${prop}`
            }))
        });

    });

    // Add global sources
    sources.push({
        formName: 'Global Sources',
        properties: DEFAULT_PREFILL_SOURCE.map((src)=>({
                label: src.label,
                value: src.value
        }))
    })


    console.log('Available sources:', sources);
    return sources;



}

export default getAvailableSources;