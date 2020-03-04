import React, {Component} from "react";

class Review extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: ""
        }
    }



    render(){
        return(
            <>
        <div>{this.props.orderItem[0].name}</div>
        <div>{this.props.orderItem[0].quan}</div>    
        </>
        )
    }
}

export default Review