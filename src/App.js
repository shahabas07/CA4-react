import React, { useEffect, useState } from "react";
import "./App.css";
import questions from "./questions";
import Result from "./components/Result";
import QuestionBox from "./components/QuestionBox";
import logo from './assets/logo.jpeg'

function App() {
  const [mode, setMode] = useState("light");

  const getBody = () => {
    document.querySelector("body").setAttribute("class", mode);
  };

  useEffect(() => {
    getBody();
  }, [mode]);

  
  return (
    <>
     <img src={logo} className="logo"></img>
      <QuestionBox mode={mode} />
      
    </>
  );
}

export default App;
