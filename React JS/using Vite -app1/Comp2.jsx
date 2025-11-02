import React, {Component} from 'react';

class Comp2 extends Component {
    constructor(){
        super()
        this.state = {
            name:'Amira',
            specialist:'Cardiologist',
            experience:'Ten yrs of experience',
        }
        this.state1 = {
            name:'Aryan',
            specialist:'Neurologist',
            experience:'Ten yrs of experience',
        }
    }
    render() {
        return (
            <div>
                <h3>{this.state.name}||{this.state.specialist}||{this.state.experience}</h3>
                <h2>{this.state1.name}||{this.state1.specialist}||{this.state1.experience}</h2>
            </div>
        );
    }
}

export default Comp2;