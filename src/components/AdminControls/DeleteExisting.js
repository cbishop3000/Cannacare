import React, { useState } from 'react'
import "./AdminControls.css"

import axios from "axios"

const DeleteExisting = ({strains}) => {
    async function deleteStrain(value) {
        await axios.delete(`http://localhost:5000/strains/delete/${value}`);

        window.location.reload();
    }

  return (
    <div className='edit-form-sizing'>
        <div>
            <p>Delete Existing</p>
        </div>
        <div className='delete-container'>
            {strains[0].map((strain, i) => {
                return (    
                    <div key={i} value={JSON.stringify(strain)} className='strain-name card p-5'>
                        {strain.name}
                        <button onClick={() => deleteStrain(strain.id)} className='btn btn-danger'>Delete</button>
                    </div> 
                )
            })}
        </div>
    </div>
  )
}

export default DeleteExisting