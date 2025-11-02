import React, { Component } from 'react';

class PassArg extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:''
        }
    }
    changemsg=()=>{
        this.setState(
            {msg:"Hello"}
        )
    }
    changemsg1=()=>{
        this.setState(
            {msg:"Good Morning"}
        )
    }
    changemsg2=()=>{
        this.setState(
            {msg:"Welcome"}
        )
    }
    render(){
        return(
            <div>
                <h1>Passing Argument to Eventhandler</h1>
                <h2>{this.state.msg}</h2>
                <button onClick={this.changemsg}>Hello</button>
                <button onClick={this.changemsg1}>Good Morning</button>
                <button onClick={this.changemsg2}>Welcome</button>
            </div>
        )
    }
}

export default PassArg;