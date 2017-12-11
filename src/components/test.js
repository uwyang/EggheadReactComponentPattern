import React, { Component } from "react";
import { Toggle, MyToggleWrapper } from "./toggle";
import { MyEventComponent } from "./event";

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
