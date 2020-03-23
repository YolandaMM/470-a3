import React, {Component} from 'react';
import {NavLink} from 'react-bootstrap/NavLink';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render() {
        return (
            <div>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link className="disTable" to="/">Display by Table</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="disChart" to="/chart">Display by Chart</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}