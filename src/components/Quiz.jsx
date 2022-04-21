import {useState} from 'react'
import Question from './Question'

export default function Quiz(props) {
  const [showAns, setShowAns] = useState(false)

  const questionElements = props.quizData.map(item => {
    return (
      <Question 
        key={item.id}
        id={item.id}
        question={item.question}
        answers={item.all_answers}
        handleToggle={props.handleToggle}
        show={showAns}
      />
    )
  })

  function submitQuiz() {
    if(showAns) {
      setShowAns(prevShow => !prevShow)
      props.handleStart()
      props.handleNewQuiz()
    } else {
      setShowAns(prevShow => !prevShow)
      props.handleCheckAns()
    }
  }

  return (
    <div className="quiz">
      {questionElements}
      <div className='btn-container'>
        {showAns && <p className='results-text'>You scored {props.correctAns}/{props.quizData.length} correct answers</p>}
        <button className='home-btn btn-submit' onClick={submitQuiz}>{showAns ? "Play Again" : "Check Answer"}</button>
      </div>
    </div>
  )
}