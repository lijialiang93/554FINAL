import React, { Component } from "react";
import { Switch, hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { userLoginFetchResult } from '../../actions/actions.js';

class SignInResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            userId: null,
            success: false,
            email: ""
        };
    }


    componentWillReceiveProps(newProps) {
        if (newProps.data != this.props.data) {
            const API_URL = '/userSignIn';
            this.props.fetchLoginResult(API_URL, newProps.data);
        }
        if (newProps.loginResult != this.state.loginResult) {

            this.setState({
                result: newProps.loginResult.message? newProps.loginResult.message : "",
                userId: newProps.loginResult.session? newProps.loginResult.userId : null,
                success: newProps.loginResult.success,
                email: newProps.loginResult.email
            });
            if (newProps.loginResult.session) {
                sessionStorage.setItem("loggedIn", true);
                sessionStorage.setItem("currentUser", newProps.loginResult.email);
                this.props.getResult(true);
            }
            else {
                sessionStorage.setItem("loggedIn", false);
                this.props.getResult(false);
            }
        }
    }


    render() {
        if (this.state.success !== undefined && this.state.userId !== null) {
            let path = {
                pathname: '/',
                state: this.state.userId
            };
            return (
                <div className="text-center">
                {this.state.email + " have logged in!"}
                <br/>
                <Link to={path}>Back to Homepage</Link>
                </div>
            );
            hashHistory.push(path);
        }
        else {
            return (
                <div className="text-center">{this.state.result}</div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        loginResult: state.userLoginResult
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchLoginResult: (url, searchQuery) => dispatch(userLoginFetchResult(url, searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(SignInResult);