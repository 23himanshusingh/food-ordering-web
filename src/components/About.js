import UserClass from "./UserClass";
import { Component } from "react";



class About extends Component{
    constructor(props) {
        super(props);
        console.log("Parent Constructor");
    }

    componentDidMount() {
        console.log("Parent componentDidMount");
    }

    render(){
        console.log("Parent Render");
        return (
            <div>
                <UserClass name={"Himanshu Singh"} location={"Chennai"} />
                <UserClass name={"Himanshu Singh 1"} location={"Chennai 1"} />
            </div>
        ); 
    }
}

export default About;