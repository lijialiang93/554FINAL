import React, { Component } from "react";
class MovieInfo extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        var data = this.props.location.query;

        return (
            <div>
                {data.name}
                {data.director}
                {data.genre}
                {data.mpaa}
            </div>
        )
    }
}

export default MovieInfo;
