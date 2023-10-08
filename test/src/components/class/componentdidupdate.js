import React from 'react'

class fun2 extends React.Component {
    constructor(){
        super();
        console.warn("Constructor");
        this.state=
        {
            name:"Rishabh"
        }
    }
componentDidUpdate()
{
    console.warn("componentDidMount");
    console.warn(this.state.name);
}
render()
{
    console.warn("render");
    return (
        <div>
            <h1>component did update</h1>
            <button onClick={()=>this.setState({name:"Ronak"})}>Change name</button>
        </div>
    )
}
}

export default fun2
