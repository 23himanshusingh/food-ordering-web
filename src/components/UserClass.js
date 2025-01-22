import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo :{
               name: "Dummy",
               location: "Default", 
            }
        };
        console.log(this.props.name + "Child constructor");
    }

    async componentDidMount() {
        console.log(this.props.name+"Child componentDidMount");
        const data = await fetch("https://api.github.com/users/23himanshusingh");
        const json = await data.json(); 
        this.setState({
            userInfo: json,
        })
    }

    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component Will Unmount");
    }

    render(){
        console.log(this.props.name+"Child render");
        const {name,location,avatar_url} = this.state.userInfo;

        return(
            <div className="user-card">
                <img src={avatar_url}/>
                <h1>Name : {name}</h1>
                <h2>Location : {location}</h2>
            </div>
        )
    }
}
export default UserClass;










/** LIFE CYCLE METHOD IN REACT */

/*************
 * 
 * constructor (dummy)
 * render (dummy)
 *      <HTML dummy></HTML>
 * Component did mount
 *      API CALL
 *      this.setState
 * --------------
 * UPDATE
 *     render (API data)
 *     <HTML Api data></HTML>
 * component did update
 */