import React from 'react'

function Alert(props) {
    const cap = (word) => {
        const str = word.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (
        <div style={{height: "50px"}}>
           { 
           props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{cap(props.alert.type)}</strong>: {props.alert.message}
</div>
}
</div>
    )
}

export default Alert
