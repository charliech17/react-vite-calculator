import './CalculateButton.scss'
function CalculateButton(props: calBtnType) {
    const calculateBtnStyle = () => {
        if(props.isChangeColor) return 'calBtnStyle'
        if(!props.isChangeColor) {
            if(isNowBtnFocus()) return 'calBtnActive calBtnStyle'
            else {
                return 'orangeColor calBtnStyle'
            }
        }
    }

    const isNowBtnFocus = () => {
        return props.value === props.focusValue
    }

    return (
        <div 
            className={calculateBtnStyle()}
            data-value={props.value}
        >{props.showText}</div>
    )
}

export default CalculateButton

interface calBtnType{
    showText: string,
    isChangeColor?: boolean,
    value: string,
    focusValue: string,
}