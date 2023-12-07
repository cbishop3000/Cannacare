/* App.js */
import React, { useEffect } from 'react';
import './Graph.css'

import { Doughnut } from 'react-chartjs-2';

const Graph = (strain) => {

	useEffect(() => {
		// console.log(strain.strains[1])
	}, [])
		
		return (
			<div>
				<div className='table-container'>
					<ul className='terp-list'>
						{Object.values(strain.strains[1]).map((terp, i) => {
							return (
								<div key={i}>
									<div className='terpene-data'>
										<p className='cell-block-names' key={terp.name}>{terp.name}</p>
										<p className='cell-block-values' key={i}>{terp.result.toFixed(4)}</p>
									</div>
								</div>
							)
						})}
					</ul>
				</div>
				<div className='graph-container'>
					<Doughnut data={strain.strains[0]} />
				</div>
			</div>
		
		);
}
 
export default Graph 