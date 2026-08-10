import React,{Component} from 'react';

class Comp1 extends Component {
    a = 100
    b = 200
    c = 500
    doctor = [1,'amira','cardiologist',250000]
    doctordata = {name:'aryan',specialist:'neurologist'}
    render() {
        return (
            <div>
                <h1>Welcome to React JS page</h1>
                <h1>Welcome to React JS page</h1>
                <h1>Welcome to React JS page</h1>
                <h1>Welcome to React JS page</h1>
                <h1>Welcome to React JS page</h1>
                <p>{this.a}</p>
                <p>{this.b}</p>
                <p>{this.c}</p>
                <h2>{this.doctor[0]}</h2>
                <h1>{this.doctor[1]}</h1>
                <h3>{this.doctor[2]}</h3>
                <h4>{this.doctor[3]}</h4>
                <h1>{this.doctordata.name}</h1>
                <h3>{this.doctordata.specialist}</h3>
            </div>
        )
    }
};

export default Comp1;