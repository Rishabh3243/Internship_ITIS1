import React from 'react'
    class fun extends React.Component{
        constructor(){
            super();
            console.warn("Constructor");
        }
    componentDidMount()
    {
        console.warn("componentDidMount");
    }
    render()
    {
        console.warn("render");
        return (
            <div>
                <h1>component did mount</h1>
            </div>
        )
    }
}
export default fun;