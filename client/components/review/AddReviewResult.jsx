import React, { Component } from "react";
import { connect } from 'react-redux';
import { addReviewFetchResult } from '../../actions/actions.js';

class AddReviewResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            success: false
        };
    }


    componentWillReceiveProps(newProps) {
        if (newProps.data != this.props.data) {
            const API_URL = '/addReview';
            this.props.fetchAddReviewResult(API_URL, newProps.data);
        }
        if (newProps.addReviewResult != this.state.result) {
            this.setState({
                result: newProps.addReviewResult.message,
                success: true,
            });
        }
    }

    render() {
        const renderResult = this.state.result;
        if (renderResult != "" && this.state.success) {
            window.location.reload();
            return (
                <div>{renderResult}</div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        addReviewResult: state.addReviewResult
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchAddReviewResult: (url, searchQuery) => dispatch(addReviewFetchResult(url, searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewResult);