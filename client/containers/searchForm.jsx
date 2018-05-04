import React, { Component } from 'react';
import { connect } from 'react-redux';
// Remember our thunk this is where we will need to make use of it
import { moviesFetchData } from '../actions/actions.js';
// We gonna use lodash to map over our recipe object
import _ from 'lodash';

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
            const API_URL = '/searchMovie';
            this.props.fetchMovie(API_URL,this.state.searchQuery);
        }
    };

    componentWillReceiveProps(newProps) {
        if(newProps.movieResult!==this.props.movieResult){
            console.log(newProps.movieResult);
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
function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        movieResult: state.movieResult
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchMovie: (url,searchQuery) => dispatch(moviesFetchData(url,searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
