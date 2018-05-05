import React, { Component } from "react";
class Nav extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <nav>
                <a href="http://localhost:3000/keystone/signin" target="_blank">Log in</a>
            </nav>
        )

    }
}

export default Nav;
