import React from 'react'
import { useState } from 'react'
import { storage } from '../Firebase/firebase.js'
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from 'uuid'
import { productObject } from '../../utilities/objectForProducts.js'
import axios from "axios"
import "./AdminControls.css"

import { formatString } from '../../utilities/utilFunctions'

const AddProduct = () => {
  const [product, setProduct] = useState(productObject)
  const [state, setState] = useState({
    selectedOption: '', // Initialize the selected option
  });
  const [type, setType] = useState({
    selectedOption: '', // Initialize the selected option
  });
  const [imageUpload, setImageUpload] = useState(null)

  const { selectedOption } = state;
  const { selectedType } = type

  async function addProductToDB(prod, state, image) {
    await axios.post(`${process.env.REACT_APP_API_URL}/account/product`, {prod, state, image, type})
}

  const uploadImage = () => {
    if(imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)

    console.log(imageRef)

    // uploadBytes(imageRef, imageUpload).then(() => {
    //   console.log(imageRef)
    // })
  }

  function logObject() {
    console.log(product, state, imageUpload)
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      product: {
        ...prevState.product,
        [name]: value // Update the property corresponding to the input field name
      }
    }));

    console.log(product)
  };

  function handleImageChange(e) {
    setImageUpload(e)
    console.log(e)
  }

  function handleSelectChange(event) {
    const { value } = event.target;

    // Update the object in the state with the selected value
    setState(value)
    console.log(state)
  };

  function handleTypeChange(event) {
    const { value } = event.target;

    // Update the object in the state with the selected value
    setType(value)
    console.log(type)
  };

  return (
    <div>
      <div className='add-product-title'>Add Product</div>
      <div className='add-product-container'>
        {Object.keys(productObject).map((prod, i) => {
          return (
            <div key={i} className="input-group">
              <label className='add-prod-name m-4'>{formatString(prod)}</label>
                  <input 
                    className="form-control product-add-form" 
                    type="text" 
                    placeholder={formatString(prod)} 
                    id={prod}
                    name={prod}
                    value={product[prod]}
                    aria-describedby="basic-addon1"
                    onChange={handleInputChange}
                  />
            </div>
          )
        })}
        <div>
          <p>Strain or Product</p>
            <select 
              className="form-select lean-selection"
              name="selectedOption"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">Select an option</option>
              <option value="strain">Strain</option>
              <option value="product">Product</option>
            </select>
        </div>
        <div className='mt-3'>
          <p>Lean</p>
            <select 
              className="form-select type-selection"
              name="selectedOption"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Select an option</option>
              <option value="hybrid">Hybrid</option>
              <option value="indica">Indica</option>
              <option value="sativa">Sativa</option>
            </select>
        </div>
        <div className="input-group mb-3">
            <input 
              type="file" 
              onChange={(e) => {
                  handleImageChange(e.target.files[0])
                }} 
              className="form-control product-add-form" 
              placeholder="Image" 
              aria-label="Image" 
              aria-describedby="basic-addon1" 
            />
        </div>
      </div>     
        <button onClick={uploadImage} className='btn btn-primary'>Upload</button>
        <button onClick={() => addProductToDB(product, state)} className='btn btn-primary'>Real</button>
    </div>
  )
}

export default AddProduct