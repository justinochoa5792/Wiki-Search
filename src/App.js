import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import { Button, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Header from "./Header.jsx";

class App extends Component {
  state = {
    userSearch: "",
    terms: [],
  };

  typeWords(e) {
    this.setState(
      {
        userSearch: e.target.value,
      },
      this.renderTerms
    );
  }
  async searchWiki(e) {
    e.preventDefault();
    await Axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: this.state.userSearch,
      },
    }).then((response) => {
      console.log(response);
      this.setState({ terms: response.data.query.search });
    });
  }

  renderTerms() {
    return this.state.terms.map((eachTerm) => {
      return (
        <ul>
          <Divider orientation="left">
            {" "}
            <li>{eachTerm.title}</li>
          </Divider>
          <p>
            <li dangerouslySetInnerHTML={{ __html: eachTerm.snippet }}></li>
          </p>
          <Button
            type="primary"
            shape="circle"
            href={`https://en.wikipedia.org?curid=${eachTerm.pageid}`}
          >
            Go
          </Button>
        </ul>
      );
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="search">
          <form>
            <input
              placeholder="Search Wikipedia"
              onChange={(e) => this.typeWords(e)}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={(e) => this.searchWiki(e)}
            >
              Search
            </Button>
          </form>
          {this.renderTerms()}
        </div>
      </div>
    );
  }
}

export default App;
