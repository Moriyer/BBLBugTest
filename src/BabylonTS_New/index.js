import React from 'react';
import { loadScene } from './TS/Scene/Demo/TestScene';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.infos = {
      domID: props.domID || 'Babylon',
      screenSize: props.screenSize || [1920, 1080],
      baseResources: props.baseResources || "https://3dl.dfocus.top/api/static/",
    };
    this.systemComponent = null;

  }
  setSize(width, height) { }

  componentDidMount() {
    loadScene({
      domID: this.infos.domID,
    })
  }

  componentDidUpdate(props) { }
  componentWillUnmount() {
    console.log('***********************************');

    // try {
    //     this.disposeCenter.dispose();
    // } catch (error) {
    // }

    // try {
    //     this.disposeCenter.dispose();
    // } catch (error) {
    // }


    console.log('***********************************');

  }

  render() {
      return <div id={"Div_" + this.infos.domID} style={{ height: "100vh",width:"100%" }}>
          <canvas id={this.infos.domID} style={{ height:"100vh",width:"100%"}}/>
      </div>;
  }
  // render() {
  //   return <div id={"Div_" + this.infos.domID} style={{ height: "2160px", width: "3840px" }}>
  //     <canvas id={this.infos.domID} style={{ height: "100vh", width: "100%" }} />
  //   </div>;
  // }
}

export default Index;


class FunctionsComponent {
  constructor(type = 'normal') {
    this.type = type
    this.name = 'lili'
  }
  getName() {
    console.log(this.name, '===this.name')
    if (this.name === 'lili') {
      return true
    }
    return false
  }
}

const myObject = new FunctionsComponent()

const changeFun = function () {
  const prevName = myObject.getName()
  myObject.__proto__.getName = () => {
    console.log(prevName, '===cccc')
    return 'list color'
  }
}

changeFun()
console.log(myObject.getName(), '===hhhh')