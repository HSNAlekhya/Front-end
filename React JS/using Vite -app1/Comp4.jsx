import React, { Component } from 'react';

class Comp4 extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = props.data
    }
    render() {
        return (
            <div>
                <h3>{this.state.id+100} || {this.state.name} || {this.state.spl+"specialist"} || {this.state.fee}</h3>
                <h2>{this.props.data.id} || {this.props.data.name} || {this.props.data.spl} || {this.props.data.fee}</h2>
            </div>
        );
    }
}

export default Comp4;