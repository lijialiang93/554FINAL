import React, { Component } from "react";
import SearchIndex from './search/SearchIndex';
import Nav from './nav/Nav'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true'
        };
    }

    render() {
        return (
            <div>
            <Nav/>
            <SearchIndex />
            </div>
        );
    }
}

export default App;
