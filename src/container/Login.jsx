import React from "react";
import Loading from "../component/Loading";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { connect } from "react-redux";
import { loginData } from "../redux/action/getData";
import "./Login.css";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginData(data);
  };
  render() {
    if (localStorage.getItem("api_token")) {
      return <Redirect to="/home" />;
    }
    if (this.props.cek) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="section">
        <div
          className="container"
          style={{
            width: "500px"
          }}
        >
          <div className="center-align blue white-text">
            <h3>
              <b>detik</b>ID
            </h3>
            <p>Satu Akun Untuk Semua Akses</p>
          </div>
          <form class="chan col s12" onSubmit={this.handleSubmit}>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>
                <input
                  autoComplete="off"
                  id="icon_prefix"
                  name="username"
                  type="text"
                  class="validate"
                  onChange={this.handleChange}
                />
                <label for="icon_prefix">username</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">vpn_key</i>
                <input
                  id="icon_telephone"
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  class="validate"
                />
                <label for="icon_telephone">password</label>
              </div>
            </div>
            <center>
              <Loading
                loading={this.props.loadingLogin}
                onClick={this.handleSubmit}
              />
            </center>
          </form>
        </div>
      </div>
    );
  }
}

const state = state => ({
  loadingLogin: state.loadingLogin,
  cek: state.cek
});

const dispatch = dispatch => ({
  loginData: datas => dispatch(loginData(datas))
});

export default connect(state, dispatch)(Login);
