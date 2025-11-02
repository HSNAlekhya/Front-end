import React, { Component } from 'react';

class Comp3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:1001,
            name:'Amira',
            spl:'Cardiologist',
            fee:5000
        };
    }
    render() {
        return (
            <div>
                <Comp4 data={this.state}/>
            </div>
        );
    }
}

export default Comp3;