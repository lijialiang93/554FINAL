import React, { Component } from 'react';
import xss from 'xss';
var $ = require('jquery');

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            email: "",
            result: false
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            result: newProps.result
        }, () => {
            if (this.state.result === true) {
                $('#submitBtn').attr('disabled', 'disabled');
                $('#registerForm :input').prop('disabled', true);
            } else {
                $('#submitBtn').attr('enabled', 'enabled');
                $('#registerForm :input').prop('disabled', false);
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.password && this.state.email && this.state.result === false) {
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
        if (this.state.result === true) {
            return false;
        }
        return (
            <div>
                <form className="form-signin" onSubmit={(e) => { this.onSubmit(e) }}>
                    <span className="form-signin-heading"> <h1 className="text-center">User Login</h1></span>
                    <div className="pt-5 pb-3">
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={(e) => { this.onEmailChange(e) }}
                            id="email"
                            placeholder="Email"
                            className="form-control"
                        />
                    </div>
                    <div className="pt-5 pb-3">
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={(e) => { this.onPasswordChange(e) }}
                            id="password"
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>
                    <div className="pt-5 pb-3">
                        <button type="submit" className="btn btn-lg btn-primary btn-block " id="submitBtn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;