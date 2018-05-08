import React, { Component } from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { userRegisterFetchResult } from '../../actions/actions.js';

class RegisterResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: "",
            email: "",
            isReturned: false
        };
    }


    componentWillReceiveProps(newProps) {
        this.props.getResult(false);
        if (newProps.data != this.props.data && newProps.data != null) {
            const API_URL = '/userRegister';
            this.props.fetchRegisterResult(API_URL, newProps.data);
        }
        if (newProps.registerResult != this.state.result) {

            this.setState({
                result: newProps.registerResult.message,
                email: newProps.registerResult.email,
                isReturned: true
            });
            if (newProps.registerResult.message === 'registration success!') {
                this.props.getResult(true);
            }
            else {
                this.props.getResult(false);
            }
        }
    }


    render() {
        const renderResult = this.state.result;
        if (renderResult != undefined && renderResult != "" && this.state.isReturned) {
            return (
                <div>
                    {this.state.email}  {renderResult}
                    <br/>
                    <Link to='/'>Back to Homepage</Link>
                </div>
            );
        }
        else {
            return false;
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