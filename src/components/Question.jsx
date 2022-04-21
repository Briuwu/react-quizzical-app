
export default function Question(props) {
  // add a selected class when the choices are clicked
  function generateClassList(ans) {
    if(props.show) {
      return `show ${ans.correct ? "correct" : ans.correct === null ? "" : "wrong"}`
    } else {
      return ans.selected ? "selected" : ""
    }
  }

  const choicesElements = props.answers.map(item => {
    return (
      <div
        key={item.id}
        className={generateClassList(item)}
        onClick={() => props.handleToggle(item.id, props.id)}
      >{item.answers}</div>
    )
  })

  return (
    <div className="question-container">
      <p className="question-question">{props.question}</p>
      <div className="question-choices">
        {choicesElements}
      </div>
    </div>
  )
}