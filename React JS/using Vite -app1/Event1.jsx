import React, { Component } from 'react';

class Event1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnt:0
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState({cnt:this.state.cnt+1})
        console.log(this.state.cnt);
    }
    render() {
        return (
            <div>
                <h1>Event Handler Binding</h1>
                <button onClick={this.handleClick}>Click Me</button>
            </div>
        );
    }
}

export default Event1;