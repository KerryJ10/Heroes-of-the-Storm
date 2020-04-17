import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
   static displayName = NavMenu.name;

   constructor(props) {
      super(props);

      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
         collapsed: true
      };
   }

   toggleNavbar() {
      this.setState({
         collapsed: !this.state.collapsed
      });
   }

   render() {
      return (
         <div className="sidenav">
            <h3>Heroes of the Storm</h3>
            <Link to="/fetch-data">Heroes</Link>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
            <a href="#">Link 4</a>
         </div>
         //<header>
         //   <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
         //      <Container>
         //         <NavbarBrand tag={Link} to="/">Heroes</NavbarBrand>
         //         <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
         //         <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
         //            <ul className="navbar-nav flex-grow">
         //               <NavItem>
         //                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
         //               </NavItem>
         //               <NavItem>
         //                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
         //               </NavItem>
         //               <NavItem>
         //                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
         //               </NavItem>
         //            </ul>
         //         </Collapse>
         //      </Container>
         //   </Navbar>
         //</header>
      );
   }
}
