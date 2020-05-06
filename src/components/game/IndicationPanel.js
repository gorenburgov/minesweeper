import React from 'react';
export default ({ flags, message, color }) => {
    return (
        <div className="indication-panel">
            <div>Flags remained: {flags}</div>
            <div className={color}>{message}</div>
        </div>
    );
};
