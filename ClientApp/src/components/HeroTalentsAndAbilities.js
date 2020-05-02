import React, { Component } from 'react';

export class HeroTalentsAndAbilities extends Component {
	static hero = {};
	constructor(props) {
		super(props);

		this.state = {
			heroInfo: {},
			visibility: true,
			loading: true,
			name: localStorage.getItem('name'),
			id: localStorage.getItem('id')
		};
	}

	componentDidMount() {
		this.populateHero();
	}

	setContent = () => {
		if (Object.keys(this.state.heroInfo).length > 0) {
			if (this.state.visibility) {
				return (
					<div className='abilities-container'>
						<h1>Abilities</h1>
						<div className='abilities-info-container'>
						</div>
					</div>
				);
			} else {
				return (
					<div>
						<h1>Talents</h1>
					</div>
				);
			}
		}
		return (
			<div></div>
		);
	}

	render() {
		const content = this.setContent();

		return (
			<div className='hero-t-a-container'>
				<h1>{this.state.name}</h1>
				<div className='button-container'>
					<button style={{ backgroundColor: this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: true })}>Abilities</button>
					<button style={{ backgroundColor: !this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: false })}>Talents</button>
				</div>
				{content}
			</div>
		);
	}

	async populateHero() {
		const heroId = this.state.id;
		const heroName = this.state.name;

		const response = await fetch(`heroinfo?id=${heroId}&name=${heroName}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			});

		const data = await response.json();
		this.setState({ heroInfo: data, loading: false });
	}
}