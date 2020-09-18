import React, { Component } from "react";
import { PageHeader } from "antd";

class Header extends Component {
  render() {
    return (
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Wiki Search"
          subTitle="Use this site to search various wikipedia articles."
        ></PageHeader>
      </div>
    );
  }
}

export default Header;
