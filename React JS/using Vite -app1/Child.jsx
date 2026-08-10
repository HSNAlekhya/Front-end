import React, { Component } from 'react';

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drid:1002,
            drname:'Aryan',
            fee:5000
        }
    }
    render() {
        return (
            <div>
                <h3>This is the Child Component</h3>
                <h2>{this.props.docid}||{this.props.docname}</h2>
                <h2>{this.props.data.a}||{this.props.data.b}</h2>
                <h2>{this.state.drid}||{this.state.drname}||{this.state.fee}</h2>
            </div>
        );
    }
}

export default Child;