import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import '../custom.css';

export class Layout extends Component {
   static displayName = Layout.name;

   render() {
      return (
         <div className="main-background">
            <NavMenu />
            <Container className="main-children">
               {this.props.children}
            </Container>
         </div>
      );
   }
}
