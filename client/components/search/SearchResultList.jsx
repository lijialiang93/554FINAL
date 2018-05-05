import React, { Component } from 'react';
import SearchResultListEntry from "./SearchResultListEntry";

class SearchResultList extends Component {
    render() {

        return (
            <div>
                <div className="row">
                    {this.props.movieList.map(movie => {
                        return (<div key={movie._id} className="col-sm-12 col-md-6 col-lg-4">
                            <SearchResultListEntry movie={movie}></SearchResultListEntry></div>);
                    })}
                </div>
            </div>
        );
    }
}

export default SearchResultList;
