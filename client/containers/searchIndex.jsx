import React, { Component } from 'react';
import SearchForm from './searchForm';
import SearchResult from './searchResult';

class SearchIndex extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this)
        this.state = {
            movieName: ""
        };
    }

    onSearch(searchQuery) {
        this.setState({
            movieName: searchQuery,
        });
    };

    render() {
        return (
            <div>
                <SearchForm onSearch={this.onSearch}></SearchForm>
                <SearchResult movieName={this.state.movieName}></SearchResult>
            </div>
        );
    }
}

export default SearchIndex;
