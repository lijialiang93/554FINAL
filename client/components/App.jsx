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
            <div className="container pt-2">
                <Nav />
                <h1 className="text-center">Movie Review System</h1>
                <SearchIndex />
                <TopRatedMovies />
            </div>
        );
    }
}

export default App;
