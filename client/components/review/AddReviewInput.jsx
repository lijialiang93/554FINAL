import React, { Component } from 'react';

class AddReviewInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: sessionStorage.getItem('currentUser'),
            content: "",
            movie: this.props.movie
        };
    }

    onContentChange(e) {
        this.setState({
            content: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();
        
        if (this.state.author && this.state.content && this.state.movie) {
            let reviewData = {
                author: this.state.author,
                content: this.state.content,
                movie: this.state.movie
            };
            this.props.onSubmit(reviewData);
            
        }
        
    };

    render() {
        return (
            <div>
                <form onSubmit={(e) => { this.onSubmit(e) }}>
                <textarea
                value={this.state.content}
                onChange={(e) => { this.onContentChange(e) }}
                id="content">
                </textarea>
                <button type="submit" className="btn btn-primary btn-sm" id="submitBtn">
                        submit
                </button>
                </form>
            </div>
        );
    }
}

export default AddReviewInput;
