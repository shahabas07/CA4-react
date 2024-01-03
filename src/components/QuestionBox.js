import React, { createContext, useEffect, useState } from "react";
import questions from "../questions";
import '../App.css';
import Result from "./Result";
import Start from "../assets/Start.png";
import bulb from "../assets/bulb.png";
import dark from "../assets/night.png";
import tryAgain from "../assets/tryagain.png"

// const getscore = createContext();
const MyContext = createContext();

function DarkModeToggle({ Darkmode }) {
  return (
    <img
      src={dark}
      id="dark"
      onClick={Darkmode}
      alt="Toggle Dark Mode"
    />
  );
}

function QuestionBox({ mode }) {
  let [number, setNumber] = useState(0);
  let [clickedcount, setclickedcount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [score, setScore] = useState(0);
  const [correctquestions, setcorrectquestions] = useState(0);
  const [Highlight, setHighlight] = useState('Highlight');

  const startquiz = () => {
    document.getElementById('box').style.display = 'block';
    return setNumber(1);
  };

  useEffect(() => {
    if (number === 0) {
      document.getElementById('box').style.display = 'none';
    }
  }, [number]);

  useEffect(() => {
    if (number > 0) {
      setCurrentQuestion(() => {
        return questions[number - 1].text;
      });
    }
  }, [number]);

  const optionclick = (index) => {
    setclickedcount(clickedcount + 1);
    console.log(clickedcount);
  
    if (number < questions.length) {
      setNumber(() => {
        return number + 1;
      });
    }
    if (clickedcount === questions.length - 1) {
      document.getElementById('box').style.display = 'none';
    }
    if (questions[number - 1].options[index].isCorrect && score < questions.length) {
      setcorrectquestions(correctquestions + 1);
      setScore(score + 1);
      console.log(clickedcount);
    }
    const clickedOption = document.getElementsByClassName('option')[index];
    clickedOption.style.transform = 'translate(5px, -5px)';
  };

  const clickHighlight = () => {
    if (Highlight === 'Un-highlite') {
      setHighlight('Highlight');
      document.getElementById('questiontext').style.color = 'grey';
    } else {
      setHighlight('Un-highlite');
      document.getElementById('questiontext').style.color = 'red';
    }
  };

  const Darkmode = () => {
    const box = document.getElementById('box');
    if (box.style.backgroundColor === 'white') {
      box.style.backgroundColor = 'black';
      document.getElementById('questiontext').style.color = 'white';
    } else {
      box.style.backgroundColor = 'white';
      document.getElementById('questiontext').style.color = 'black';
    }
    
  };


  return (
    <>
      {number === 0 ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px', // adjust this value to set the height of the container
        }}>
          <img src={bulb} className="bulb" alt="Bulb"></img>
          <a onClick={startquiz}>
            <img src={Start} className="start" alt="Start Quiz"></img>
          </a>
        </div>
      ) : (
        ''
      )}

      <div id='box'>
        {number > 0 ? (
          <>
            <button id="Highlight" onClick={clickHighlight}>{Highlight}</button>
            <DarkModeToggle Darkmode={Darkmode} />
            <h2 className="questionNo" >Question {number}/5</h2>
            <h1 id="questiontext">{currentQuestion}</h1>
            <div id='optionbox'>
              {questions[number - 1].options.map((option, index) => (
                <div
                  className='option'
                  onClick={() => optionclick(index)}
                  key={index}
                >
                  {option.text}
                </div>
              ))}
            </div>
            <br />
          </>
        ) : (
          ''
        )}
      </div>

      {clickedcount === questions.length ? (
        <>
          <MyContext.Provider value={{ score, correctquestions, totalquestions: questions.length, mode }}>
            <Result />
          </MyContext.Provider>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px', // adjust this value to set the height of the container
          }}>
            
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export { MyContext };
export default QuestionBox;
