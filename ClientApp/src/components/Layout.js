import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
	static displayName = Layout.name;

	render() {
		return (
			<div className='main-background'>
				<NavMenu />
				<div className='main-children'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
