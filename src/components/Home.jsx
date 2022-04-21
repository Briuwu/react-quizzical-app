
export default function Home(props) {
  return (
    <div className="home">
      <h1 className="home-title">Quizzical</h1>
      <p className="home-desc">Some description if needed</p>
      <button className="home-btn" onClick={props.start}>Start Quiz</button>
    </div>
  )
}