import React, { Component } from 'react';
import { group } from '../tshelpers/helpers';

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

	showTrait(isTrait) {
		return !isTrait ? 'hidden' : '';
	}

	hasMana(manaCost) {
		return manaCost !== null ? manaCost : 'None';
	}

	setContent = (heroInfo) => {
		if (Object.keys(heroInfo).length > 0) {
			if (this.state.visibility) {
				return (
					<div className='abilities-container'>
						<h1>Abilities</h1>
						{heroInfo.abilities.map(h =>
							<div className='abilities-info-container' key={h.name}>
								<div><span>Title: </span>{h.title}</div>
								<div className={this.showTrait(h.trait)}>Trait</div>
								<div><span>Cooldown: </span>{h.cooldown}</div>
								<div><span>Hotkey: </span>{h.hotkey}</div>
								<div><span>Mana Cost: </span>{this.hasMana(h.mana_Cost)}</div>
								<div><span>Description: </span>{h.description}</div>
							</div>
						)}
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
			<div className='loading-placeholder'>...Loading</div>
		);
	}

	render() {
		return (
			Object.keys(this.state.heroInfo).length > 0 ? <div className='hero-t-a-container'>
				<h1>{this.state.name}</h1>
				<div className='button-container'>
					<button style={{ backgroundColor: this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: true })}>Abilities</button>
					<button style={{ backgroundColor: !this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: false })}>Talents</button>
				</div>
				{this.setContent(this.state.heroInfo)}
			</div> : <div className='loading-placeholder'>...Loading</div>

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

		data.talents = Object.values(group(data.talents, 'level'));
		//debugger;

		this.setState({ heroInfo: data, loading: false });
	}
}