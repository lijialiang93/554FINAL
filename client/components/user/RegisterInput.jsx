import React, { Component } from 'react';
import xss from 'xss';
var $ = require ('jquery');

class RegisterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            photoName: "",
            fileName: "",
            selectedImage: "",
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
        if (this.state.username && this.state.password && this.state.email && this.state.selectedImage) {
            let userData = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                selectedImage: this.state.selectedImage,
            };
            this.props.onSubmit(userData);
        }
    };

    onUsernameChange(e) {
        this.setState({
            username: xss(e.target.value)
        });
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

    onPhotoChange(e) {
        this.setState({
            fileName: xss(e.target.value),
            selectedImage: e.target.files[0]
        });
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#preview')
                    .attr('src', e.target.result)
                    .width(300)
                    .height(300);
            };
            reader.readAsDataURL(e.target.files[0]);
        }

    };


    render() {
        return (
            <form className="form-horizontal" id="registerForm" encType="multipart/form-data" onSubmit={(e) => { this.onSubmit(e) }} >
                <span className="form-signin-heading"> <h1 className="text-center pb-5">User Register</h1></span>
                <table width={'100%'} height={'200px'}>
                    <tr >
                        <td>
                            <label htmlFor="nickname" className="">
                                Nickname:
                            </label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={this.state.nickname}
                                onChange={(e) => { this.onUsernameChange(e) }}
                                id="nickname"
                                className="form-control"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password" className="">
                                Password:
                            </label>
                        </td>
                        <td>
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={(e) => { this.onPasswordChange(e) }}
                                id="password"
                                className="form-control"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">
                                Email:
                            </label>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={this.state.email}
                                onChange={(e) => { this.onEmailChange(e) }}
                                id="email"
                                className="form-control"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="photo">
                                Photo:
                            </label>
                        </td>
                        <td>
                            <input
                                type="file"
                                value={this.state.fileName}
                                accept="image/*"
                                onChange={(e) => { this.onPhotoChange(e) }}
                                id="photo"/>
                        </td>
                    </tr>
                </table>
                <img id="preview" />
                <br />
                <button type="submit" className="btn btn-lg btn-primary btn-block" id="submitBtn">
                    Submit
               </button>
            </form>
        );
    }
}

export default RegisterInput;