import React, { Component } from "react";
import { Link, hashHistory } from 'react-router';
import axios from "axios";
import xss from "xss";
import { connect } from "react-redux";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVaild: false,
      userId: null,
      userData: null,
      loggedIn: false
    };
  }

  componentWillMount() {
    var id = this.props.location.query.userId;
    axios.get("/api/userStatusCheck").then(res => {
      if (res.data.signedIn === true) {
        this.setState({
          loggedIn: true
        });
        axios
          .get("/api/getUserById?id=" + id)
          .then(res => {
            this.setState({
              dataVaild: true,
              userId: id,
              userData: res.data
            });
          });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  }

  render() {
    if (this.state.loggedIn === false) {
        return (<div>Unauthorized Access!</div>);
    }
    if (this.state.dataVaild == false) {
      return (<div>Something went wrong when trying to retrieve user data.</div>);
    }
    let data = this.state.userData.user;

    const img = data.image ? data.image.filename : "";

    let editInfoPath = {
        pathname: '/user/editinfo',
        query: {
            id: this.state.userId
        },
        state: {
            loggedIn: this.state.dataVaild,
            userData: this.state.userData
        }
    };

    return (
      <div key={data._id}>
        <h1>{data.name}</h1>
        <img style={{ width: "300px", height: "300px" }} src={img} />
        <h2>Email: {data.email}</h2>
        <h2>Username: {xss(data.name)}</h2>
        <Link to={editInfoPath}>Edit User Info</Link>
      </div>
    );
    hashHistory.push(editInfoPath);
  }
}

export default UserInfo;
