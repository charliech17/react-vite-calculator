import './App.scss'
import IosCalculator from './components/calculatorType_IOS/IosCalculator'
import EngineerCalculator from './components/calculatorType_Engineer/EngineerCalculator'
import { useState } from 'react'

function App() {
  const [nowCalculator,setNewCalculator] = useState('1')

  const toggleCalculator = () => {
    switch(nowCalculator) {
      case '0':
        return <IosCalculator/>
      case '1':
        return <EngineerCalculator/>
    }
    return null
  }

  return (
    <>
      <div>
        {toggleCalculator()}
      </div>
      <div className='switchBtn' onClick={event => setNewCalculator(nowCalculator === '0' ? '1' : '0')}>
        <div>{nowCalculator === '1' ? '切換Ios計算機' : '切換工程計算機' }</div>
      </div>
    </>

  )
}

export default App
