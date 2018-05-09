import React, { Component } from "react";
import SearchIndex from './search/SearchIndex';
import Nav from './nav/Nav';
import TopRatedMovies from './movie/TopRatedMovies';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true'
        };
    }

    render() {
        return (
            <div className="container">
                <Nav/>
                <SearchIndex />
                <TopRatedMovies/>
            </div>
        );
    }
}

export default App;
