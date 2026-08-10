import React, { Component } from 'react';
import Child from './Child';

class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 'cardiologist',
            b: 'neurologist'
        };
    }
    render() {
        return (
            <div>
                <h1>This is the Parent Component</h1>
                <Child  docid={1001} docname="Amira" data={this.state}/>
            </div>
        );
    }
}

export default Parent;