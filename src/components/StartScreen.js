import React from 'react'

function StartScreen({numQuestions , dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the Quiz App</h2>
        <h3>{numQuestions} question to test your react mastery</h3>
        <button className='btn btn-ui' onClick={()=>{dispatch({type :"start"})}}>Start Quiz</button>
        <p>Please note: This is a simple quiz app created using React.js</p>
        
    </div>
  )
}

export default StartScreen
