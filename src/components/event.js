import React, { Component } from "react";
import { render } from "react-dom";
import Switch from "react-toggle-switch";
import PropTypes from "prop-types";

import {withToggle, toggleFct} from "./toggle";

/*
function MyEventComponent({on, event}){
  const props = {[event]: on};
  return(
    <button {...props}> The {event} Button</button>
  )
}*/

const MyEventComponent = withToggle(({ toggleContext,on, event }) => {
  //prop name space clash!!! (on from onclick and on from withToggle)
  const props = { [event]: on };
  console.log("MyEventComponent, on:", toggleContext.on);
  return toggleContext.on ? (<button {...props}> The {event} Button</button>) : null;
});

export { MyEventComponent };
