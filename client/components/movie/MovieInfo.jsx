import React, { Component } from "react";
import axios from "axios";
import xss from 'xss';
import { connect } from "react-redux";
import { moviesFetchDataById } from "../../actions/actions";
import AddReview from "../review/AddReview";
import ReviewResult from "../review/ReviewResult";
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVaild: false,
      movieId: null,
      movieData: null,
      reviewList:null,
      user: null
    };
  }

  componentWillMount() {
    var id = this.props.location.query.id;
    var tmpData = [];
    let currentUser = sessionStorage.getItem('currentUser');
    axios
      .get("http://localhost:3000/api/searchMovieById?id=" + id)
      .then(res => {
        tmpData = res;
        this.setState({
          dataVaild: true,
          movieId: id,
          movieData: res.data
        });
      });
    axios
      .get("http://localhost:3000/api/searchReviewByMovie?movie="+id).
      then(res=>{
        this.setState(
          {reviewList: res.data.review
          });
      });
  }

  render() {
    if (this.state.dataVaild == false) {
      return false;
    }
    //var data = this.props.location.query;
    let data = this.state.movieData.movie;

    const img = data.image ? data.image.filename : "";
    function createMarkupForDirector() {
      if (data.director) {
        return {
          __html: xss(data.director)
        };
      } else {
        return;
      }
    }
    function createMarkupForStars() {
      if (data.stars) {
        return {
          __html: xss(data.stars)
        };
      } else {
        return;
      }
    }
    function createMarkupForStoryline() {
      if (data.storyline) {
        return {
          __html: xss(data.storyline)
        };
      } else {
        return;
      }
    }

    return (
      <div key={data._id}>
        <h1>{data.name}</h1>
        <img style={{ width: "300px", height: "300px" }} src={img} />
        <h2>Director</h2>
        <div dangerouslySetInnerHTML={createMarkupForDirector()} />
        <h2>Genre: {data.genre}</h2>
        <h2>MPAA: {data.mpaa}</h2>
        <h2>Running Time: {data.runningTime} mins</h2>
        <h2>Stars</h2>
        <div dangerouslySetInnerHTML={createMarkupForStars()} />
        <h2>Storyline</h2>
        <div dangerouslySetInnerHTML={createMarkupForStoryline()} />
        <ReviewResult movie={data._id}/>
        <AddReview movie={data._id}/>
        <h2>Rating:  {data.rating}</h2>

      </div>
    );
  }
}

export default MovieInfo;
