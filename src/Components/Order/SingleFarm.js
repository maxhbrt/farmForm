import React, { Component } from "react";
import axios from "axios";
import OrderField from "./OrderField";
import "./SingleFarm.css";

class SingleFarm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inventory: []
        }
    }


  

    render(){
        
        return(
            <div className="single-farm">
        <div>{this.props.farmName}</div>

        
        </div>
        )
    }
}
export default SingleFarm