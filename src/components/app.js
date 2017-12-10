import React, { Component } from "react";
import {Toggle, MyToggle} from "./toggle";

export default class App extends Component {
  render() {
    return (
      <div>
        Toggle:
        <Toggle onToggle={on => console.log("Toggle on: ", on)}>

          <MyToggle/>
          <hr/>
          <Toggle.Button/>
          <hr/>
          <div>
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Off>The button is off</Toggle.Off>
          </div>
        </Toggle>
      </div>
    );
  }
}
