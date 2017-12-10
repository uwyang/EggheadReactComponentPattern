import React, { Component } from "react";
import { render } from "react-dom";
import Switch from "react-toggle-switch";
import PropTypes from 'prop-types';

/*
//why we need context:
https://javascriptplayground.com/blog/2017/02/context-in-reactjs-applications/


*/

//contextTypes: what it needs
//childContextTypes: what it's giving the children. 

const TOGGLE_CONTEXT = '__toggle__';
function ToggleOn({children }, context){
  const {on} = context[TOGGLE_CONTEXT];
  //console.log("static on:", children.render);
  return on ? children : null;
  //return children;
};
ToggleOn.contextTypes= {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

function ToggleOff({children }, context ){
  const {on} = context[TOGGLE_CONTEXT];
  return on ? null: children;
};
ToggleOff.contextTypes= {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

function ToggleButton(props, context){
  console.log("make Button); ");
  const {on, toggle} = context[TOGGLE_CONTEXT];
  return <Switch on={on} onClick={toggle} {...props} />;
};
ToggleButton.contextTypes= {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
};

export default class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} };
  state = { on: false };
  static On = ToggleOn;

  static Off = ToggleOff;
  static Button = ToggleButton;

  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  };

  //determines what the children can see from context.
  //in: const ChildComponent = (props, context) => {
  getChildContext(){
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle
      },
    };
  }

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
      //children: only first level children. if you do
      /*
        <Toggle.on/>
        <div> <Toggle.off/> </div>
      */
      //you're screwed. for now.
      //that's why you need context.
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
