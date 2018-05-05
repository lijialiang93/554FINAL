// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // Remember our thunk this is where we will need to make use of it
// import { moviesFetchData } from '../actions/actions.js';
// // We gonna use lodash to map over our recipe object
// import _ from 'lodash';

// class Movie extends Component {
// 	constructor (props) {
// 		super(props);
// 		// Bind our render recipe to function so we can use it in the render method
//         // this.renderMovie = this.renderMovie.bind(this);
//         this.state = {
//             searchQuery: "",
//         };
// 	}

// 	// Fetch recipes when component is mounted
// 	componentDidMount () {
// 		// const API_URL = 'http://localhost:3000/api/movie/?list';
// 		// // I am setting some delay to simulate a real world request
//         // setTimeout(() => { this.props.fetchMovie(API_URL); }, 1000);
//         const API_URL = '/searchMovie';
//         this.props.fetchMovie(API_URL, "RPO");
// 	}
// 	// Function to render our recipe
// 	renderMovie () {
// 		return _.map(this.props.movieResult, movie => {
// 			// Check if there is an image to be displayed
// 			const img = movie.image ? movie.image.filename : '';
// 			// Get the html for our recipe ingredients
// 			function createMarkupForDirector () {
// 				if (movie.director) {
// 					return {
// 						__html: movie.director,
// 					};
// 				} else {
// 					return;
// 				}
// 			};
// 			// Get the html for our recipe cooking instructions
// 			function createMarkupForStars () {
// 				if (movie.stars) {
// 					return {
// 						__html: movie.stars,
// 					};
// 				} else {
// 					return;
// 				}
//             };
//             function createMarkupForStoryline () {
// 				if (movie.storyline) {
// 					return {
// 						__html: movie.storyline,
// 					};
// 				} else {
// 					return;
// 				}
// 			};
// 			// Make sure we show only published recipes
// 			if (movie.state === 'published') {
// 				return (
// 					<div key={movie._id}>
// 						<h1>{movie.name}</h1>
// 						<img style={{ width: '300px', height: '300px' }} src={img} />
//                         <h2>Director</h2>
//                         <div dangerouslySetInnerHTML={createMarkupForDirector()} />
// 						<h2>Genre: {movie.genre}</h2>
//                         <h2>MPAA: {movie.mpaa}</h2>
//                         <h2>Running Time: {movie.runningTime} mins</h2>
//                         <h2>Stars</h2>
//                         <div dangerouslySetInnerHTML={createMarkupForStars()} />
//                         <h2>Storyline</h2>
//                         <div dangerouslySetInnerHTML={createMarkupForStoryline()} />
// 					</div>
// 				);
// 			}
// 		});
// 	}
// 	render () {
// 		// If data is still loading
// 		if (this.props.loading) {
// 			return (
// 				<div>
// 					<h1>LOADING...</h1>
// 				</div>
// 			);
// 		}
// 		// Show recipe once data is loaded
// 		return (
// 			<div>
// 				{this.renderMovie()}
// 			</div>
// 		);
// 	};
// };

// function mapStateToProps(state, ownProps) {
//     // Things return here are showing in props for Characters
//     return {
//         movieResult: state.movieResult
//     };
// }
// const mapDispatchToProps = dispatch => ({
//     // Our thunk will be mapped to this.props.fetchRecipe
//     fetchMovie: (url,searchQuery) => dispatch(moviesFetchData(url,searchQuery)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Movie);
