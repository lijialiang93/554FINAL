import React, { Component } from "react";
import { connect } from 'react-redux';
import { userRegisterFetchResult } from '../../actions/actions.js';

class RegisterResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            email: "",
            success: false
        };
    }


    componentWillReceiveProps(newProps) {
        if (newProps.data != this.props.data) {
            const API_URL = '/userRegister';
            this.props.fetchRegisterResult(API_URL, newProps.data);
        }
        if (newProps.registerResult != this.state.result) {

            this.setState({
                result: newProps.registerResult.message,
                email: newProps.registerResult.email,
                success: true
            });

        }
    }


    render() {
        const renderResult = this.state.result;
        if (renderResult != "" && this.state.success) {
            return (
                <div>{this.state.email + renderResult}</div>
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
        registerResult: state.userRegisterResult
    };
}
const mapDispatchToProps = dispatch => ({
    // Our thunk will be mapped to this.props.fetchRecipe
    fetchRegisterResult: (url, searchQuery) => dispatch(userRegisterFetchResult(url, searchQuery)),
});

//export default SearchForm;
export default connect(mapStateToProps, mapDispatchToProps)(RegisterResult);