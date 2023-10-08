//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Toggle from './components/Toggle';
//import Form from './components/Form';
import Cdm from './components/class/componentdidmount';
import Cdu from './components/class/componentdidupdate';
//import Sdu from './component/class/shouldcomponentupdate';
import Cwu from './components/class/componentwillunmount';
import H from './components/Count';
import Ma from './components/Ma';
import Nesa from  './components/nesmap';
import Liftup from './components/Liftup';
import Purecompon from './components/purecompon';
import Memo from './components/usememo';
import Hoc from './components/Hoc';
import Nav from './components/nav';
function App67() {
  function h1(){
    alert("hi");
  }
  function k(val)
  {
    alert(val); 
  }
  const [a66,a67]=useState(0);
  return (
    <div className="App">
      {/*<Toggle data={h1}/>
      <Form/>
      <Cdm />
      <Cdu />
      <Cwu />
      <H y={a66}/>
      <Ma />
      <Nesa />
      <Liftup data1={k} />*/}
      <Purecompon />
      <Memo />
      <Hoc/>4
      <Nav/>
    </div>
  );
}

export default App67;
