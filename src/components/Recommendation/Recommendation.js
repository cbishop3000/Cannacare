import React, {useEffect, useState} from 'react'
import "./Recommendation.css"
import ProductGraph from '../ProductGraph/ProductGraph'

import PineappleImage from "../images/Pineapple.jpg"
import Aeriz from "../images/Aeriz.jpg"
import DrippyDrum from "../images/drippydrum.jpg"
import Carousel from './Carousel'

import axios from "axios"

const Recommendation = (prefData) => {
  let finalData  = []
  let totalObjects = []

  function percentageStringToDecimal(percentageString) {
    if (typeof percentageString !== 'string') {
      throw new Error('Input is not a string');
    }
  
    // Remove percentage sign if present and convert to a decimal
    const decimal = parseFloat(percentageString.replace('%', ''));
  
    if (isNaN(decimal)) {
      throw new Error('Invalid percentage format');
    }
  
    return decimal;
  }

  function findTopArrays(obj) {
    Object.values(obj).forEach(terp => {
      if(terp["rank"] >= 5) {
        finalData.push(terp["object"][1])
      }
    })

    return finalData
  }

  function findTopMatching(obj, comparator) {
      Object.entries(comparator).forEach(key => {
        const newObj = {
          object: key,
          index: key[0],
          totalMatching: 0,
          totalPercentage: 0,
          rank: 0
        };

        Object.entries(obj).forEach(terp => {
          if(terp[1]["value"] !== "0.00000" && key[1][terp[1]["key"]] != null) {
            newObj.totalPercentage += (terp[1]["value"]) - percentageStringToDecimal(key[1][terp[1]["key"]]).toFixed(4)
            newObj.totalMatching++
          }
        })

        newObj.rank = newObj.totalMatching / Math.abs(newObj.totalPercentage)
        totalObjects.push(newObj)  
    });
    
    return totalObjects
  }

  let result = findTopMatching(prefData.prefData[1], prefData.prefData[2])

    if(result !== null) {
      findTopArrays(result)
    }

  useEffect(() => {
    // findTopArrays(result)
    console.log(result)
  }, [])

  return (
    <div className='product-container'>
      <Carousel 
        products={finalData}
      />
    </div>
  )
}

export default Recommendation