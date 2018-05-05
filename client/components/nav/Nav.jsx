import React, { Component } from "react";
import { Link, hashHistory, Router } from 'react-router';
import Register from '../user/Register';

class Nav extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let path = {
            pathname: '/user/register',
        };
        return (
            <nav>
                <a href="http://localhost:3000/keystone/signin" target="_blank">Log in</a>
                <Link to={path}>Register</Link>
            </nav>
        )
        hashHistory.push(path);

    }
}

export default Nav;
