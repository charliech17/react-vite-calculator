import { useState, memo } from 'react'
import ButtonSection from './InnerComponents/ButtonSection'
import './IosCalculator.scss'

function IosCalculator() {
    const [count, setCount] = useState('0')
    const [calCount,setCalCount] = useState<null | string>(null)
    
    return (
        <div className='calculatorWrapper'>
            <section className='displayStyle'>
                <div>{calCount === null ? count : calCount }</div>
            </section>
            <ButtonSection 
                count={count}  
                calCount={calCount} 
                setCount={setCount} 
                setCalCount={setCalCount}
            />
        </div>
    )
}

export default memo(IosCalculator)