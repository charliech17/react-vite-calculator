import { SetStateAction, useState } from 'react'
import './App.scss'
import CalculateButton from './components/CalculateButton'
import NumberButton from './components/NumberButton'

function App() {
  const [count, setCount] = useState('0')
  const [calCount,setCalCount] = useState<null | string>(null)
  const [oprateSign,setOprateSign] = useState('')
  const [saveOprateSign,setSaveOprateSign] = useState('')

  const handleCalculatorClick = (event: React.MouseEvent<Element>) => {
    const eventTarget = event.target as HTMLElement
    if(!eventTarget) return
    if( 
        eventTarget.classList.contains('numberBtnStyle') && 
        eventTarget.dataset.value
      ) {
      if(saveOprateSign) {
        const calCountValue = calCount ? calCount.toString() : 0
        const newInput: string = eventTarget.dataset.value
        const newCalCount: string = Number(calCountValue.toString() + newInput).toString()
        setOprateSign('')
        setCalCount(newCalCount)
      } else {
        const newInput: string = eventTarget.dataset.value
        let newCount: string 
        if(count === '0' || calCount ==='0') {
          newCount = newInput
        } else {
          newCount = (count + newInput)
        }
        
        
        setCount(newCount) 
      }
    } 

    if(
      eventTarget.classList.contains('calBtnStyle') && 
      eventTarget.dataset.value
    ) {
      const newSign = eventTarget.dataset.value
      if(oprateSign === newSign) return 
      else {
        if(newSign === 'addDecimal') {
          const nowNum = calCount === null ? count : calCount
          console.log(nowNum.toString().includes('.'),count)
          if(!nowNum.toString().includes('.')){
            calCount === null ? setCount(count + '.') : setCalCount(calCount + '.')
          }
          return
        }
        calculateValue()
        if(newSign === 'equal') {
          setCalCount(null)
          setOprateSign('')
          setSaveOprateSign('')
          return
        }
        if(newSign === 'deleteAll') {
          setCount('0')
          setCalCount(null)
          setOprateSign('')
          setSaveOprateSign('')
          return
        }
        if(newSign === 'changeSign') {
          const changeSignNum:number = calCount === null ? (-1) * Number(count) : (-1) * Number(calCount)
          const changeSignString = changeSignNum.toString()
          calCount === null ? setCount(changeSignString) : setCalCount(changeSignString)
          return
        }
        setOprateSign(newSign)
        setSaveOprateSign(newSign)
      }
    }
  }

  const calculateValue = () => {
    switch(saveOprateSign) {
      case 'plus':
        const newPlusValue = (Number(count) + Number(calCount)).toString()
        setCount(newPlusValue) 
        setCalCount(null)
        break;
      case 'minus':
        const newMinusValue = (Number(count) - Number(calCount)).toString()
        setCount(newMinusValue) 
        setCalCount(null)
        break;
      case 'equal':
        break;
      case 'multiply':
        const newMultipyValue = (Number(count) * Number(calCount)).toString()
        setCount(newMultipyValue) 
        setCalCount(null)
        break;
      case 'division':
        const newDivisionValue = (Number(count) / Number(calCount)).toString()
        setCount(newDivisionValue) 
        setCalCount(null)
        break;
    }
  }

  return (
    <div className='calculatorWrapper'>
      <section className='displayStyle'>
        <div>{calCount === null ? count : calCount }</div>
      </section>
      <section className='controlsStyle' onClick={handleCalculatorClick}>
        <CalculateButton 
          showText="AC" 
          value="deleteAll"
          focusValue={oprateSign}
          isChangeColor={true}
        />
        <CalculateButton 
          showText="+/-" 
          value="changeSign"
          focusValue={oprateSign}
          isChangeColor={true}
        />
        <CalculateButton 
          showText="%"
          value="percent"
          focusValue={oprateSign}
          isChangeColor={true}
        />
        <CalculateButton 
          value="division"
          focusValue={oprateSign}
          showText="÷"
        />
        <NumberButton showText="7"/>
        <NumberButton showText="8"/>
        <NumberButton showText="9"/>
        <CalculateButton 
          value="multiply"
          focusValue={oprateSign}
          showText="×"
        />
        <NumberButton showText="4"/>
        <NumberButton showText="5"/>
        <NumberButton showText="6"/>
        <CalculateButton 
          value='minus'
          focusValue={oprateSign}
          showText="-"
        />
        <NumberButton showText="1"/>
        <NumberButton showText="2"/>
        <NumberButton showText="3"/>
        <CalculateButton 
          value='plus'
          focusValue={oprateSign}
          showText="+"
        />
        <NumberButton showText="0"/>
        <CalculateButton 
          value='none' 
          showText="" 
          focusValue={oprateSign}
          isChangeColor={true}
        />
        <CalculateButton 
          value='addDecimal'
          showText="."
          focusValue={oprateSign}
          isChangeColor={true}
        />
        <CalculateButton 
          value='equal'
          focusValue={oprateSign}
          showText="="
        />
      </section>
    </div>
  )
}

export default App
