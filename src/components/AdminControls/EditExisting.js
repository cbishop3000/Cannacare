import React, { useState } from 'react'
import "./AdminControls.css"

import axios from "axios"

const EditExisting = ({strains}) => {
    const [value, setValue] = useState("")

    async function editStrain(value) {
        await axios.put(`http://localhost:5000/strains/edit/${value.id}`, value);
    }

    const handleEdit = (obj, e) => {
        value[obj] = e.target.value
        console.log(value)
    };

    const handleChange = (e) => {
        setValue(JSON.parse(e.target.value))
    };

  return (
    <div className='edit-form-sizing'>
        <div>
            <p>Edit Existing</p>
        </div>
        <div>
            <select className='form-select' onChange={handleChange}>   
                {strains[0].map((strain, i) => {
                    return (    
                        <option key={i} value={JSON.stringify(strain)} className='strain-name'>
                            {strain.name}
                        </option> 
                    )
                })}
            </select>
        </div>
        <div className='editable-items'>
            {value ? Object.keys(value).map((strain) => {
                return (    
                    <div key={strain} value={strain} className='strain-name'>
                        {strain} : <input onChange={(e) => handleEdit(strain, e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={value[strain]} />
                    </div> 
                )
            }) : (null)}
            
        </div>
        <button onClick={() => editStrain(value)} className='btn btn-primary'>Save</button>
    </div>
  )
}

export default EditExisting