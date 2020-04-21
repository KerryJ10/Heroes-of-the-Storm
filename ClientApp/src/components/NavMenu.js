import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='sidenav'>
				<h3><a href='/'>Heroes of the Storm</a></h3>
				<Link to='/hero-list'>Heroes</Link>
				<Link to='/maps'>Maps</Link>
			</div>
		);
	}
}
