import React, { Component } from "react";
import axios from "axios";
import xss from 'xss';
import { connect } from "react-redux";
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVaild: false,
      userId: null,
      userData: null,
    };
  }

  componentWillMount() {
    var id = this.props.location.query.userId;
    axios
      .get("http://localhost:3000/api/getUserById?id=" + id)
      .then(res => {
        this.setState({
          dataVaild: true,
          userId: id,
          userData: res.data
        });
      });
  }

  render() {
    if (this.state.dataVaild == false) {
      return false;
    }
    let data = this.state.userData.user;

    const img = data.image ? data.image.filename : "";

    return (
      <div key={data._id}>
        <h1>{data.name}</h1>
        <img style={{ width: "300px", height: "300px" }} src={img} />
        <h2>Email: {data.email}</h2> 
        <h2>Username: {xss(data.name)}</h2>

      </div>
    );
  }
}

export default UserInfo;
