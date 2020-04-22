import React, { Component } from 'react';
import Moment from 'react-moment';

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
			//TODO Use for reference on Hero List table
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th className='hero-name-th'>Hero</th>
						<th>Type</th>
						<th>Role</th>
						<th>Release Date</th>
					</tr>
				</thead>
				<tbody>
					{heroes.map(hero =>
						<tr key={hero.date}>
							<td className='hero-name-td'>
								<div className='hero-name'>{hero.name}</div>
								<img className='hero-icon' src={hero.icon} alt='Hero Icon' />
							</td>
							<td className='vertical-center hero-type-td'>{hero.type}</td>
							<td className='vertical-center hero-role-td'>{hero.role}</td>
							<td className='vertical-center'><Moment format='MM/DD/YYYY' date={hero.release_Date}/></td>
						</tr>
					)}
				</tbody>
			</table>
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
