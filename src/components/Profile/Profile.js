import React, { useState, useEffect, useContext } from 'react'
import './Profile.css'
import axios from "axios"

import 'firebase/storage';
import { storage } from '../Firebase/firebase.js'
import { ref, uploadBytes } from "firebase/storage"

import StrainSelection from '../StrainSelection/StrainSelection'
import Loading from '../Loading/Loading'
import Graph from '../Graph/Graph'
import Preferences from '../Preferences/Preferences'
import Popup from "reactjs-popup";
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'

import {Chart, ArcElement} from 'chart.js'
import Recommendation from '../Recommendation/Recommendation'

import uploadIcon from '../../icons/plus-circle-fill.svg';

Chart.register(ArcElement);

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext)
  const [strains, setStrains] = useState([])
  const [preferences, setPreferences] = useState([])
  //Navigation
  const navigate = useNavigate();

  //image handling
  const [image, setImage] = useState(null);

  const handleUpload = () => {
	if (image) {
	  const storageRef = ref(storage, `images/${image.name}`);
	  
	  uploadBytes(storageRef, image).then(() => {
		console.log('Image uploaded successfully!');
	  }).catch((error) => {
		console.error('Error uploading image:', error);
	  });
	}
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const result = []

  //Used later to check for logged in user
  const userId = localStorage.getItem("userId")

  async function fetchStrains() {
    let strainData = await axios.get(`${process.env.REACT_APP_API_URL}/strains/products`)
    setStrains(strainData.data)
  }

  async function fetchPreferences() {
    await axios.get(`${process.env.REACT_APP_API_URL}/account/user/preferences/${userId}`)
      .then((strain) => result.push(strain))
    
    setPreferences(result[0].data)
  }

  let terpResults = []
	let terpenes = {
			myrcene: {
				name: "Myrcene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	limonene: {
				name: "Limonene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	linalool: {
				name: "Linalool",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	beta_caryophyllene: {
				name: "Beta Caryophyllene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	alpha_pinene: {
				name: "Alpha Pinene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	alpha_humulene: {
				name: "Alpha Humulene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	beta_myrcene: {
				name: "Beta_Myrcene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	caryophyllene: {
				name: "Caryophyllene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	alpha_bisabolol: {
				name: "Alpha Bisabolol",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
		  	eucalyptol: {
				name: "Eucalyptol",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			},
			terpinolene: {
				name: "Terpinolene",
				count: 0,
				percentage: [],
				median: 0,
				result: 0,
				color: "rgb(255, 99, 232)"
			}
	}

	function getAverages(object) {
		object.forEach(strain => {
		  for (let terp in strain) {
			if(strain[terp] !== null & terp !== 'account_id' & terp !== 'strain_id' & terp !== 'name' & terp !== 'lean' && terp !== 'type') {
				terpenes[terp].count++
				terpenes[terp].percentage.push(parseFloat(strain[terp]))
				terpenes[terp].median += parseFloat(strain[terp])
				terpenes[terp].result = terpenes[terp].median / terpenes[terp].count
			}
		  }
	  })
	}
  
	getAverages(preferences)

	var objects = {};

	for (let terp in terpenes) {
		objects[terp] = {terp: terpenes[terp].result};
	}

	for(let i = 0; i < Object.values(objects).length; i++) {
		const newObj = { key: Object.keys(objects)[i], value: Object.values(objects)[i].terp.toFixed(5) };
		terpResults.push(newObj)
	}

	const data = {
		labels: Object.values(terpenes),
		datasets: [{
		  label: 'Terpene Makeup',
		  data:  terpResults,
		  backgroundColor: [
			'rgb(255, 99, 232)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)',
			'rgb(255, 99, 232)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)',
			'rgb(255, 99, 232)',
			'rgb(54, 162, 235)',
			'rgb(255, 205, 86)',
			'rgb(255, 99, 232)',

		  ],
		  hoverOffset: 6
		}]
	};
  
  useEffect(() => {
	if(!userId) {
		navigate("/")
	} else {
		fetchStrains()
		fetchPreferences()
	}
  }, [])
  return (
  <div>
    <div className='profile-container mt-5'>
      <div className='top-container'>
        <div className='profile-picture'>
			<input 
				type="file" 
				onChange={handleFileChange}
				className='input-image' 
				title=" "
			/>
            <img 
                src={uploadIcon}
                className="add-icon"
            />
        </div>
		<button className='btn btn-primary' onClick={handleUpload}>Upload</button>
        <Preferences 
          strains={preferences}
        />
      </div>
      {/* <hr className='break-line' /> */}
      <div className='functional-section'>
			<Popup
				modal
				trigger={<button className="mt-3 mb-3 glass-button m-auto">Select Strains</button>}
				position="right center"
				closeOnDocumentClick
			>
				<StrainSelection 
					strains={strains}
					preferences={preferences}
				/>
			</Popup>
        </div>
          <hr className='break-line' />
          {preferences.length !== 0 ? <div className='graph-section'>
            <Graph 
              strains={[data, terpenes]}
            />
          </div> : (<Loading />)}
          <hr className='break-line' />
          {preferences.length !== 0 ? <div className='recommendation-section'>
            <Recommendation 
              prefData={[data, terpResults, preferences]}
            />
          </div> : (<Loading />)}
    </div>
  </div>

  )
}

export default Profile