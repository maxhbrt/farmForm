import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      farm_name: "",
      register: false
    };
  }

  async register() {
    const { email, password, farm_name } = this.state;
    const registeredUser = await axios.post("/auth/register", {
      email,
      password,
      farm_name
    });
    
    // this.props.user(registeredUser.data);
    if (registeredUser) {
      this.props.history.push("/edit");
    }
  }

  async login() {
    if (this.state.email === "" || this.state.password === "") {
    } else {
      const { email, password } = this.state;

      const loggedInUser = await axios.post("/auth/login", {
        email,
        password
      });
      // this.props.user(loggedInUser.data);
      this.props.history.push("/edit");
    }
  }

  render() {
    const { email, farm_name, password} = this.state;
    return (
      <div className="register-back">
        {!this.state.register ? (
          <form>
            <h1>LOGIN</h1>
            <div>
              <h4>Email</h4>
              <input
                type="text"
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
              />
            </div>
            <div>
              <h4>Password</h4>
              <input
                type="password"
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })
                }
              />
            </div>
            <input
              className="button"
              type="submit"
              onClick={e => {
                e.preventDefault();
                this.login();
              }}
            />
            <h6
              onClick={() => {
                this.setState({ register: true });
              }}
            >
              Don't have an account?
            </h6>
          </form>
        ) : (
          <form>
            <h1>REGISTER</h1>
            <div>
              <h4>Farm Name</h4>
              <input
                type="text"
                value={farm_name}
                onChange={e =>
                  this.setState({
                    farm_name: e.target.value
                  })
                }
              />
            </div>
            <div>
              <h4>Email</h4>
              <input
                type="text"
                value={email}
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
              />
            </div>
            <div>
              <h4>Password</h4>
              <input
                type="password"
                value={password}
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })
                }
              />
            </div>
            <input
              className="button"
              type="submit"
              onClick={e => {
                e.preventDefault();
                this.register();
              }}
            />
            <h6
              onClick={() => {
                this.setState({ register: false });
              }}
            >
              Login
            </h6>
          </form>
        )}
      </div>
    );
  }
}
export default withRouter(Register);
