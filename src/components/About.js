import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <div className="flex flex-col space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserClass name={"Himanshu Singh"} location={"Chennai"} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserClass name={"Himanshu Singh 1"} location={"Chennai 1"} />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
