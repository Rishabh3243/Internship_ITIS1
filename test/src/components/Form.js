import React, {useState} from 'react'

  const Form = () => {
    const [a1,at] = useState("");
    function getdata(t)
    {
        <h1>{a1}</h1>;
        <h1>{t}</h1>;
    }
  return (
    <div>
    <div>
    <br></br>
        <form onSubmit={getdata}>
          <label> Name</label>
            <input type='text'placeholder='name' onChange={(t)=>at(t.value)}/>
            <input type='submit'/>
        </form>
    <br></br>
    </div>
    </div>
  )
}
export default Form;
