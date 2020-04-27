import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export class HeroTalentsAndAbilities extends Component {
	static hero = {};
	constructor(props) {
		super(props);
		this.hero = props.location.hero;
	}

	render() {
		return (
			<div className='hero-t-a-container'>
				<h1>Talent and Abilities coming soon</h1>
				<h1>Name: {this.hero.name}</h1>
				<h1>Hero ID: {this.hero.id}</h1>
			</div>
		);
	}
}
