import React, { Component } from "react";
import axios from "axios";
import SingleFarm from "./SingleFarm";
import "./RestaurantForm.css";
import { FaCheckCircle, FaThemeisle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      farms: [],
      business_name: "",
      edit: true,
      clientInfo: "",
      review: false,
      promiseArray:[]
    };
  }

// promises = (e) => {
//   e.preventDefault()
//   Promise.all([...this.state.promiseArray]).then(function(values){console.log(values)})
// }








// pushPromises = (promise) => {
//   this.state.promiseArray.push(promise)
//   console.log(this.state.promiseArray)
// }


  componentDidMount = () => {
    this.getInventory();
    console.log(this.state.clientInfo);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editClient = async e => {
    e.preventDefault();
    const client_id = this.state.clientInfo;

    const { business_name } = this.state;
    const edittedName = await axios
      .put("/api/edit_client", { business_name, client_id })
      .then(response => {
        this.setState({
          clientInfo: response.data,
          edit: false
        });
      });
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState({
      edit: true
    });
  };

  handleCheckClick = e => {
    e.preventDefault();
    if (!this.state.clientInfo) {
      this.addClient(e);
    } else {
      this.editClient(e);
    }
  };

  addClient = async e => {
    e.preventDefault();

    var { business_name } = this.state;
    if (business_name === "") {
      this.setState({
        edit: true
      });
    } else {
      const addedName = await axios
        .post("/api/add_client", { business_name })
        .then(response => {
          this.setState({
            clientInfo: response.data[0].client_id
          });
        });
      console.log(this.state.clientInfo);
      this.setState({
        edit: false
      });
    }
  };

  getInventory = () => {
    axios.get("/api/get_order_items").then(response => {
      this.setState(
        {
          inventory: response.data
        },
        () => {
          for (let i = 0; i < this.state.inventory.length; i++) {
            if (!this.state.farms.includes(this.state.inventory[i].farm_name)) {
              this.state.farms.push(this.state.inventory[i].farm_name);
            }
          }
        }
      );
    });
  };

  handleEditOrder = e => {
    e.preventDefault();
    this.setState({
      review: false
    });
  };

  handleReview = e => {
    e.preventDefault();
    this.setState({
      review: true
    });
  };

  render() {
    var { farms, inventory, business_name, clientInfo, review } = this.state;
    var farmProps = [];
    const singleFarmSections = inventory.map(farm => {
      if (farmProps.includes(farm.farm_name)) {
      } else {
        farmProps.push(farm.farm_name);

        return (
          <SingleFarm
          pushPromises={this.pushPromises}
            review={review}
            clientInfo={clientInfo}
            item_id={farm.item_id}
            business_name={business_name}
            farmName={farm.farm_name}
            inventory={inventory}
          />
        );
      }
    });

    return (
      <div className="order-form">
        <div className="head">
          <h1>Order Form</h1>
        </div>
        <div>
          <h2>Business Name</h2>
          {this.state.edit ? (
            <>
              <input
                type="text"
                name="business_name"
                value={business_name}
                onChange={this.onChange}
              />
              <div style={{ color: "green" }}>
                <FaCheckCircle
                  onClick={e => {
                    this.handleCheckClick(e);
                  }}
                  size={35}
                />
              </div>
            </>
          ) : (
            <>
              <h3>{this.state.business_name}</h3>
              <FaEdit
                onClick={e => {
                  this.handleEdit(e);
                  
                }}
              />
            </>
          )}
        </div>
        {!this.state.clientInfo ? null : <>{singleFarmSections}</>}
        <div className="footer">
          {this.state.review ? (
            <button
              onClick={e => {
                this.handleEditOrder(e);
              }}
            >
              Edit Order
            </button>
          ) : (
            <button
              onClick={e => {
                this.handleReview(e);
              
              }}
            >
              Review Order
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default RestaurantForm;
