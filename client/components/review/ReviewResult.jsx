import React, { Component } from 'react';
import axios from "axios";

class ReviewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList:null,
        };
      }
    componentWillReceiveProps() {
        axios
        .get("http://localhost:3000/api/searchReviewByMovie?movie="+this.props.movie)
        .then(res=>{
          this.setState(
            {reviewList: res.data.review
            });
        });
      }

    render() {
       return(
           <div></div>
       )
    }
}

export default ReviewResult;
