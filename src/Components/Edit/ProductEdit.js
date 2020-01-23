import React, {Component} from 'react';
import "./ProductEdit.css";
import {TiDelete} from 'react-icons/ti';


class ProductEdit extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }


    render(){
        return(
            <div className="edit-bar">
                <div className='left'>
                    <div className="fields">
                        <h1>Product</h1>
                        <input></input>
                    </div>
                    <div className="fields">
                        <h1>Unit</h1>
                        <input></input>
                    </div>
                </div>
                <div className='right'>
                    <div className="fields">
                        <h1>Price Per Unit</h1>
                        <div>
                        $
                        <input className="price"></input>
                        </div>
                    </div>
                    <div className="fields">
                        <h1>Available</h1>
                        <input  className="price"></input>
                    </div>
                </div>
                <div style={{color: 'red'}} className='trash'>
                    <TiDelete size={40}/>
                </div>
            </div>
        )
    }
}

export default ProductEdit