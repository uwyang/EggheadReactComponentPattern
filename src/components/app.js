import React, { Component } from "react";
import {Toggle, MyToggle} from "./toggle";

export default class App extends Component {
  render() {
    return (
      <div>
        Toggle:
        <Toggle onToggle={on => console.log("Toggle on: ", on)}>
          <Toggle.On>The button is on</Toggle.On>
          <MyToggle/>
          <div>
            <Toggle.Off>The button is off</Toggle.Off>
          </div>
        </Toggle>
      </div>
    );
  }
}
