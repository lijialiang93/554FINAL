import React, { Component } from "react";
import axios from "axios";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentWillMount() {
    axios.get("http://localhost:3000/api/userSignOut").then(res => {
      console.log(res);
      this.setState({
        message: res.data.signedOut
      });
      sessionStorage.setItem("loggedIn", false);
    });
  }

  render() {
    return (
      <div>
        {this.state.message}
        <br />
        {/* <meta http-equiv="refresh" content="5; url=http://localhost:3000/" /> */}
      </div>
    );
  }
}

export default SignOut;
