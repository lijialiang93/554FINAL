import React, { Component } from 'react';
import AddReviewInput from './AddReviewInput';
import AddReviewResult from './AddReviewResult';
import axios from "axios";

class AddReView extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null,
            movie:this.props.movie,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
            done : false,
            author: sessionStorage.getItem('currentUser'),
        };
    }

    onSubmit(reviewData) {
        this.setState({
            data: reviewData
        });
    };

    componentWillMount() {
        axios
      .get("/api/searchReviewByAuthor?movie="+this.state.movie+"&author="+this.state.author).
      then(res=>{
        if(res.data.review.length>0)
        this.setState(
          {done: true,
          });
      });
    }

    render() {
        if(this.state.isLoggedIn){
            if(this.state.done){
                return(
                    <div className="pb-5">You can't comment twice! </div>
                )
            }else
            return (
                <div className="pt-5 pb-5">
                    <AddReviewInput onSubmit={this.onSubmit} movie={this.state.movie}></AddReviewInput>
                    <AddReviewResult data={this.state.data} ></AddReviewResult>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
}


export default AddReView;
