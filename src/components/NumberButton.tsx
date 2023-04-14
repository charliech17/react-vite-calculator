function NumberButton(props: numberBtnType) {
    return (
        <div 
            className="numberBtnStyle" 
            data-value={props.showText}
        >
            {props.showText}
        </div>
    )
}

export default NumberButton

interface numberBtnType {
    showText: string
}