import React, { Component } from "react";
import { connect } from 'react-redux';
import { moviesFetchData } from '../../actions/actions.js';
import { Link, hashHistory } from 'react-router';

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            match: "",
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
                match: newProps.movieResult,
                searched: true
            });

        }
    }


    render() {
        const movie = this.state.match.movie;
        const path = {
            pathname: '/movieinfo',
            query: movie
        }
        if (this.state.searched && movie !== "NOT FOUND") {
            return (
                <div>
                    {movie.name}
                    <Link to={path} target="_blank">
                        <img style={{ width: '300px', height: '300px' }} src={movie.image.filename}></img>
                    </Link>
                </div>
            );
            hashHistory.push(path);
        }
        else {
            return (<div></div>);
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