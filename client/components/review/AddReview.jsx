import React, { Component } from 'react';
import AddReviewInput from './AddReviewInput';
import AddReviewResult from './AddReviewResult';

class AddReView extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null,
            movie:this.props.movie,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
        };
    }

    onSubmit(reviewData) {
        this.setState({
            data: reviewData
        });
    };

    render() {
        if(this.state.isLoggedIn){
            return (
                <div>
                    <h2>New Review:</h2><br />
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
