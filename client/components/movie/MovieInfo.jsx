import React, { Component } from "react";
import axios from "axios";
import xss from 'xss';
import { connect } from "react-redux";
import { moviesFetchDataById } from "../../actions/actions";
import AddReview from "../review/AddReview";
import ReviewResult from "../review/ReviewResult";
import Rate from '../rate/Rate';
class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataVaild: false,
      movieId: null,
      movieData: null,
      reviewList: null,
      user: null,
      rate: "NOT RATED YET"
    };
  }

  componentWillMount() {
    var id = this.props.location.query.id;
    var tmpData = [];
    let currentUser = sessionStorage.getItem('currentUser');
    axios
      .get("/api/searchMovieById?id=" + id)
      .then(res => {
        tmpData = res;
        this.setState({
          dataVaild: true,
          movieId: id,
          movieData: res.data
        });
      });
    axios
      .get("/api/searchReviewByMovie?movie=" + id).
      then(res => {
        this.setState(
          {
            reviewList: res.data.review
          });
      });
    axios
      .get("/api/searchRateByMovie?movie=" + id).
      then(res => {
        if (res.data.rate != null)
          this.setState(
            {
              rate: res.data.rate.toFixed(1)
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
      <div className="container border border-primary rounded" key={data._id}>
        <div className="row pt-5 ">
          <div className="col-4 pt-5">
            <img id='infoMoviePoser' src={img} alt={data.name} />
          </div>
          <div className="col-8 ">
            <span><h1 className="text-center">{data.name}</h1></span>
            <table>
              <tbody>
                <tr>
                  <td><h2>Director： </h2></td>
                  <td><div dangerouslySetInnerHTML={createMarkupForDirector()} /></td>
                </tr>
                <tr>
                  <td><h2>Genre:  </h2></td>
                  <td>{data.genre}</td>
                </tr>
                <tr>
                  <td><h2>MPAA:  </h2></td>
                  <td>{data.mpaa}</td>
                </tr>
                <tr>
                  <td><h2>Running Time: </h2></td>
                  <td>{data.runningTime} minutes</td>
                </tr>
                <tr>
                  <td><h2>Stars: </h2></td>
                  <td><div dangerouslySetInnerHTML={createMarkupForStars()} /></td>
                </tr>
                <tr>
                  <td><h2>Rating:</h2></td>
                  <td>{this.state.rate}</td>
                </tr>
                <Rate movie={data._id} />
              </tbody>
            </table>
          </div>

          <div className='col-12'>
            <h2>Storyline:  </h2>
            <div dangerouslySetInnerHTML={createMarkupForStoryline()} />
          </div>
          <div className='col-12 text-center mt-3'>
            <a href="javascript:window.opener=null;window.open('','_self');window.close();">Close this page</a>
          </div>
        </div>
        <ReviewResult movie={data._id} />
      </div >
    );
  }
}

export default MovieInfo;
