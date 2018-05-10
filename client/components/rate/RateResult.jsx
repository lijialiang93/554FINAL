import React, { Component } from "react";
import { connect } from 'react-redux';
import { addRateFetchResult } from '../../actions/actions.js';

class RateResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            success: false
        };
    }


    componentWillReceiveProps(newProps) {
        if (newProps.data != this.props.data) {
            const API_URL = '/addRate';
            this.props.fetchAddRateResult(API_URL, newProps.data);
        }
        if (newProps.ratewResult != this.state.result) {
            this.setState({
                result: newProps.ratewResult.message,
                success: true,
            });
        }
    }

    render() {
        const renderResult = this.state.result;
        if (renderResult != "" && this.state.success) {
            window.location.reload();
            return (
                <td>{renderResult}</td>
            );
        }
        else {
            return (<td></td>);
        }
    }
}

function mapStateToProps(state, ownProps) {
    // Things return here are showing in props for Characters
    return {
        ratewResult: state.addRateResult
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchAddRateResult: (url, searchQuery) => dispatch(addRateFetchResult(url, searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(RateResult);