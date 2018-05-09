import React, { Component } from 'react';

class RateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: sessionStorage.getItem('currentUser'),
            rate: 1,
            movie: this.props.movie
        };
    }

    onContentChange(e) {
        this.setState({
            rate: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();
        if (this.state.author && this.state.rate && this.state.movie) {
            let rateData = {
                author: this.state.author,
                rate: this.state.rate,
                movie: this.state.movie
            };
            console.log(rateData.author+" "+rateData.rate+" "+rateData.movie);
            this.props.onSubmit(rateData);
            
        }
        
    };

    render() {
        return (
            <div>
                <form onSubmit={(e) => { this.onSubmit(e) }}>
                <div className="form-group">
                    <select className="form-control"
                        value={this.state.rate}
                        onChange={(e) => { this.onContentChange(e) }}
                        id="rate">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    </div> 
                <button type="submit" className="btn btn-primary btn-sm" id="rateBtn">
                        submit
                </button>
                </form>
            </div>
        );
    }
}

export default RateInput;
