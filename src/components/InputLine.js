const {useState} = require("react");


const InputLine = ({setCommand, expire}) => {
    const [input, setInput] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        expire()
        setCommand(input)
        setInput('')
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <lable>>Ledis:</lable>
                <input className='input-field' type="text" value={input} onChange = {e => setInput(e.target.value)}/>
            </form>
        </div>
    )
}

export default InputLine