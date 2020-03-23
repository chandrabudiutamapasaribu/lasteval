import React from "react";
import axios from "axios";
import Props from "../component/Props";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/js/materialize.min.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Gambar from "./aneh2.jpg";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      search: ""
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.detik.com%2F"
      )
      .then(res => {
        this.setState({
          datas: res.data.items
        });
        this.props.apiGet(false);
      });
  }
  handleClick = (title, i) => {
    this.props.history.push(`/home/${i}`);
  };

  render() {
    if (localStorage.getItem("api_token") == null) {
      return <Redirect to="/" />;
    }
    const { datas, search } = this.state;
    if (this.props.loading === true) {
      return (
        <center>
          <div className="section"></div>
          <div className="section"></div>
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <h4>sedang memuat ...</h4>
        </center>
      );
    }
    return (
      //navbar
      <div className="blue ">
        <div className="navbar-fixed">
          <div>
            <nav className=" white">
              <div>
                <div className="img">
                  <img
                    height="50px"
                    src="https://akcdn.detik.net.id/community/media/visual/2019/12/11/13f62c9b-a3d1-4f8d-9942-13623ae9b7e6.png?d=1"
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="navbar-fixed">
          <div>
            <nav className=" #c62828 blue darken-3">
              <div class="container">
                <a href="https://news.detik.com/" className=" center-align">
                  <h4>Detik.com</h4>
                </a>
              </div>
            </nav>
          </div>
        </div>

        {datas.map((data, i) => {
          return (
            <>
              <Props
                data={data}
                onClick={() => this.handleClick(data.title, i)}
              />
              ;
            </>
          );
        })}
      </div>
    );
  }
}

const state = state => ({
  loading: state.loading
});

const dispatch = dispatch => ({
  apiGet: value => dispatch({ type: "CHANGE_LOADING", value: value })
});

export default connect(state, dispatch)(Dashboard);
