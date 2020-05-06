import React, { Fragment } from 'react';

export default ({ x, y, cell, onOpen, onToggleFlag }) => {
    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.shiftKey) {
            onToggleFlag(x, y);
        } else {
            onOpen(x, y);
        }
    };

    const renderMine = () => {
        return <i className="fas fa-bomb"></i>;
    };
    const renderFlag = () => {
        return <i className="fas fa-flag"></i>;
    };

    let text;

    const coverClassList = ['state-fill'];

    if (cell.isOpen) {
        coverClassList.push(cell.isExploded ? 'exploded' : 'hidden');
    }

    text = cell.isFlagged
        ? renderFlag()
        : cell.isMined
        ? renderMine()
        : cell.minesAround || '';

    return (
        <Fragment>
            <div className={coverClassList.join(' ')}></div>
            <div className="state-text" onClick={onClick}>
                {text}
            </div>
        </Fragment>
    );
};
