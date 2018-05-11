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
      <div className="container pt-5 pb-5" key={data._id}>
          <div className="text-right pb-5">
              <Link to='/'>Back to Homepage</Link>&nbsp;&nbsp;
              <Link to={editInfoPath}>Edit User Information</Link>
          </div>
          <div className="row pt-5 border border-primary rounded">
            <div className="col-sm-8 ">
                <span><h1>{data.name}</h1></span>
                <table>
                    <tbody>
                    <tr>
                        <td><h2>Email:</h2></td>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <td><h2>Username:</h2></td>
                        <td>{xss(data.name)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
              <div className="col-sm-4 ">
                <img id='userAvatar' src={img} alt='avatar'/>
              </div>
          </div>

      </div>
    );
    hashHistory.push(editInfoPath);
  }
}

export default UserInfo;
