import React, { Component } from 'react';
import axios from 'axios';
var $ = require ('jquery')

class RegisterInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            photoName: "",
            fileName: "",
            selectedImage: "",
            result: null
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.firstName && this.state.lastName && this.state.password && this.state.email && this.state.selectedImage) {
            let userData = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                photoName: this.state.email+ "_photo",
                selectedImage: this.state.selectedImage
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
                    .width(150)
                    .height(200);;
            };
            reader.readAsDataURL(e.target.files[0]);
        }

    };


    render() {
        return (
            <form encType="multipart/form-data" onSubmit={(e) => { this.onSubmit(e) }} >

                <label htmlFor="firstName">
                    First Name:
                    </label>
                <input
                    type="text"
                    value={this.state.firstName}
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