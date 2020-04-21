import React, { Component } from 'react';

export class HeroList extends Component {
	static displayName = HeroList.name;

	constructor(props) {
		super(props);
		this.state = { heroList: [], loading: true };
	}

	componentDidMount() {
		this.populateHeroData();
	}

	static renderHeroesTable(heroes) {
		return (
			<div>
				{heroes.map(hero =>
					<div>
						<div><img src={hero.icon} alt='Hero Icon' /></div>
						<div>{hero.name}</div>
					</div>
				)}
			</div>

			//TODO Use for reference on Hero List table
			//<table className='table table-striped' aria-labelledby="tabelLabel">
			//	<thead>
			//		<tr>
			//			<th>Date</th>
			//			<th>Temp. (C)</th>
			//			<th>Temp. (F)</th>
			//			<th>Summary</th>
			//		</tr>
			//	</thead>
			//	<tbody>
			//		{heroes.map(hero =>
			//			<tr key={hero.date}>
			//				<td><img src={hero.icon}></img></td>
			//				<td>{hero.name}</td>
			//				<td>{hero.temperatureF}</td>
			//				<td>{hero.summary}</td>
			//			</tr>
			//		)}
			//	</tbody>
			//</table>
		);
	}

	render() {
		const contents = this.state.loading
			? <p><em>Loading...</em></p>
			: HeroList.renderHeroesTable(this.state.heroList);

		return (
			<div className='hero-list'>
				<h1 id='tabelLabel'>Heroes</h1>
				{contents}
			</div>
		);
	}

	async populateHeroData() {
		const response = await fetch('herolist',
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});
		const data = await response.json();
		this.setState({ heroList: data, loading: false });
	}
}
