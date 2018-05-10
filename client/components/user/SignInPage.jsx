import React, { Component } from 'react';
import SignIn from './SignIn';
import SignInResult from './SignInResult';

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.getResult = this.getResult.bind(this);
        this.state = {
            data: null,
            regSuccess: false
        };
    }

    onSubmit(userData) {
        this.setState({
            data: userData,
        });
    };

    getResult(result) {
        this.setState({
            regSuccess: result
        });
    }

    render() {
        return (
            <div className="container">
                <SignIn result={this.state.regSuccess} onSubmit={this.onSubmit}></SignIn>
                <SignInResult data={this.state.data} getResult={this.getResult}></SignInResult>
            </div>
        );
    }
}

export default SignInPage;
