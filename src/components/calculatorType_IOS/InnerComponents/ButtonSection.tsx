import { useState, SetStateAction, Dispatch, KeyboardEvent, useEffect } from 'react'
import CalculateButton from './CalculateButton'
import NumberButton from './NumberButton'
import './ButtonSection.scss'


function ButtonSection(props: propsType) {
    const [oprateSign,setOprateSign] = useState('')
    const [saveOprateSign,setSaveOprateSign] = useState('')

    const handleKeydownEvent = (event: any) => {
        // 判斷是否為數字
        const NumberArray = ['1','2','3','4','5','6','7','8','9','0']
        let isNumber = false
        NumberArray.forEach((number)=> {
            if(number == event.key) {
                isNumber = true
                return 
            }
        })
        if(isNumber) {
            return handleCalculatorClick(null,event.key,'number')
        }
        // 判斷是否為符號
        const operaterArray = ['+','-','Enter','.','*','/','%']
        const operaterCorrespondArray = ['plus','minus','equal','addDecimal','multiply','division','percent']
        let isOperater = false
        operaterArray.forEach((operater)=> {
            if(operater == event.key) {
                isOperater = true
                return 
            }
        })
        if(isOperater) {
            const index = operaterArray.indexOf(event.key)
            return handleCalculatorClick(null,  operaterCorrespondArray[index],'operater')
        }
    }

    const addKeyInListener = () => {
        window.addEventListener('keydown',handleKeydownEvent)
    }

    useEffect(()=> {
        addKeyInListener()
        return () => {
            removeEventListener('keydown', handleKeydownEvent);
        };
    },[addKeyInListener,props.count,props.calCount])

    const handleCalculatorClick = (event: (React.MouseEvent<Element>) | null, eventKey: string, triggerFrom: string) => {
        const eventTarget = event?.target as HTMLElement
        console.log((eventKey && triggerFrom === 'operater'))
        if( 
            (eventKey && triggerFrom === 'number') ||
            (eventTarget && eventTarget.classList.contains('numberBtnStyle') && eventTarget.dataset.value)
        ) {
            if(saveOprateSign) {
                const calCountValue = props.calCount ? props.calCount.toString() : 0
                const newInput: string =  eventKey || eventTarget.dataset.value || ''
                const newCalCount: string = Number(calCountValue.toString() + newInput).toString()
                setOprateSign('')
                props.setCalCount(newCalCount)
            } else {
                const newInput: string = eventKey || eventTarget.dataset.value || ''
                let newCount: string 
                if(props.count === '0' || props.calCount ==='0') {
                    newCount = newInput
                } else {
                    newCount = (props.count + newInput)
                }
                props.setCount(newCount) 
            }
            return
        } 
        else if(
            (eventKey && triggerFrom === 'operater') ||
            (eventTarget && eventTarget.classList.contains('calBtnStyle') && eventTarget.dataset.value)
        ) {
            const newSign = eventKey || eventTarget.dataset.value || ''
            if(oprateSign === newSign) return 
            else {
                if(newSign === 'addDecimal') {
                    const nowNum = props.calCount === null ? props.count : props.calCount
                    if(!nowNum.toString().includes('.')){
                        props.calCount === null ? props.setCount(props.count + '.') : props.setCalCount(props.calCount + '.')
                    }
                    return
                }
                if(newSign === 'percent') {
                    const newPercentNum = props.calCount === null ? (Number(props.count) / 100).toString() : (Number(props.calCount) / 100).toString()
                    props.calCount === null ? props.setCount(newPercentNum) : props.setCalCount(newPercentNum)
                    return
                }
                calculateValue()
                if(newSign === 'equal') {
                    props.setCalCount(null)
                    setOprateSign('')
                    setSaveOprateSign('')
                    return
                }
                if(newSign === 'deleteAll') {
                    props.setCount('0')
                    props.setCalCount(null)
                    setOprateSign('')
                    setSaveOprateSign('')
                    return
                }
                if(newSign === 'changeSign') {
                    const changeSignNum:number = props.calCount === null ? (-1) * Number(props.count) : (-1) * Number(props.calCount)
                    const changeSignString = changeSignNum.toString()
                    props.calCount === null ? props.setCount(changeSignString) : props.setCalCount(changeSignString)
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
                const newPlusValue = (Number(props.count) + Number(props.calCount)).toString()
                props.setCount(newPlusValue) 
                props.setCalCount(null)
                break;
            case 'minus':
                const newMinusValue = (Number(props.count) - Number(props.calCount)).toString()
                props.setCount(newMinusValue) 
                props.setCalCount(null)
                break;
            case 'multiply':
                const newMultipyValue = (Number(props.count) * Number(props.calCount)).toString()
                props.setCount(newMultipyValue) 
                props.setCalCount(null)
                break;
            case 'division':
                const newDivisionValue = (Number(props.count) / Number(props.calCount)).toString()
                props.setCount(newDivisionValue) 
                props.setCalCount(null)
                break;
        }
    }

    return (
        <section className='controlsStyle' onClick={(event) => handleCalculatorClick(event, '','')}>
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
            <NumberButton 
                showText="0" 
                className={['girdTwoColumn']}
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
    )
}

export default ButtonSection

interface propsType{
    count: string,
    setCount: Dispatch<SetStateAction<string>>,
    calCount: string | null,
    setCalCount: Dispatch<SetStateAction<string | null>>,
}