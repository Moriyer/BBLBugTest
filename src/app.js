import React, { Component } from "react";
import { Tabs } from "antd";

// import component from "./BabylonTS_New/index";
import "./app.css";

const tabList = [
  {
    title: "默认",
    key: "PPSComponent",
    Comp: component,
  }
];

class App extends Component {
  state = {
    // activeKey: "ThreeLevelFlow",
    activeKey: "PPSComponent",
  };

  handleTabChange = (key) => {
    const guiDom = document.getElementsByClassName("dg ac");
    if (guiDom && guiDom.length) {
      guiDom[0].innerHTML = "";
    }
    this.setState({ activeKey: key });
  };

  render() {
    console.log("?????")
    return (
      <div id="wrapper">
        <Tabs activeKey={this.state.activeKey} onChange={this.handleTabChange}>
          {tabList.map((n) => {
            const { title, key, Comp } = n;
            
            return (
              <Tabs.TabPane tab={title} key={key}>
                {this.state.activeKey === key ? <Comp data={{}}  /> : null}
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default App;
