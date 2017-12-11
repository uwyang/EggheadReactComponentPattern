import React, { Component } from "react";
import { Toggle, MyToggleWrapper} from "./toggle";
import { MyEventComponent } from "./event";



//ref is referring to wrapper, not the myToggle button. s
//  <MyToggleWrapper ref ={myToggle => this.myToggle = MyToggle}/>

export default class App extends Component {
  render() {
    return (
      <div>
        Toggle:
        <Toggle onToggle={on => {
          console.log("Toggle on: ", on);
          console.log(this.myToggleButton);
          on?this.myToggleButton.focus():null;
        }}>
          <MyToggleWrapper innerRef ={ref => {this.myToggleButton = ref}}/>
          <MyToggleWrapper.ToggleMessage/>
          <hr />
          <Toggle.Button />
          <hr />
          <div>
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Off>The button is off</Toggle.Off>
          </div>

          <MyEventComponent event="onClick" on={e => alert(e.type)} />

        </Toggle>
        <button ref={(ref)=> {this.refButton=ref}} onClick={()=>{
          console.log("refButton");
          console.log(this.refButton);
        }}>
          OH, ref
        </button>
      </div>
    );
  }
}

//for react viwer.
App.displayName = "MyFuckingApp";
