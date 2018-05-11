import React, { Component } from "react";
import { Link } from 'react-router';
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
                this.setState({
                    message: res.data.result
                });
            });
        }
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onPhotoChange(e) {
    this.setState({
      fileName: e.target.value,
      selectedImage: e.target.files[0]
    });
    $('#preview').attr('hidden', false);
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
      return (<div>Something went wrong when trying to get the user data</div>);
    }
    if (this.state.message === 'Your information has been updated successfully!') {
      return (<div>
        {this.state.message}
        <br/>
        <Link to='/'>Back to Homepage</Link>
      </div>);
    }
    let data = this.state.originalData;

    const img = data.image ? data.image.filename : "";

    return (
        <div className="container">
          <form className="form-horizontal"
            id="registerForm"
            encType="multipart/form-data"
            onSubmit={e => {
              this.onSubmit(e);
            }}
          >
              <span className="form-signin-heading"> <h1 className="text-center pb-5">Edit User Information</h1></span>
              <table width={'100%'} height={'200px'}>
                  <tbody>
                  <tr>
                      <td><label htmlFor="email">Email:</label></td>
                      <td><input type="text" value={this.state.email} id="email" disabled /></td>
                  </tr>
                  <tr>
                      <td><label htmlFor="username">Username:</label></td>
                      <td><input type="text" value={this.state.username} onChange={e => {this.onUsernameChange(e);}} id="username"/></td>
                  </tr>
                  <tr>
                      <td><label htmlFor="password">Password:</label></td>
                      <td><input type="password" value={this.state.password} onChange={e => {this.onPasswordChange(e);}} id="password"/></td>
                  </tr>
                  <tr>
                      <td><label htmlFor="photo">Upload your new photo (if you want to change your avatar):</label></td>
                      <td><input type="file" value={this.state.fileName} accept="image/*" onChange={e => {this.onPhotoChange(e);}} id="photo"/></td>
                  </tr>
                  </tbody>
              </table>
              <img className="pb-5" id="preview" alt='newAvatar' hidden/>
              <br />
              <button type="submit" className="btn btn-lg btn-primary btn-block"  id="submitBtn">
              Submit
              </button>
              <div>{this.state.message}</div>
          </form>
            </div>
    );
  }
}

export default EditUserInfo;
