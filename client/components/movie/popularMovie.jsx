import React, { Component } from "react";
import { Switch, hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { moviesFetchPopularData } from '../../actions/actions.js';

class PopularMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfMatchingMovies: [],
        };
    }

    componentWillMount() {
        if (this.state.listOfMatchingMovies.length === 0) {
            const API_URL = '/getPopular';
            this.props.fetchPopular(API_URL);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.popularMovies !== this.props.popularMovies) {
            this.setState({
                listOfMatchingMovies: newProps.popularMovies.popular
            });
        }
    }
    render() {
        const popularList = this.state.listOfMatchingMovies;
        if (popularList.length == 0) {
            return false;
        }
        else {
            return (
                <div className="bg-primary">
                    <h1>Popular Movies</h1>
                    {popularList.map(movie => {
                        let path = {
                            pathname: '/movieinfo',
                            query: {
                                id: movie._id
                            }
                        }
                        return (
                            <div key={movie._id} className="col-sm-12 col-md-6 col-lg-4">
                                <div className="card mb-3 text-center">
                                    <Link to={path} target="_blank">
                                        <img style={{ width: '300px', height: '300px' }} src={movie.image.filename}></img>
                                    </Link>
                                    <div className="card-block">
                                        <p className="card-title">{movie.name}</p>
                                    </div>
                                </div>
                            </div>);
                             hashHistory.push(path);
                    })}
                </div>
            );
        }


    }
}

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        popularMovies: state.popularMovies
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchPopular: (url) => dispatch(moviesFetchPopularData(url)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PopularMovie);