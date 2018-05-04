import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moviesFetchData } from '../actions/actions.js';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.searchQuery) {
            this.props.onSearch(this.state.searchQuery);
        }
    };



    onSearchQueryChange(e) {
        this.setState({
            searchQuery: e.target.value
        });
    };

    render() {
        return (
            <form onSubmit={(e) => { this.onSubmit(e) }}>

                <label htmlFor="movieName">
                    What movie do you want to search for?
                    </label>
                <input
                    type="text"
                    value={this.state.searchQuery}
                    onChange={(e) => { this.onSearchQueryChange(e) }}
                    id="movieName"
                />
                <button type="submit" className="btn btn-primary ml-3" id="searchBtn">
                    Search
               </button>
            </form>
        );
    }
}

export default SearchForm;
