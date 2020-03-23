import React from "react";
import axios from "axios";
import "./detail.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const title = this.props.match.params.i;
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.detik.com%2F"
      )
      .then(res => {
        return res.data;
      })
      .then(
        data =>
          this.setState({
            data: data.items[title]
          }),
        this.props.detailApi(true)
      );
    this.props.detailApi(false);
  }
  handleBack = (title, i) => {
    this.props.history.push(`/home`);
  };
  handleRemove = () => {
    localStorage.removeItem("api_token");
    this.props.history.push("/");
  };
  render() {
    if (localStorage.getItem("api_token") == null) {
      return <Redirect to="/" />;
    }
    const { data } = this.state;
    if (this.props.loading == false) {
      return (
        <center>
          <div className="section"></div>
          <div className="section"></div>
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
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
          <h4>LOADING...</h4>
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
                  <img
                    height="80px"
                    align="right"
                    width="75%"
                    src="https://tpc.googlesyndication.com/simgad/17942673534534995472"
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="navbar-fixed">
          <div>
            <nav className=" #c62828 blue darken-3">
              <div className="ini" style={{ display: "flex" }}>
                <button
                  className="right btn waves-effect waves-light blue"
                  style={{ margin: "10px" }}
                  onClick={this.handleBack}
                >
                  <i style={{ marginBottom: "4px" }} className="material-icons">
                    arrow_back
                  </i>
                </button>

                <div class="container">
                  <a href="https://news.detik.com/" className=" center-align">
                    <h4>Detik.com</h4>
                  </a>
                </div>
                <button
                  className="right btn waves-effect waves-light blue"
                  style={{ margin: "10px auto" }}
                  onClick={this.handleRemove}
                >
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        <div>
          <div className="container">
            <div className="Header1">
              <h4>{data.title}</h4>
            </div>

            <div className="authoor1" style={{ justifyContent: "" }}>
              <p>{data.pubDate}</p>
            </div>

            <center>
              <div classNmae="layout-gambar1">
                <img src={data.thumbnail} className="gambar-l" />
              </div>
            </center>
            <div>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const state = state => ({
  loadingDetail: state.loadingDetail
});

const dispatch = dispatch => ({
  detailApi: value => dispatch({ type: "CHANGE_LOADING_DETAIL", value: value })
});

export default connect(state, dispatch)(Detail);
