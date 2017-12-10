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

function toggleFct() {
  console.log("toggle fct called. ");
  return this.setState(
    ({ on }) => ({ on: !on }),
    () => {
      this.props.onToggle(this.state.on);
    }
  );
}

const TOGGLE_CONTEXT = "__toggle__";
const ToggleOn = withToggle(({ children, toggleContext: { on } }) => {
  console.log("static on:", children.render);
  return on ? children : null;
  //return children;
});

const ToggleOff = withToggle(({ children, toggleContext: { on } }) => {
  return on ? null : children;
});
ToggleOff.displayName="ToggleOff";

const ToggleButton = withToggle(
  ({ toggleContext: { on, toggle }, ...props }) => {
    console.log("ToggleButton");
    return <Switch on={on} onClick={toggle} {...props} />;
  }
);
ToggleButton.displayName="ToggleButton";


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
        toggle: toggleFct.bind(this)
      }
    };
  }

  render() {
    return <div>{this.props && this.props.children}</div>;
  }
}

//turn this into a factory.
//let you get rid of contextTypes for ToggleOn, ToggleOff, etc.
function withToggle(Component) {
  //console.log("withToggle: ", Component);
  function Wrapper({innerRef, ...props}, context) {
    //const {on, toggle} = context[TOGGLE_CONTEXT];
    const toggleContext = context[TOGGLE_CONTEXT];
    console.log("innerRef: ", innerRef);
    console.log("Wrapper toggle Context: ", toggleContext);
    //console.log("Wrapper toggle props: ", props);
    //Stateless functions could not be given refs even in React 15.
    //Try converting your function component into a class component.
    // so ref={innerRef} doesn't work. 
    return <Component  toggleContext={toggleContext} {...props} />;
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };
  Wrapper.displayName=`withToggle(${Component.displayName})`;
  return Wrapper;
}

//inline, will not make displayName automatically.
const MyToggle = ({ toggleContext: { on, toggle } }) => {
  console.log("myToggle, toggleContext on: ", on);
  return <button onClick={toggle}>{on ? "on" : "off"}</button>;
};
MyToggle.displayName="MyToggle";

export const MyToggleWrapper = withToggle(MyToggle);

export { withToggle, toggleFct };
