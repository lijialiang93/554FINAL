import React, { Component } from "react";
import { Switch, hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { moviesFetchTopRatedData } from '../../actions/actions.js';

class TopRatedMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMatchingMovies: [],
        };
    }

    componentWillMount() {
        if (this.state.listOfMatchingMovies.length === 0) {
            const API_URL = '/getTopRated';
            this.props.fetchTopRated(API_URL);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.topRatedMovies !== this.props.topRatedMovies) {
            this.setState({
                listOfMatchingMovies: newProps.topRatedMovies.topRated
            });
        }
    }
    render() {
        const topRatedList = this.state.listOfMatchingMovies;
        if (topRatedList.length == 0) {
            return false;
        }
        else {
            return (
                <div className="pt-5">
                    <div>
                        <h2>Top Rated Movies</h2>
                    </div>
                    <div className="row">
                        {topRatedList.map(movie => {
                            let path = {
                                pathname: '/movieinfo',
                                query: {
                                    id: movie._id
                                }
                            }
                            return (
                                <div key={movie._id} className="col-4">
                                    <div className="card mb-3 text-center">
                                        <Link to={path} target="_blank">
                                            <img  className="card-img-top" id="moviePoster" src={movie.image.filename} alt={movie.name}></img>
                                        </Link>
                                        <div className="card-block">
                                            <p className="card-title">{movie.name}</p>
                                        </div>
                                    </div>
                                </div>

                            );
                            hashHistory.push(path);
                        })}
                    </div>
                </div>
            );
        }


    }
}

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        topRatedMovies: state.topRatedMovies
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchTopRated: (url) => dispatch(moviesFetchTopRatedData(url)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);