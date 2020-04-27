import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export class HeroTalentsAndAbilities extends Component {
	static hero = {};
	constructor(props) {
		super(props);
		this.hero = props.location.hero;
		this.state = {
			visibility: true
		};
	}

	setContentCard = () => {
		if (this.state.visibility) {
			return (
				<div>
					<h1>Abilities</h1>
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

	render() {
		const contents = this.setContentCard();

		return (
			<div className='hero-t-a-container'>
				{contents}
				<button style={{ backgroundColor: this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: true })}>Abilities</button>
				<button style={{ backgroundColor: !this.state.visibility ? 'gray' : 'white' }} onClick={() => this.setState({ visibility: false })}>Talents</button>
			</div>
		);
	}
}
