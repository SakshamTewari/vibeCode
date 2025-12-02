function Button({label, style, onClick}){
    return(
        <button style={style} onClick={onClick}>{label}</button>
    )
}

export default Button;