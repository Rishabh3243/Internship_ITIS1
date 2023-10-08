import React from 'react'
export default class func4 extends React.Component{
    componentWillUnmount()
    {
        alert("componentWillUnmount !")
    }
  render()
  {
    return(
        <div>
            <h1>Student</h1>
        </div>
    )
  }
}