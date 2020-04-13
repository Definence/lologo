import React, { useState } from 'react'
import capitalize from 'lodash.capitalize'
import JSZip from 'jszip'
import saveSvgAsPng from 'save-svg-as-png'
import FileSaver from 'file-saver'

import './styles.css'

const StylesPage = ({ color, business }) => {
  const [currentIndex, changeStyleIndex] = useState(null)
  const isButtonDisabled = currentIndex === null
  const words = business.split(' ').map((word) => capitalize(word))

  const styles = [
    { textTransform: 'capitalize', fontWeight: 'regular' },
    { textTransform: 'lowercase', fontWeight: 'regular' },
    { textTransform: 'uppercase', fontWeight: 'regular' },
    { textTransform: 'capitalize', firstBold: true },
    { textTransform: 'capitalize', lastBold: true },
    { textTransform: 'uppercase', fontWeight: 'bold', twoLines: true }
  ]

  const buildLabel = (firstBold, lastBold, twoLines) => {
    let label

    if (firstBold) {
      label = (
        <span>
          <b>{words[0]}</b>
          {words[1]}
        </span>
      )
    } else if (lastBold) {
      label = (
        <span>
          {words[0]}
          <b>{words[1]}</b>
        </span>
      )
    } else if (twoLines) {
      label = (
        <span>
          {words[0]}
          <br />
          {words[1]}
        </span>
      )
    } else {
      label = business
    }

    return label
  }

  const sharedStyles = {
    width: 300,
    height: 200,
    borderRadius: 13,
    fontSize: 22,
    color: 'white'
  }

  const buildLogo = ({ firstBold, lastBold, twoLines, ...style }, index) => {
    const isActive = currentIndex === index
    const onClick = () => changeStyleIndex(index)
    const styles = {
      backgroundColor: color,
      ...style,
      ...sharedStyles,
      ...isActive && { boxShadow: '0 0 10px rgba(0,0,0,1)' }
    }

    return <div key={index} onClick={onClick} className='business-style' style={styles}>{buildLabel(firstBold, lastBold, twoLines)}</div>
  }

  const buildSvgLabel = () => {
    const yOffset = sharedStyles.height / 2 + sharedStyles.fontSize / 2
    const { firstBold, lastBold, twoLines, ...style } = styles[currentIndex]

    if (twoLines && words.length === 2) return (
      <>
        <text x='50%' y='43%' textAnchor='middle' fill={sharedStyles.color} style={{ ...sharedStyles, ...style }}>{words[0]}</text>
        <text x='50%' y='58%' textAnchor='middle' fill={sharedStyles.color} style={{ ...sharedStyles, ...style }}>{words[1]}</text>
      </>
    )

    if (firstBold || lastBold) {
      return (
        <>
          <text x='50%' y={yOffset} textAnchor='middle' fill={sharedStyles.color} style={{ ...sharedStyles, ...style }}>
            <tspan style={{ ...firstBold && { fontWeight: 'bold' } }}>{words[0]}</tspan>
            <tspan style={{ ...lastBold && { fontWeight: 'bold' } }}>{words[1]}</tspan>
          </text>
        </>
      )
    }

    return (
      <text x='50%' y={yOffset} textAnchor='middle' fill={sharedStyles.color} style={{ ...sharedStyles, ...style }}>
        {business}
      </text>
    )
  }

  const buildSvg = () => {
    return (
      <svg id='lologo' height={sharedStyles.height} width={sharedStyles.width}>
        <rect x='0' y='0'
          width='100%' height='100%'
          rx={sharedStyles.borderRadius} ry={sharedStyles.borderRadius}
          fill={color}
        />
          {buildSvgLabel()}
      </svg>
    )
  }

  const canvasToImage = async () => {
    const zip = new JSZip()
    const svg = document.getElementById('lologo')
    const svgBase64 = await saveSvgAsPng.svgAsDataUri(svg, 'lologo.svg', {})
    const imgBase64 = await saveSvgAsPng.svgAsPngUri(svg, 'lologo.png', {})

    zip.file('lologo.svg', svgBase64.split(',')[1], { base64: true })
    zip.file('lologo.png', imgBase64.split(',')[1], { base64: true })

    const content = await zip.generateAsync({ type: 'blob' })
    FileSaver.saveAs(content, 'lologo.zip')
  }

  return (
    <>
      <div style={{ position: 'absolute', opacity: 0, zIndex: -1 }}>
        {currentIndex !== null && buildSvg()}
      </div>

      <div style={{ paddingBottom: '60px' }}>
        <div className='text-container'>
          <p style={{ color: '#404040', fontWeight: 800 }}>Let's figure outyour style next</p>
          <p style={{ color: '#404040' }}>Choose the a style that suits your logo</p>
        </div>

        <div className='styles-logos-container'>{styles.map(buildLogo)}</div>
      </div>

      <div className='colors-footer'>
        <button disabled={isButtonDisabled} onClick={canvasToImage}>Generate logo</button>
      </div>
    </>
  )
}

export default StylesPage
