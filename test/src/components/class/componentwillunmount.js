import React from 'react'
import Student from './student'
export default class fun4 extends React.Component {
    constructor()
    {
        super();
        this.state={
            show:true
        }
    }
    render()
    {
        return (
            <div>
            {
                this.state.show?<Student/>:<h1>Child Removed</h1>
            }
            <button onClick={()=>this.setState({show:!this.state.show})}>toggle child</button>
            </div>
        )
    }
}
