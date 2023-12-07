import React, { useEffect, useContext } from 'react'
import UserContext from '../../context/UserContext';
import axios from "axios"
import "./Preferences.css"

import { formatString } from '../../utilities/utilFunctions'

const Preferences = (strains) => {
    const { userData } = useContext(UserContext)

    async function removePreference(strainId) {
        await axios.post(`${process.env.REACT_APP_API_URL}/account/preference/delete/${strainId}/${userData.userId}`)
    }

    useEffect(() => {
        console.log(strains.strains)
    }, [])

  return (
    <div>
        <div className='taste-section'>
            {Object.entries(strains.strains) ? (
                <div className='top-strains'>
                    {Object.entries(strains.strains).map((terp, i) => {
					    return (
                            <div key={i} className='card m-3 p-3'>
                                <li style={{ listStyle: 'none' }}>{formatString(strains.strains[i].name)}</li>
                                <button onClick={() => removePreference(strains.strains[i].strain_id)} className='btn btn-danger'>Remove</button>
                            </div>
                        )
				    })}
                </div>
            ) : null}
        </div>
    </div>

  )
}

export default Preferences