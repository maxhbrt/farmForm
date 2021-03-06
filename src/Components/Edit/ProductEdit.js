import React, { Component } from "react";
import "./ProductEdit.css";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { GiSaveArrow } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import ImageUploader from "react-images-upload";
import { syncLoader, PulseLoader } from "react-spinners";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unit: "",
      price: "" * 1,
      avail: "" * 1,
      edit: true,
      item: "" * 1,
      delete: false,
      picture: [],
      image: "",
      readyForImage: false
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount = () => {
    this.mapProps();
  };

  mapProps = () => {
    this.setState(
      {
        image: this.props.image,
        item: this.props.item,
        name: this.props.name,
        unit: this.props.unit,
        price: this.props.price,
        avail: this.props.avail
      },
      () => {
        if (
          this.state.name ||
          this.state.unit ||
          this.state.price ||
          this.state.avail
        ) {
          this.setState({
            edit: false
          });
        } else {
          this.setState({
            edit: true
          });
        }
      }
    );
  };

  editMap = () => {
    if (!this.state.name === "") {
      this.setState({
        edit: false
      });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeInput = () => {
    this.setState({
      edit: false
    });
  };

  trueInput = () => {
    this.setState({
      edit: true
    });
  };

  addToEdit = async e => {
    e.preventDefault();
    var { name, unit, price, avail } = this.state;
    if (name === "" || unit === "" || price === "" || avail === "") {
      this.setState({
        edit: true
      });
    } else {
      price = price * 1;
      avail = avail * 1;
      const addedEdit = await axios
        .post("/api/post_edit", {
          name,
          unit,
          price,
          avail
        })
        .then(response => {
          this.setState({
            item: response.data[0].item_id
          });
        });
    }
  };

  deleteFromEdit = async e => {
    e.preventDefault();
    var { name, unit, price, avail } = this.state;
    if (!this.state.item) {
      this.setState({
        delete: true
      });
    } else {
      const item_id = this.state.item;

      const deletedEdit = await axios.delete(
        `/api/delete_from_edit/${item_id}/`
      );
      this.setState({
        item: "" * 1
      });
    }
    this.setState({
      delete: true
    });
  };

  saveAndAdd = e => {
    this.addToEdit(e);
    var { name, unit, price, avail } = this.state;
    if (!name || !unit || !price || !avail) {
      this.setState({
        edit: true
      });
    } else {
      this.setState({
        readyForImage:true
      })
      // this.changeInput();
    }
  };

  editEdit = e => {
    e.preventDefault();
    const item_id = this.state.item;

    const { name, price, unit, avail } = this.state;
    axios
      .put(`/api/edit_edit`, { item_id, name, unit, price, avail })
      .then(response => {
        this.setState({
          // name: response.data.name,
          // price: response.data.price,
          // unit: response.data.unit,
          // avail: response.data.avail,
          edit: false
        });
      });
  };

  onDrop(picture) {
    this.setState({
      picture: this.state.picture.concat(picture)
    });
  }

  uploadImage = e => {
    let item_id = this.state.item;
    let uploadPromises = this.state.picture.map(image => {
      let data = new FormData();
      data.append("image", image, image.name);
      return axios.post(`/api/uploadImage/${item_id}`, data);
    });
    axios
      .all(uploadPromises)
      .then(results => {
        this.setState(
          {
            image: results.data
          },
          () => {}
        );
      })
      .catch(e => {});
  };

  render() {
    const { name, unit, price, avail } = this.state;
    return (
      <>
        {!this.state.delete ? (
          <div className={this.state.edit ? "edit" : "edit-bar"}>
            <div className={this.state.readyForImage ? "right" : ''}>
              <div className="fields">
                {this.state.edit ? (
                  <>
                    {this.state.readyForImage ?(
                    
                    <ImageUploader
                      singleImage={true}
                      withLabel={false}
                      withIcon={false}
                      withPreview={true}
                      onChange={this.onDrop}
                      buttonText="Select Image"
                      imgExtension={[".jpg", ".png", ".jpeg"]}
                      maxFileSize={5242880}
                      
                      />
                      ) :( null)}
                  
          
                  </>
                ) : (
                  <>
                  {!this.state.image ? <PulseLoader/> :
                    <img src={this.state.image} />
                }
                  </>
                )}
              </div>
            </div>
            <div 
            className={!this.state.edit ? "right" : "right-edit"}
            >
              <div className="fields">
                {!this.state.edit ? (
                  <>
                    <h1 className="title">{this.state.name}</h1>
                    <h2>
                      ${this.state.price} per {this.state.unit}
                    </h2>
                  </>
                ) : (
                  <>
                  <div className="fields">
                  <input
                  className="price-edit"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                ></input>
                  
                </div>
                
                <div className="fields">
                  <input
                    className="price"
                    placeholder="Unit"
                    type="text"
                    name="unit"
                    value={unit}
                    onChange={this.onChange}
                  ></input>
                  </div>
                  </>
                )}
              </div>
              <div className="fields">
                <div>
                  {!this.state.edit ? (
                    <></>
                  ) : (
                    <input
                      placeholder="Price Per Unit"
                      className="price"
                      type="text"
                      name="price"
                      value={price}
                      onChange={this.onChange}
                    ></input>
                  )}
                </div>
              </div>
              <div className="fields">
                {!this.state.edit ? (
                  <>
                    <h3 className="avail">Available</h3>
                    <h2>{this.state.avail}</h2>
                  </>
                ) : (
                  <input
                    placeholder="Available Units"
                    className="price"
                    type="text"
                    name="avail"
                    value={avail}
                    onChange={this.onChange}
                  ></input>
                )}
              </div>
            </div>
            <div style={{ color: "red" }} className={!this.state.edit ?"trash" : "trash-edit"}>
              {this.state.edit ? (
                <div style={{ color: "green" }} className="add-upload">
                  <GiSaveArrow
                    onClick={e => {
                      {
                        this.uploadImage(e);
                        this.uploadImage();
                        this.state.item ? this.editEdit(e) : this.saveAndAdd(e);
                      }
                    }}
                    size={35}
                  />
                </div>
              ) : null}
              {!this.state.edit ? (
                <div style={{ color: "rgb(99, 230, 191)" }}>
                  <FaEdit onClick={this.trueInput} size={30} />
                </div>
              ) : null}
              <div style={{ color: "rgb(206, 71, 96)" }}>
                <TiDelete
                  onClick={e => {
                    this.deleteFromEdit(e);
                  }}
                  size={40}
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default ProductEdit;
