import React, { Component } from "react";
import SearchIndex from './search/SearchIndex';
import Nav from './nav/Nav';
import Popular from './movie/popularMovie';
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
            <Popular/>
            </div>
        );
    }
}

export default App;
