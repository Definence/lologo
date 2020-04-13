import React from 'react'

import './App.css'
import BusinessPage from '../components/BusinessPage'
import ColorsPage from '../components/ColorsPage'
import StylesPage from './StylesPage'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.steps = ['business', 'color', 'styles']
    this.state = {
      step: this.steps[0],
      business: '',
      color: null
    }
  }

  changeBusiness = ({ target: { value: business } }) => this.setState(() => ({ business }))
  changeColor = (color) => this.setState(() => ({ color }))

  handleNextStep = () => {
    const currentStepIndex = this.steps.indexOf(this.state.step)
    const nextStepIndex = currentStepIndex + 1

    if (currentStepIndex !== this.steps.length - 1) this.setState(() => ({ step: this.steps[nextStepIndex] }))
  }

  handlePreviousStep = () => {
    const currentStepIndex = this.steps.indexOf(this.state.step)
    const previousStepIndex = currentStepIndex - 1

    if (currentStepIndex !== 0) this.setState(() => ({ step: this.steps[previousStepIndex] }))
  }

  renderComponent = () => {
    const { step, business, color } = this.state
    const isBusinessPage = step === this.steps[0]
    const isColorPage = step === this.steps[1]
    const isStylesPage = step === this.steps[2]

    if (isBusinessPage) {
      return <BusinessPage business={business} changeBusiness={this.changeBusiness} handleNextStep={this.handleNextStep} />
    } else if (isColorPage) {
      return <ColorsPage color={color} changeColor={this.changeColor} handleNextStep={this.handleNextStep} />
    } else if (isStylesPage) {
      return <StylesPage color={color} business={business} />
    }
  }

  render() {
    return (
      <>
        <header>
          <p>Founders Design</p>
        </header>

        {this.renderComponent()}
      </>
    )
  }
}

export default App
