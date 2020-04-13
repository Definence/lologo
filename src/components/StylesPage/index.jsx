import React, { useState } from 'react'
import capitalize from 'lodash.capitalize'

import './styles.css'

const StylesPage = ({ color, business }) => {
  const [currentStyle, changeStyle] = useState(null)
  const isButtonDisabled = currentStyle !== null
  const styles = [
    { textTransform: 'capitalize', fontWeight: 'regular' },
    { textTransform: 'lowercase', fontWeight: 'regular' },
    { textTransform: 'uppercase', fontWeight: 'regular' },
    { firstBold: true },
    { lastBold: true },
    { textTransform: 'uppercase', fontWeight: 'bold' }
  ]

  const logos = styles.map(({ firstBold, lastBold, ...style }, index) => {
    const isActive = currentStyle === index
    console.log(isActive, currentStyle, index)
    let label
    const styles = {
      backgroundColor: color,
      ...style,
      ...isActive && { boxShadow: '0 0 10px rgba(0,0,0,1)' }
    }

    if (firstBold) {
      const words = business.split(' ').map((word) => capitalize(word))
      label = (
        <span>
          <b>{words[0]}</b>
          {words[1]}
        </span>
      )
    } else if (lastBold) {
      const words = business.split(' ').map((word) => capitalize(word))
      label = (
        <span>
          {words[0]}
          <b>{words[1]}</b>
        </span>
      )
    } else {
      label = business
    }

    return <div key={index} onClick={() => changeStyle(index)} className='business-style' style={styles}>{label}</div>
  })

  return (
    <>
      <div style={{ paddingBottom: '60px' }}>
        <div className='text-container'>
          <p style={{ color: '#404040', fontWeight: 800 }}>Let's figure outyour style next</p>
          <p style={{ color: '#404040' }}>Choose the a style that suits your logo</p>
        </div>

        <div className='styles-logos-container'>{logos}</div>
      </div>

      <div className='colors-footer'>
        <button disabled={isButtonDisabled}>Generate logo</button>
      </div>
    </>
  )
}

export default StylesPage
