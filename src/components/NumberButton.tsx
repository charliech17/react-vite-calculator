function NumberButton(props: numberBtnType) {
    const numBtnClass = () => {
        if(props.className) {
            return 'numberBtnStyle '+  props.className.join(' ')
        }
        return 'numberBtnStyle'
    }
    return (
        <div 
            className={numBtnClass()}
            data-value={props.showText}
        >
            {props.showText}
        </div>
    )
}

export default NumberButton

interface numberBtnType {
    showText: string,
    className?: string[]
}