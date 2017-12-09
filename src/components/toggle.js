import React, { Component } from "react";
import { render } from "react-dom";
import Switch from "react-toggle-switch";

function ToggleOn({ on, children }){
  //console.log("static on:", children.render);
  return on ? children : null;
  //return children;
};

function ToggleOff({ on, children }){
  return on ? null : children;
  //return children
};

function ToggleButton({ on, toggle, ...props }){
  console.log("make Button); ");
  return <Switch on={on} onClick={toggle} {...props} />;
};

export default class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} };
  state = { on: false };
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;

  toggle = () =>{
    return this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  }

  /*
React.cloneElement(
  element,
  [props],
  [...children]
)
Clone and return a new React element using element as the starting point.
The resulting element will have the original element’s props with the new props merged in shallowly.
*/

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      });
    });
    console.log(children);
    //const { on } = this.state;
    //return (<Switch on={on} onClick={this.toggle}/>);
    return <div>{children}</div>;
  }
}
