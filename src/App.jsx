import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import he from "he"
import Home from './components/Home'
import Quiz from './components/Quiz'
import './styles/main.css'

function App() {
  const [start, setStart] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [correctAns, setCorrectAns] = useState(0)
  const [newQuiz, setNewQuiz] = useState(0)
  const handleStart = () => {
    setStart(prev => !prev)
  }
  // this Effect fetch the API data and put it inside the quizData state.
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {

        const newQuizData = data.results.map(item => {
          let choices = []
          choices = item.incorrect_answers.map(incAns => he.decode(incAns))
          // generates random number to put correct answer to random position
          const randomNum = Math.ceil(Math.random() * choices.length)
          choices.splice(randomNum, 0, item.correct_answer)
  
          // creates new Array and add a ID this will make a new array for all choices / answers
          const choicesArray = choices.map(answer => ({
            id: nanoid(),
            answers: answer,
            selected: false,
            correct: null
          }))
  
          return {
            id: nanoid(),
            ...item,
            correct_answer: he.decode(item.correct_answer),
            question: he.decode(item.question),
            all_answers: choicesArray
          }
        })
        setQuizData(newQuizData)
      })
  }, [newQuiz])

  // handles the toggle of choices
  function handleToggle(id, questionId) {
    // console.log(`id = ${id} questionId = ${questionId}`)
    setQuizData(prevState => {
      return prevState.map(item => {
        if(questionId === item.id){
          let newChoices = item.all_answers.map(choice => {
            return choice.id === id ? {...choice, selected: true} : {...choice, selected: false}
          })
          return {...item, all_answers: newChoices}
        } else {
          return item
        }
      })
    })
  }

  // check the correct answers when the btn is clicked
  function checkAns() {
    setQuizData(prevData => {
      return (
        prevData.map(item => {
          let newAnswers = item.all_answers.map(choice => {
            let isCorrect = choice.answers === item.correct_answer
            if(choice.selected && isCorrect) setCorrectAns(prev => prev + 1)
            return isCorrect ? {...choice, correct: true} :
            choice.selected && !isCorrect ? {...choice, correct: false} : choice
          })

          return {...item, all_answers: newAnswers}
        })
      )
    })
  }

  function generateNewQuiz() {
    setNewQuiz(prev => prev + 1)
    setCorrectAns(0)
  }


  return (
    <div className="App">
      {start ? 
        <Quiz 
          quizData={quizData}
          handleToggle={handleToggle}
          handleCheckAns={checkAns}
          handleStart={handleStart}
          handleNewQuiz={generateNewQuiz}
          correctAns={correctAns}
        /> : 
        <Home start={handleStart} />}
    </div>
  );
}

export default App;
