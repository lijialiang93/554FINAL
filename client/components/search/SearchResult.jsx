import React, { Component } from "react";
import { connect } from 'react-redux';
import { moviesFetchData } from '../../actions/actions.js';
import SearchResultList from './SearchResultList';

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfMatchingMovies: [],
            searched: false
        };
    }


    componentWillReceiveProps(newProps) {
        if (newProps.movieName && newProps.movieName !== this.props.movieName) {
            const API_URL = '/searchMovie';
            this.props.fetchMovie(API_URL, newProps.movieName);
        }
        if (newProps.movieResult !== this.props.movieResult) {
            this.setState({
                listOfMatchingMovies: newProps.movieResult.movie,
                searched: true
            });

        }
    }


    render() {
        const movies = this.state.listOfMatchingMovies;
        if (movies.length > 0 && this.state.searched) {
            console.log(movies);
            return <SearchResultList movieList={movies} />;
        }
        else {
            return false;
        }
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
    fetchMovie: (url, searchQuery) => dispatch(moviesFetchData(url, searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);