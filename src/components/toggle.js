import React, { Component } from "react";
import { render } from "react-dom";
import Switch from "react-toggle-switch";
import PropTypes from "prop-types";

/*
//why we need context:
https://javascriptplayground.com/blog/2017/02/context-in-reactjs-applications/


*/

//contextTypes: what it needs
//childContextTypes: what it's giving the children.

const TOGGLE_CONTEXT = "__toggle__";
function ToggleOn({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  //console.log("static on:", children.render);
  return on ? children : null;
  //return children;
}
ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};

function ToggleOff({ children }, context) {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? null : children;
}
ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired
};


function ToggleButton(props, context){
  console.log("make Button); ");
  const {on, toggle} = context[TOGGLE_CONTEXT];
  return <Switch on={on} onClick={toggle} {...props} />;
};
ToggleButton.contextTypes= {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};


export class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} };
  state = { on: false };
  static On = ToggleOn;

  static Off = ToggleOff;
  static Button = ToggleButton;

  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };

  //determines what the children can see from context.
  //in: const ChildComponent = (props, context) => {
  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle
      }
    };
  }

  toggle = () => {
    console.log("toggle fct called. ");
    return this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        this.props.onToggle(this.state.on);
      }
    );
  };

  render() {
    return <div>{this.props && this.props.children}</div>;
  }
}

//turn this into a factory.
function withToggle(Component) {
  //console.log("withToggle: ", Component);
  function Wrapper(props, context) {
    //const {on, toggle} = context[TOGGLE_CONTEXT];
    const toggleContext = context[TOGGLE_CONTEXT];
    console.log("Wrapper toggleContext: ", toggleContext);
    return <Component {...toggleContext} {...props} />;
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };
  return Wrapper;
}

export const MyToggle = withToggle(({ on, toggle }) => {
  //console.log("myToggle, toggle: ", toggle);
  return <button onClick={toggle}>{on ? "on" : "off"}</button>;
});
