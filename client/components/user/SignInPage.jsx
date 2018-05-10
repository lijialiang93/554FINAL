import React, { Component } from 'react';
import SignIn from './SignIn';
import SignInResult from './SignInResult';

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null
        };
    }

    onSubmit(userData) {
        this.setState({
            data: userData,
        });
    };

    render() {
        return (
            <div className="container">
                <SignIn onSubmit={this.onSubmit}></SignIn>
                <SignInResult data={this.state.data}></SignInResult>
            </div>
        );
    }
}

export default SignInPage;
