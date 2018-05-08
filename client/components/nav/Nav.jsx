import React, { Component } from "react";
import { Link, hashHistory, Router } from 'react-router';
import axios from 'axios';
import Register from '../user/Register';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            username: "",
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true'
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/userStatusCheck").then(res => {
            console.log(res);
            this.setState({
                isLoggedIn: res.data.signedIn,
                username: res.data.nickname
            });
            sessionStorage.setItem('loggedIn', this.state.isLoggedIn);
        });
    }

    render() {
        let signInPath = {
            pathname: '/user/signin',
        };
        let registerPath = {
            pathname: '/user/register',
        };
        if (this.state.isLoggedIn == false){
        return (
            <nav>
                <a href="http://localhost:3000/keystone/signin" target="_blank">Log in</a>
                <Link to={signInPath}>Sign In</Link>
                <Link to={registerPath}>Register</Link>
            </nav>
        )
        hashHistory.push(signInPath);
        hashHistory.push(registerPath);
        }
        else {
            return (
                <div>Logged In! {this.state.username}
                <br/>
                <a href="http://localhost:3000/keystone/signout">Sign Out</a>
                </div>
            );
        }

    }
}

export default Nav;
