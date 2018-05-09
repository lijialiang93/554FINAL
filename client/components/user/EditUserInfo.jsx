import React, { Component } from "react";
import axios from "axios";
import xss from "xss";
import { connect } from "react-redux";
var $ = require ('jquery');
class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVaild: false,
      userId: null,
      originalData: null,
      message: "",
      username: "",
      password: "",
      email: "",
      photoName: "",
      fileName: "",
      password: "",
      selectedImage: null
    };
  }

  componentWillMount() {
    let id = this.props.location.query.id;
    let userData = this.props.location.state.loggedIn
      ? this.props.location.state.userData.user
      : null;
    if (userData !== null) {
      this.setState({
        dataVaild: true,
        userId: id,
        originalData: userData,
        username: userData.name,
        email: userData.email
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
        message: ""
    });
    if (this.state.password === "" && this.state.username === this.state.originalData.name && this.state.fileName === "") {
      this.setState({
          message: "Nothing has been changed"
      });
    }
    else {
        let wouldUpdate = {};
        if (this.state.password !== "") {
            wouldUpdate.newPassword = this.state.password;
        }
        if (this.state.username !== this.state.originalData.name) {
            wouldUpdate.name = this.state.username;
        }
        if (this.state.fileName !== "") {
            wouldUpdate.selectedImage = this.state.selectedImage;
        }
        if (wouldUpdate !== null) {
            wouldUpdate.email = this.state.email;
            let formData = new FormData();
            for (var key in wouldUpdate) {
                formData.append(key, wouldUpdate[key]);
            }
            axios.post('/api/updateUserByEmail', formData , {
            headers: {
                'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                console.log(res);
                this.setState({
                    message: res.data.result
                });
            });
        }
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: xss(e.target.value)
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onPhotoChange(e) {
    this.setState({
      fileName: xss(e.target.value),
      selectedImage: e.target.files[0]
    });
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#preview")
          .attr("src", e.target.result)
          .width(300)
          .height(300);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  render() {
    if (this.state.dataVaild == false) {
      return false;
    }
    let data = this.state.originalData;

    const img = data.image ? data.image.filename : "";

    return (
      <form
        id="registerForm"
        encType="multipart/form-data"
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >
        <label htmlFor="email">Email:</label>
        <input type="text" value={this.state.email} id="email" disabled />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          value={this.state.username}
          onChange={e => {
            this.onUsernameChange(e);
          }}
          id="username"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={this.state.password}
          onChange={e => {
            this.onPasswordChange(e);
          }}
          id="password"
        />
        <br />
        <label htmlFor="photo">
          Upload your new photo (if you want to change your avatar):
        </label>
        <input
          type="file"
          value={this.state.fileName}
          accept="image/*"
          onChange={e => {
            this.onPhotoChange(e);
          }}
          id="photo"
        />
        <br />
        <img id="preview" />
        <br />
        <button type="submit" className="btn btn-primary ml-3" id="submitBtn">
          Submit
        </button>
        <div>{this.state.message}</div>
      </form>
    );
  }
}

export default EditUserInfo;