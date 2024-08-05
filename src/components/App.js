import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import Progress from "./Progress.js";
import NextQuestion from "./NextQuestion.js";
const intialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  // currentQuestion:null,
  // isAnswered:false,
  // correctAnswer:null,
  // isCorrect:null,
  // timeLeft:60,
  // score:0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "loading":
      return { ...state, status: "loading" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
    const currentQuestion = state.questions[state.index];

      return { ...state, answer: action.payload
        , points : action.payload == currentQuestion.correctOption
        ? state.points+currentQuestion.points
        : state.points
       };

    case "nextQuestions":
      if (state.index < state.questions.length - 1) {
        return {...state, index: state.index + 1, answer: null };
      } else {
        return {...state, status: "end" };
      }

    case "reset":

    default:
      throw new Error("Action unkonwn");
  }
};
// import DateCounter from "./DateCounter";
// eslint-disable-next-line import/no-anonymous-default-export
export default function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  const numQuestions = state.questions.length;
  const totalPoints = state.questions.reduce((prev,cur)=>prev +cur.points ,0)
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())

      .then((data) => {
        console.log("questions fetched");
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        // console.log(err)
        dispatch({ type: "dataFailed" });
      });
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
          <Progress i={state.index+1} numQuestions={numQuestions} dispatch={dispatch} point={state.points} totalPoints={totalPoints} />
          <Question
            question={state.questions[state.index]}
            dispatch={dispatch}
            answer={state.answer}
            />
  
          <NextQuestion dispatch={dispatch} answer = {state.answer}/>
           
        

          </>
        )}
      </Main>
      {/* <DateCounter/> */}
    </div>
  );
}
