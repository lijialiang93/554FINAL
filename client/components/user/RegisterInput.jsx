import React, { Component } from 'react';
import axios from 'axios';

class RegisterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            result: null
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.firstName && this.state.lastName && this.state.password && this.state.email) {
            let userData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email
            };
            this.props.onSubmit(userData);
        }
    };

    onfirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        });
    };

    onlastNameChange(e) {
        this.setState({
            lastName: e.target.value
        });
    };

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    };

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    };

    render() {
        return (
            <form onSubmit={(e) => { this.onSubmit(e) }}>

                <label htmlFor="firstName">
                    First Name:
                    </label>
                <input
                    type="text"
                    value={this.state.firstName}
                    // value=""
                    onChange={(e) => { this.onfirstNameChange(e) }}
                    id="firstName"
                />
                <br/>
                <label htmlFor="lastName">
                    Last Name:
                    </label>
                <input
                    type="text"
                    value={this.state.lastName}
                    //value=""
                    onChange={(e) => { this.onlastNameChange(e) }}
                    id="lastName"
                />
                <br/>
                <label htmlFor="password">
                    Password:
                    </label>
                <input
                    type="password"
                    value={this.state.password}
                    //value=""
                    onChange={(e) => { this.onPasswordChange(e) }}
                    id="password"
                />
                <br/>
                <label htmlFor="email">
                    Email:
                    </label>
                <input
                    type="text"
                    value={this.state.email}
                    //value=""
                    onChange={(e) => { this.onEmailChange(e) }}
                    id="email"
                />
                <button type="submit" className="btn btn-primary ml-3" id="submitBtn">
                    Submit
               </button>
            </form>
        );
    }
}

export default RegisterInput;