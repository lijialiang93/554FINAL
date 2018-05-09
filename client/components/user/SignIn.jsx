import React, { Component } from 'react';
import xss from 'xss';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
            result: null
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.password && this.state.email && this.state.result == null) {
            let userLogin = {
                password: this.state.password,
                username: this.state.email
            };
            this.props.onSubmit(userLogin);
        }

    };

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    };

    onEmailChange(e) {
        this.setState({
            email: xss(e.target.value)
        });
    };

    render() {
        return (
            <form onSubmit={(e) => { this.onSubmit(e) }}>

                <label htmlFor="email">
                    Email:
                    </label>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={(e) => { this.onEmailChange(e) }}
                    id="email"
                />
                <br/>
                <label htmlFor="password">
                    Password:
                    </label>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={(e) => { this.onPasswordChange(e) }}
                    id="password"
                />
                <br/>
                <button type="submit" className="btn btn-primary ml-3" id="submitBtn">
                    Submit
               </button>
            </form>
        );
    }
}

export default SignIn;