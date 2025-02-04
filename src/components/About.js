import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent componentDidMount");
  }

  render() {
    // console.log("Parent Render");
    return (

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>
        <div className="flex flex-col space-y-6">
          Logged In User
          <UserContext.Consumer>
            {
              ({loggedInUser})=> (
                <h1 className="text-xl font-bold">{loggedInUser}</h1>
              )
            }
          </UserContext.Consumer>
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserClass />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserClass />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
