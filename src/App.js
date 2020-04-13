import React from 'react'
import logo from './logo.svg'
import './App.css'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.steps = ['business', 'color', 'styles']
    this.state = {
      step: this.steps[0]
    }
  }

  handleNextStep = () => {
    const currentStepIndex = this.steps.indexOf(this.state.step)
    const nextStepIndex = currentStepIndex + 1

    if (currentStepIndex !== 0) this.setState(() => ({ step: nextStepIndex }))
  }

  handlePreviousStep = () => {
    const currentStepIndex = this.steps.indexOf(this.state.step)
    const previousStepIndex = currentStepIndex - 1

    if (currentStepIndex !== this.steps.length - 1) this.setState(() => ({ step: previousStepIndex }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
