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
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
            canAccessKeystone:false
        };
    }

    componentDidMount() {
        axios.get("/api/userStatusCheck").then(res => {
            this.setState({
                isLoggedIn: res.data.signedIn,
                username: res.data.nickname,
                userId: res.data.userId,
                canAccessKeystone:res.data.canAccessKeystone
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
            <nav className="text-right">
                <Link to={signInPath} className="col-md-1">Sign In</Link>
                <Link to={registerPath} className="col-md-1">Register</Link>
            </nav>
        )
        hashHistory.push(signInPath);
        hashHistory.push(registerPath);
        }
        else {
            if(this.state.canAccessKeystone){
                return (
                    <nav className="text-right">
                        <div>Welcome back, {this.state.username} <Link to={viewInfoPath} className="col-md-1">View Personal Info</Link>
                        <a href="/keystone" target="_blank" className="col-md-1">Manage</a>
                        <a href="/keystone/signout" className="col-md-1">Sign Out</a>
                        </div>
                    </nav>
                );
                hashHistory.push(viewInfoPath);
            }
            else{
                return (
                    <nav className="text-right" >
                        <div>Welcome back! {this.state.username} <Link to={viewInfoPath} className="col-md-1">View Personal Info</Link>
                        <a href="/keystone/signout" className="col-md-1">Sign Out</a>
                        </div>
                    </nav>
                );
                hashHistory.push(viewInfoPath);
            }
           
        }

    }
}

export default Nav;
