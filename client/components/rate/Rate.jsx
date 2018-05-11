import React, { Component } from 'react';
import RateInput from './RateInput';
import RateResult from './RateResult';
import axios from "axios";

class Rate extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: null,
            movie:this.props.movie,
            isLoggedIn: sessionStorage.getItem('loggedIn') === 'true',
            done : false,
            author: sessionStorage.getItem('currentUser'),
            rate: 0,
        };
    }

    onSubmit(rateData) {
        this.setState({
            data: rateData
        });
    };

    componentWillMount() {
        axios
      .get("/api/searchRateByAuthor?movie="+this.state.movie+"&author="+this.state.author).
      then(res=>{
          if(res.data.rate.length>0)
        this.setState(
          {done: true,
            rate : res.data.rate[0].rate
          });
      });
    }

    render() {
        if(this.state.isLoggedIn){
            if(this.state.done){
                return(
                    <tr>
                        <td><h2>Your Rating: </h2></td>
                        <td>{this.state.rate}</td>
                    </tr>
                )
            }else
            return (
                <tr>
                    <td><h2>Rate this:</h2></td>
                    <td><RateInput onSubmit={this.onSubmit} movie={this.state.movie}></RateInput></td>
                    <RateResult data={this.state.data} ></RateResult>
                </tr>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }
}


export default Rate;
