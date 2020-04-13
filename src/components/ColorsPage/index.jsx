import React from 'react'

import './styles.css'

const colors = [
  ['#4056ff', '#6e7eff', '#8794fa', '#abb4ff'], // blue
  ['#9523c2', '#9947ba', '#8d55a3', '#9667a8'], // purple
  ['#36f76d', '#63ff90', '#87ffaa', '#a6ffc0'], // green
  ['#1dd1ad', '#49ccb2', '#6cd9c3', '#8fccc0'], // teal
  ['#ff21f8', '#ff4ff9', '#ff7afa', '#ff9cfb'], // pink
  ['#ff3b3b', '#ff5757', '#ff7878', '#ffa1a1'], // red
  ['#ceff2e', '#dfff75', '#e8ff9c', '#f0ffbd'], // yellow
  ['#ffd240', '#ffdc69', '#ffe799', '#fff0bf'], // orange
  ['#4a4a49', '#737373', '#9c9a9a', '#c2c2c2'] // grayscale
]

const ColorsPage = ({ color, changeColor, handleNextStep }) => {
  const isButtonDisabled = color === null

  return (
    <>
      <div className='colors-container '>
        <div className='text-container'>
          <p style={{ color: '#404040', fontWeight: 800 }}>Let's sort out the colour next</p>
          <p style={{ color: '#404040' }}>Choose the color for your logo</p>
        </div>

        {colors.map((colorRow, index) => {
          const isRowActive = colorRow.includes(color)
          const borderColor = isRowActive ? '#543EF8' : 'gray'
          return (
            <div style={{ borderColor }} className='color-row' key={index}>
              {colorRow.map((colorCell, index) => {
                return (
                  <div onClick={() => changeColor(colorRow[0])} key={index} style={{ backgroundColor: colorCell }} className='color-cell'></div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className='colors-footer'>
        <button onClick={handleNextStep} disabled={isButtonDisabled}>Next</button>
      </div>
    </>
  )
}

export default ColorsPage
