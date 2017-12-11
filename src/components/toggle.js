import React, { Component } from "react";
import { render } from "react-dom";
import Switch from "react-toggle-switch";
import PropTypes from "prop-types";
import hoistNonReactStatic from 'hoist-non-react-statics';

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
    return <Component innerRef={innerRef} toggleContext={toggleContext} {...props} />;
  }
  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired
  };
  Wrapper.displayName=`withToggle(${Component.displayName})`;
  Wrapper.WrappedComponent = Component;
  return hoistNonReactStatic(Wrapper, Component);
  //return Wrapper;
}

//inline, will not make displayName automatically.
class MyToggle extends React.Component{
  static displayName="MyToggle";
  static ToggleMessage = withToggle(
    ({toggleContext: {on}})=> {
      return on?'warnning: on!': null;
    }
  );
  render(){
  const { toggleContext: { on, toggle }, innerRef } = this.props;
  console.log("myToggle, toggleContext on: ", on);
  return <button onClick={toggle} ref={innerRef}>{on ? "on" : "off"}</button>;
}
};


export const MyToggleWrapper = withToggle(MyToggle);

function test(){
  console.log("teststart");
  const div = document.createElement('div');
  document.body.appendChild('div');
  const toggle = ()=> (toggle.called = true);
  ReactDOM.render(
    <MyToggleWrapper.WrappedComponent
      toggle = {{on:true, toggle}}>
    </MyToggleWrapper.WrappedComponent>
  );
  if(!div.innerHTML.includes('on')){
    throw new Error(
      `Contents are wrong: ${div.innerHTML}`
    )
  }
  const button = div.getElementByTagName('button')[0];
  button.click();
  if(!toggle.clalled){
    throw new Error('toggle not called!');
  }
}

export {test};

export { withToggle, toggleFct };
