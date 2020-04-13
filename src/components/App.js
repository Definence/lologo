import React from 'react'

import './App.css'
import BusinessPage from '../components/BusinessPage'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.steps = ['business', 'color', 'styles']
    this.state = {
      step: this.steps[0],
      business: '',
    }
  }

  changeBusiness = ({ target: { value: business } }) => this.setState(() => ({ business }))

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

  renderComponent = () => {
    const { step, business } = this.state
    const isBusinessPage = step === this.steps[0]
    const isColorPage = step === this.steps[1]
    const isStylesPage = step === this.steps[2]

    if (isBusinessPage) {
      return <BusinessPage business={business} changeBusiness={this.changeBusiness} />
    } else if (isColorPage) {
      return
    } else if (isStylesPage) {
      return
    }
  }

  render() {
    return (
      <div>
        <header>
          <p>Founders Design</p>
        </header>

        {this.renderComponent()}
      </div>
    )
  }
}

export default App
