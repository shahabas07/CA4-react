import React, { useContext } from "react";
import { MyContext } from "./QuestionBox";
import '../App.css';
import tryAgain from "../assets/tryagain.png";

function Result() {
  const { score, correctquestions, mode } = useContext(MyContext);
  const handleTryAgainClick = () => {
    window.location.reload();
  };
  return (
    <>
      <div id="box" className={mode}>
        
        <h1 style={{textAlign:'center', color: '#3C3AB1'}}>Question {correctquestions} /5 is correct</h1>
        <div id="finalscore">Score: {score * (100 / 5)}
        </div>
        <a onClick={handleTryAgainClick}>
          <img className="tryagain" src={tryAgain} alt="Try Again" />
        </a>

      </div>
    </>
  )
}

export default Result;



