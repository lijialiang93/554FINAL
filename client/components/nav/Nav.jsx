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
            userId: null,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true'
        };
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/userStatusCheck").then(res => {
            console.log(res);
            this.setState({
                isLoggedIn: res.data.signedIn,
                username: res.data.nickname,
                userId: res.data.userId
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
        let viewInfoPath = {
            pathname: '/user/viewinfo',
            query: {
                userId: this.state.userId
            }
        };
        if (this.state.isLoggedIn == false){
        return (
            <nav className="text-right" style={{height: '50px'}}>
                <a href="http://localhost:3000/keystone/signin" target="_blank" className="col-md-1">Log in</a>
                <Link to={signInPath} className="col-md-1">Sign In</Link>
                <Link to={registerPath} className="col-md-1">Register</Link>
            </nav>
        )
        hashHistory.push(signInPath);
        hashHistory.push(registerPath);
        }
        else {
            return (
                <nav className="text-right" style={{height: '50px'}}>
                    <div>Logged In! {this.state.username} <Link to={viewInfoPath} className="col-md-1">View Personal Info</Link>
                    <a href="http://localhost:3000/keystone/signout" className="col-md-1">Sign Out</a>
                    </div>
                </nav>
            );
        }

    }
}

export default Nav;
