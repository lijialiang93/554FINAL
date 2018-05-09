import React, { Component } from 'react';
import { Link } from 'react-router';
import RegisterInput from './RegisterInput';
import RegisterResult from './RegisterResult';

class Register extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.getResult = this.getResult.bind(this);
        this.state = {
            data: null,
            success: false
        };
    }

    componentWillMount() {
        this.setState({
            data: null,
            success: false
        });
    }

    onSubmit(userData) {
        this.setState({
            data: userData,
        });
    };

    getResult(result) {
        this.setState({
            success: result
        });
    }

    render() {
        return (
            <div className="container">
                <RegisterInput result={this.state.success} onSubmit={this.onSubmit}></RegisterInput>
                <RegisterResult data={this.state.data} getResult={this.getResult}></RegisterResult>
            </div>
        );
    }
}

export default Register;
