import React, { useEffect, useContext } from 'react'
import axios from "axios"
import UserContext from '../../context/UserContext';

import './StrainSelection.css'
import { formatString } from '../../utilities/utilFunctions'

const StrainSelection = (strains) => {
    const { userData } = useContext(UserContext)
    
    async function savePreference(data) {
        await axios.post(`${process.env.REACT_APP_API_URL}/account/preference/${userData.user.userId}`, data)
    }

    useEffect(() => {
        console.log(userData.user.userId)
    }, [userData.user.userId])

    return (
        <div>
            <div className="card" style={{ height: '500px' }}>
                <div className="card-body">
                    <h5 className="card-title">Strain Selector</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Strains</h6>
                    <p className="card-text">Choose your favorite strains from the menu below.</p>
                </div>
                <div className='strain-dropdown button-margins'>
                    <div className="strain-search-container" aria-label="Default select example">
                        <div>
                            {strains.strains.map((strain, i) => {
                                return (
                                    <div key={i} className='strain-container'>   
                                        <div className='save-name-placement'>
                                            <p key={strain} className='strain-name'>
                                                {formatString(strain.name)}
                                               
                                            </p> 
                                            <button onClick={() => savePreference(strain)} className='btn btn-primary save-placement'>Save</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  )
}

export default StrainSelection