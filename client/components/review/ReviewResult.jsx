import React, { Component } from 'react';
import axios from "axios";
import ReviewEntry from './ReviewEntry';
import AddReview from './AddReview'
class ReviewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: null,
        };
    }
    componentWillMount() {
        axios
            .get("/api/searchReviewByMovie?movie=" + this.props.movie)
            .then(res => {
                this.setState(
                    {
                        reviewList: res.data.review
                    });
            });
    }

    render() {
        if (this.state.reviewList == null || this.state.reviewList.length <= 0)
            return (
                <div className="pt-5">
                    <hr></hr>
                    <div >
                        <h2 className="text-center">No Review</h2>
                        <div className='ml-3'>
                        <AddReview movie={this.props.movie} />
                        </div>
                    </div>

                </div>
            )
        else
            return (
                <div className="pt-5">
                    <hr></hr>
                    <h2 className="text-center">Reviews</h2>
                    <div className="row pb-5">
                        {this.state.reviewList.map(review => {
                            return (<div key={review._id} className="col-sm-12 col-md-6 col-lg-4">
                                <ReviewEntry review={review}></ReviewEntry></div>);
                        })}
                    </div>
                    <div className='ml-3'>
                        <AddReview movie={this.props.movie} />
                        </div>
                </div>
            )
    }
}

export default ReviewResult;
