import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { HeroList } from './components/HeroList';
import { Maps } from './components/Maps';

import './style/scss/hots-styles.scss';

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Layout className='main-background'>
				<Route exact path='/' component={Home} />
				<Route path='/maps' component={Maps} />
				<Route path='/hero-list' component={HeroList} />
			</Layout>
		);
	}
}
