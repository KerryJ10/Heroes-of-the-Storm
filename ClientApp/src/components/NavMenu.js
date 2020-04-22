import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMap } from "@fortawesome/free-solid-svg-icons";

export class NavMenu extends Component {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='sidenav'>
				<h3><a href='/'><img src='Icons/logo.png' /></a></h3>
				<Link to='/hero-list'><FontAwesomeIcon className='nav-list-icon' icon={faUsers} />Heroes</Link>
				<Link to='/maps'><FontAwesomeIcon className='nav-list-icon' icon={faMap} />Maps</Link>
			</div>
		);
	}
}
