import React, { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

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
            <div className="panel panel-default">
                <div className="panel-body">
                <SearchForm onSearch={this.onSearch}></SearchForm>
                    </div>
                <SearchResult movieName={this.state.movieName}></SearchResult>
            </div>
        );
    }
}

export default SearchIndex;
