import React, { Component } from 'react';
import SearchResultListEntry from "./SearchResultListEntry";

class SearchResultList extends Component {
    render() {

        return (
            <div className="pt-5 pb-5">
                <h6>Search Results:</h6>
                <div className="row">

                    {this.props.movieList.map(movie => {
                        return (
                            <div key={movie._id} className="col-sm-12 col-md-6 col-lg-4">
                                <SearchResultListEntry movie={movie}></SearchResultListEntry>
                            </div>);
                    })}
                </div>
            </div>
        );
    }
}

export default SearchResultList;
