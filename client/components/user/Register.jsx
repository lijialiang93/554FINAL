import React, { Component } from 'react';
import RegisterInput from './RegisterInput';
import RegisterResult from './RegisterResult';

class Register extends Component {
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
            <div>
                <RegisterInput onSubmit={this.onSubmit}></RegisterInput>
                <RegisterResult data={this.state.data}></RegisterResult>
            </div>
        );
    }
}

export default Register;
