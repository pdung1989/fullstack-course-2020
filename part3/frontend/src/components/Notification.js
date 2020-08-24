import React from 'react'

const Notification = ({message, classCss}) => {
    if(message === null) {
        return null
    }

    return (
        <div className={classCss}>
            {message}
        </div>
    )
}

export default Notification