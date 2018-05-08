import React, { Component } from 'react';
import axios from 'axios';
var $ = require ('jquery');

class RegisterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
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
        if (this.state.nickname && this.state.password && this.state.email && this.state.selectedImage) {
            let userData = {
                nickname: this.state.nickname,
                password: this.state.password,
                email: this.state.email,
                selectedImage: this.state.selectedImage,
            };
            this.props.onSubmit(userData);
        }
    };

    onNicknameChange(e) {
        this.setState({
            nickname: e.target.value
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

    onPhotoChange(e) {
        this.setState({
            fileName: e.target.value,
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
            <form id="registerForm" encType="multipart/form-data" onSubmit={(e) => { this.onSubmit(e) }} >

                <label htmlFor="nickname">
                    Nickname:
                    </label>
                <input
                    type="text"
                    value={this.state.nickname}
                    onChange={(e) => { this.onNicknameChange(e) }}
                    id="nickname"
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
                <label htmlFor="email">
                    Email:
                    </label>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={(e) => { this.onEmailChange(e) }}
                    id="email"
                />
                <br />
                <label htmlFor="photo">
                    Upload your photo:
                </label>
                <input
                    type="file"
                    value={this.state.fileName}
                    accept="image/*"
                    onChange={(e) => { this.onPhotoChange(e) }}
                    id="photo"/>
                <br />
                <img id="preview" />
                <br />
                <button type="submit" className="btn btn-primary ml-3" id="submitBtn">
                    Submit
               </button>
            </form>
        );
    }
}

export default RegisterInput;