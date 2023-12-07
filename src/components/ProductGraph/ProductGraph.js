/* App.js */
import React, { useEffect } from 'react';
import './ProductGraph.css'

import { Doughnut } from 'react-chartjs-2';

const ProductGraph = (strain) => {

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
			if(terpenes[terp] !== undefined & strain[terp] !== null & terp !== 'id' & terp !== 'image' & terp !== 'name' & terp !== 'lean' & terp !== 'brand' & terp !== 'type') {
				terpenes[terp].count++
				terpenes[terp].percentage.push(parseFloat(strain[terp]))
				terpenes[terp].median += parseFloat(strain[terp])
				terpenes[terp].result = terpenes[terp].median / terpenes[terp].count
			}
		  }
	  })
	}

	getAverages(strain.strain)

	var objects = {};

	for (let terp in terpenes) {
		objects[terp] = {terp: terpenes[terp].result};
	}

	for(let i = 0; i < Object.values(objects).length; i++) {
		terpResults.push(Object.values(objects)[i].terp.toFixed(5))
	}

	useEffect(() => {
		
	}, [strain])

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
		
		return (
			<div>
				<div className='table-container'>
					<ul className='terp-list'>
						{Object.values(terpenes).map((terp, i) => {
							return (
								<div key={i}>
									<div className='terpene-data'>
										<p className='prod-cell-block-names' key={terp.name}>{terp.name}</p>
										<p className='prod-cell-block-values' key={i}>{terp.result.toFixed(4)}</p>
									</div>
								</div>
							)
						})}
					</ul>
				</div>
				<div className='graph-container'>
					<Doughnut data={data} />
				</div>
			</div>
		
		);
}
 
export default ProductGraph 