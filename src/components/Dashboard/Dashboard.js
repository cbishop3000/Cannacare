import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Popup from "reactjs-popup";
import axios from "axios"

import "./Dashboard.css"
import EditExisting from '../AdminControls/EditExisting';
import AddProduct from '../AdminControls/AddProduct'
import DeleteExisting from '../AdminControls/DeleteExisting';

const Dashboard = () => {
    let strains = []

    async function fetchAllStrains() {
        await axios.get(`${process.env.REACT_APP_API_URL}/strains/products`)
            .then((data) => strains.push(data.data))
    }

    useEffect(() => {
        fetchAllStrains()
    })
    
  return (
    <div className='admin-controls-container'>
        <Navbar />
        <div className='admin-buttons'>
            <Popup
                modal
                trigger={<button className='btn btn-primary admin-button'>Edit Existing</button>}
                position="right center"
                closeOnDocumentClick
            >
                <EditExisting 
                    strains={strains}
                />
			</Popup>
            <Popup
                modal
                trigger={<button className='btn btn-primary admin-button'>Add</button>}
                position="right center"
                closeOnDocumentClick
            >
                <AddProduct />
			</Popup>
            <Popup
                modal
                trigger={<button className='btn btn-primary admin-button'>Delete Existing</button>}
                position="right center"
                closeOnDocumentClick
            >
                <DeleteExisting 
                    strains={strains}
                />
			</Popup>
        </div>
    </div>
  )
}

export default Dashboard