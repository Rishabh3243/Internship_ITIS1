import React from 'react'

export default class purecompon extends React.PureComponent{
    constructor(){
        super();
        this.state={
            count:0
        }
    }
    render() {
    console.warn("rerendering");
    return (
      <div>
        <button onClick={()=>{this.setState({count:this.state.count+1})}}>{this.state.count}</button>
      </div>
    )
  }
}
