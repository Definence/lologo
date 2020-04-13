import React from 'react'

import './styles.css'

const BusinessPage = ({ business, changeBusiness, handleNextStep }) => {
  const isButtonDisabled = business === ''

  return (
    <div className='business-container'>
      <div className='form-container'>
        <input value={business} onChange={changeBusiness} placeholder='Enter Your Business Name' />
        <button disabled={isButtonDisabled} onClick={handleNextStep}>Next</button>
      </div>

      <p className='quote'>
        <q>
          <b>
            Dream Big.<br />
            Start Small.<br />
            But most of all, Start.
          </b>
        </q>
        <br />
        - Simon Sinek
      </p>
    </div>
  )
}

export default BusinessPage
