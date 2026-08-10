import React, { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    incrementCount = () => {this.setState({count: this.state.count + 1,})}
    decrementCount = () => {this.setState({count: this.state.count - 1,})}
    resetCount = () => {this.setState({count: 0,})}
    render() {
        return(
            <div>
                <h1>Counter : {this.state.count}</h1>
                <button onClick={this.incrementCount}>Increment</button>
                <button onClick={this.decrementCount} disabled={this.state.count===0}>Decrement</button>
                <button onClick={this.resetCount}>Reset</button>
            </div>
        )
    }
}

export default Counter;