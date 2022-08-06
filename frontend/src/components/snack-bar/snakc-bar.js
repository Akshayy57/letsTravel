import React from "react";

const SnackBar = (props) => {
    const { message, classes } = props;
    
    return (
        <div className={`alert ${classes} d-flex align-items-center position-fixed`} role="alert">
            <div>
                {message}
            </div>
        </div>
    )
}

export default SnackBar;