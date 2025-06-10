function selectBox({node,property, availableSources, updateMapping}){
    const mapping = node.data.input_mapping[property];
    return(
    <div className="field-wrapper">
        <div className="field-label">
                    <strong>{property}</strong>
        </div>

        {mapping ? (
            <div className="field-mapping">
                <span>{mapping}</span>
                <button className="delete-mapping-button"
            onClick={() => {
                console.log('Removing mapping for property:', property);
                updateMapping(property, '');
            }}>X</button>
            </div>
            
        ):(
            <div className="select-box-container">
            <select className="select-box"
            value=""
            onChange={(e) => {
                console.log('Selected value:', e.target.value);
                updateMapping(property,e.target.value);
            }}
            >
                <option value="">--Select a field--</option>
                {availableSources.map((source) => (
                    <optgroup key={source.formName} label={source.formName}>
                        {source.properties.map((property) => (
                            <option key={property.value} value={property.value}>
                                {property.label}
                            </option>
                        ))}
                    </optgroup>
                ))}

            </select>
        </div>

        )}
        
    </div>
    )
}

export default selectBox;