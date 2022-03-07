

const Command = ({command, status}) => {
    return (
        <div>
            <p>> {command} </p>
            <p>{status}</p>
        </div>
    )
}

export default Command