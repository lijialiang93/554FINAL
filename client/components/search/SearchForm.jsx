import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.searchQuery) {
            this.props.onSearch(this.state.searchQuery);
        }
    };



    onSearchQueryChange(e) {
        this.setState({
            searchQuery: e.target.value
        });
    };

    render() {
        return (
            <form className="form-horizontal" onSubmit={(e) => { this.onSubmit(e) }}>
                <div className="form-group row">
                <label className='col-form-label' htmlFor="movieName"></label>
                    <div className="col-sm-10" >
                        <input
                            type="text"
                            value={this.state.searchQuery}
                            className="form-control"
                            onChange={(e) => { this.onSearchQueryChange(e) }}
                            id="movieName"
                            placeholder="What movie do you want to search for?"
                        />
                    </div>
                    <div className="col-sm-1">
                        <button type="submit" className="btn btn-primary" id="searchBtn">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchForm;
