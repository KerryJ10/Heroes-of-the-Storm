import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { group } from '../tshelpers/helpers';

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
			<div className='hero-container'>
				{heroes.map(hero =>
					<div key={hero.group}>
						<h1 className='hero-group'>{hero.group}</h1>
						<div className='hero-group-container'>
							{hero.children.map(h =>
								<Link to={{ pathname: '/hero-info', hero: { name: h.name, id: h.id } }}
									onClick={() => {
										localStorage.setItem('id', h.id);
										localStorage.setItem('name', h.name);
									}}
									key={h.name}
									className='hero-card-container'>
									<div className='hero-card'>
										<h3 className='hero-card-title'>{h.name}</h3>
										<div className='hero-grid'>
											<div>
												<div><img className='hero-icon' src={h.icon} alt='Hero Icon' /></div>
											</div>
											<div>
												<ul className='hero-info-list'>
													<li><span>Type: </span>{h.type}</li>
													<li><span>Role: </span>{h.role}</li>
													<li><span>Release Date: </span><Moment format='MM/DD/YYYY' date={h.release_Date} /></li>
												</ul>
											</div>
										</div>

									</div>
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
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
		const heroList = Object.values(group(data, 'name'));
		
		this.setState({ heroList: heroList, loading: false });
	}
}
