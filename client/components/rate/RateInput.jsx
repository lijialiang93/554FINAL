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
            this.props.onSubmit(rateData);

        }

    };

    render() {
        return (
            <div>
                <form onSubmit={(e) => { this.onSubmit(e) }}>
                    <div className="row">
                        <div className="form-group ml-3">
                            <select className="form-control"
                                value={this.state.rate}
                                onChange={(e) => { this.onContentChange(e) }}
                                id="rate">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-sm-1 ml-2 mt-1">
                            <button type="submit" className="btn btn-primary btn-sm" id="rateBtn">
                                submit
                </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default RateInput;
