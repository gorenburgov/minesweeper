import React from 'react';
import CellView from './CellView';
export default ({ cells = [], onCellOpen, onCellToggleFlag, cellSize }) => {
    const renderCells = () => {
        return cells.map((row, i) => (
            <tr key={i}>
                {row.map((cell, j) => (
                    <td
                        className="mine-cell"
                        style={{
                            width: `${cellSize}px`,
                            height: `${cellSize}px`,
                        }}
                        key={j}>
                        <CellView
                            x={j}
                            y={i}
                            onOpen={onCellOpen}
                            onToggleFlag={onCellToggleFlag}
                            cell={cell}
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <div className="mine-field">
            <table>
                <tbody>{renderCells()}</tbody>
            </table>
        </div>
    );
};
