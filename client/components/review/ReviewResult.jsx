import React, { Component } from 'react';
import axios from "axios";
import ReviewEntry from './ReviewEntry';
class ReviewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList:null,
        };
      }
    componentWillMount() {
        axios
        .get("http://localhost:3000/api/searchReviewByMovie?movie="+this.props.movie)
        .then(res=>{
          this.setState(
            {reviewList: res.data.review
            });
        });
      }

    render() {
    if(this.state.reviewList!=null)
       return(
            <div>
                <h2>Reviews:</h2>
                <div className="row">
                    {this.state.reviewList.map(review => {
                        return (<div key={review._id} className="col-sm-12 col-md-6 col-lg-4">
                            <ReviewEntry review={review}></ReviewEntry></div>);
                    })}
                </div>
            </div>
       )
    else
       return(
           <div/>
       )
    }
}

export default ReviewResult;
