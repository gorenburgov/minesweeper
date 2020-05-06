import React, { Component } from 'react';
import IndicationPanel from './IndicationPanel';
import MineFieldView from './MineFieldView';
import Engine from '../../engine/Engine';
class Game extends Component {
    state = {};
    componentDidMount() {
        this.createNewGame();
    }

    componentDidUpdate(prevProps) {
        if (
            this.engine.inProgress &&
            prevProps &&
            prevProps.mode !== this.props.mode
        ) {
            this.setState(this.engine.setGodMode(this.props.mode));
        }
    }

    createNewGame() {
        const MAX_CELL_SIZE = 50;
        const MIN_CELL_SIZE = 20;
        const { width, height, mines, mode } = this.props;

        //TODO: make more relevant calculation
        const cellSize = Math.max(
            Math.min(
                (window.innerWidth - 20) / width,
                window.innerHeight / 2 / height,
                MAX_CELL_SIZE
            ),
            MIN_CELL_SIZE
        );

        this.engine = new Engine({ width, height, mines, mode });
        const state = this.engine.getViewState();
        this.setState({ ...state, cellSize });
    }

    onCellOpen(x, y) {
        if (!this.engine.inProgress) {
            return;
        }
        this.setState(this.engine.openCell(x, y));
    }

    onCellToggleFlag(x, y) {
        if (!this.engine.inProgress) {
            return;
        }
        this.setState(this.engine.toggleFlagCell(x, y));
    }

    render() {
        return (
            <div className="game">
                <IndicationPanel
                    flags={this.props.mines - this.state.flags}
                    message={this.state.message}
                    color={
                        this.engine &&
                        (this.engine.isWin
                            ? 'green'
                            : this.engine.isLost
                            ? 'red'
                            : '')
                    }
                />
                <MineFieldView
                    cells={this.state.cells}
                    cellSize={this.state.cellSize}
                    onCellOpen={(x, y) => this.onCellOpen(x, y)}
                    onCellToggleFlag={(x, y) => this.onCellToggleFlag(x, y)}
                />
            </div>
        );
    }
}

export default Game;
