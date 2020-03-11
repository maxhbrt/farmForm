import React, { Component } from "react";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: ""
    };
  }

  render() {
    return (
      <>
        <div>{this.props.name}</div>
        <button>Remove</button>
        <div>{this.props.quan}</div>
      </>
    );
  }
}

export default Review;
