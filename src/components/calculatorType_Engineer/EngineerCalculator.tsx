import "./EngineerCalculator.scss"
import { useRef, useState } from 'react'
function EngineerCalculator() {
    const [displayValue, setDisplayValue] = useState('')
    const nowDisplayValue = useRef(displayValue)
    const markArray = ['+','-','×','÷']
    const [opHistory,setOpHistory] = useState('')
    
    const handleShowExecBtn = (event: React.MouseEvent<Element> | null) => {
        const eventTarget = event?.target as HTMLElement
        const inputDisplayValue = eventTarget.dataset.value
        if(inputDisplayValue === 'AC') return clearAllCal()
        if(inputDisplayValue === '=') return handleCalculate()
        if(eventTarget && eventTarget.classList.contains('addDisplay')) {
            if(inputDisplayValue === '.' && displayValue.includes('.')) return
            const newDisplayValue = displayValue + inputDisplayValue
            nowDisplayValue.current = newDisplayValue
            setDisplayValue(newDisplayValue)
        }
    }

    const handleCalculate =  () => {
        const orgDisplayVal= nowDisplayValue.current
        calculateMarkOperation('×')
        calculateMarkOperation('÷')
        calculateMarkOperation('-')
        calculateMarkOperation('+')
        if(nowDisplayValue.current !== orgDisplayVal) {
            setOpHistory(`${orgDisplayVal}=${nowDisplayValue.current}`)
        }
    }

    const calculateMarkOperation = (inputMark: string) => {
        setOpHistory(displayValue)
        let [leftNumber, rightNumber] = findLeftandRightNumber(inputMark)
        while(leftNumber && rightNumber) {
            let operationValue;
            if(inputMark === '×') operationValue = Number(leftNumber) * Number(rightNumber)
            if(inputMark === '÷') operationValue = Number(leftNumber) / Number(rightNumber)
            if(inputMark === '+') operationValue = Number(leftNumber) + Number(rightNumber)
            if(inputMark === '-') operationValue = Number(leftNumber) - Number(rightNumber)
            if(!operationValue) return
            console.log('operationValue',operationValue)
            const newReplaceValue = nowDisplayValue.current.replace(
                `${leftNumber}${inputMark}${rightNumber}`,operationValue.toString()
            )
            
            setDisplayValue(newReplaceValue)
            nowDisplayValue.current = newReplaceValue
            let [newLeftNumber, newRightNumber] = findLeftandRightNumber(inputMark)
            leftNumber = newLeftNumber; rightNumber = newRightNumber;
        }
    }

    const findLeftandRightNumber = (inputMark: string) => {
        const mutipleMarkIndex = nowDisplayValue.current.indexOf(inputMark)
        let leftNumber='', rightNumber='', leftIndex = mutipleMarkIndex-1, rightIndex = mutipleMarkIndex+1
        if(mutipleMarkIndex > -1) {
            // 乘法左邊數字
            while(checkIsContinue(leftIndex)) {
                leftNumber += nowDisplayValue.current[leftIndex]
                leftIndex -= 1
            }
            
            leftNumber = reverseString(leftNumber)
            console.log('左邊數字 '+ leftNumber)
            // 乘法右邊數字
            while(checkIsContinue(rightIndex)) {
                rightNumber+= nowDisplayValue.current[rightIndex]
                rightIndex += 1
            }
            console.log('右邊數字 '+ rightNumber)
        }

        return [leftNumber,rightNumber]
    }

    const checkIsContinue = (inputIndex: number) => {
        if(inputIndex<0 || inputIndex > nowDisplayValue.current.length-1) return false
        for(let mark of markArray ) {
            if(nowDisplayValue.current[inputIndex] === mark) {
                return false
            }
        }
        return true
    }

    const reverseString = (inputString: string) => {
        let tempReverseString = ''
        for(let i=inputString.length-1;i>-1;i--) {
            tempReverseString += inputString[i]
        }
        return tempReverseString
    }

    const clearAllCal = () => {
        setDisplayValue("")
        setOpHistory("")
    }

    return <div className="eg-wrapper">
        <section>{displayValue}</section>
        <section>{opHistory}</section>
        <section className="buttonSectionStyle" onClick={event => handleShowExecBtn(event)}>
            <div className="innerBtn">(</div>
            <div className="innerBtn">)</div>
            <div className="innerBtn">%</div>
            <div className="innerBtn" data-value="AC">AC</div>
            <div className="innerBtn addDisplay" data-value="7">7</div>
            <div className="innerBtn addDisplay" data-value="8">8</div>
            <div className="innerBtn addDisplay" data-value="9">9</div>
            <div className="innerBtn addDisplay" data-value="÷">÷</div>
            <div className="innerBtn addDisplay" data-value="4">4</div>
            <div className="innerBtn addDisplay" data-value="5">5</div>
            <div className="innerBtn addDisplay" data-value="6">6</div>
            <div className="innerBtn addDisplay" data-value="×">×</div>
            <div className="innerBtn addDisplay" data-value="1">1</div>
            <div className="innerBtn addDisplay" data-value="2">2</div>
            <div className="innerBtn addDisplay" data-value="3">3</div>
            <div className="innerBtn addDisplay" data-value="-">-</div>
            <div className="innerBtn addDisplay" data-value="0">0</div>
            <div className="innerBtn addDisplay" data-value=".">.</div>
            <div className="innerBtn" data-value="=">=</div>
            <div className="innerBtn addDisplay" data-value="+">+</div>
        </section>
    </div>
}

export default EngineerCalculator