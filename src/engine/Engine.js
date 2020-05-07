import MineField from './MineField';

const GAME_STARTED = 0;
const GAME_WIN = 1;
const GAME_LOST = 2;

class Engine {
    constructor({ width, height, mines, mode, field }) {
        this.godMode = mode;
        this.openedCells = 0;
        this.field = field || new MineField({ width, height, mines });
        this.status = GAME_STARTED;
    }

    get inProgress() {
        return this.status === GAME_STARTED;
    }

    get isWin() {
        return this.status === GAME_WIN;
    }
    get isLost() {
        return this.status === GAME_LOST;
    }

    getViewState() {
        const showFull =
            this.godMode ||
            this.status === GAME_WIN ||
            this.status === GAME_LOST;

        return {
            status: this.status,
            message: this.message,
            cells: this.field.getCellsToShow(showFull),
            flags: this.field.flagsCount,
        };
    }

    openCell(x, y) {
        const { isMined, isFlagged, isOpen } = this.field.getCell(x, y);
        if (!isFlagged && isMined) {
            this.processLoose(x, y);
        } else if (!isFlagged && !isOpen) {
            this.processOpen(x, y);
        }
        return this.getViewState();
    }

    toggleFlagCell(x, y) {
        const { field } = this;
        const cell = field.getCell(x, y);

        if (!cell.isFlagged && field.flagsCount === field.minesCount) {
            this.message =
                'You are out of flags! You can pick up any unnecessary set flag';
        } else {
            field.toggleFlag(x, y);
            this.message = '';
            this.checkWin();
        }
        return this.getViewState();
    }

    setGodMode(mode) {
        this.godMode = mode;
        this.message = `You turn god mode ${mode ? 'on' : 'off'}`;
        return this.getViewState();
    }

    processLoose(x, y) {
        this.field.getCell(x, y).isOpen = true;
        this.status = GAME_LOST;
        this.message = 'Sorry, you are lost the game :(';
    }

    processOpen(x, y) {
        const stack = [{ x, y }];
        let cell;
        while (stack.length) {
            const currentInd = stack.pop();
            cell = this.field.getCell(currentInd.x, currentInd.y);
            cell.isOpen = true;
            this.openedCells++;
            if (!cell.minesAround) {
                this.field
                    .getNeighbours(currentInd.x, currentInd.y)
                    .forEach((ind) => {
                        const item = this.field.getCell(ind.x, ind.y);
                        if (!item.isOpen) {
                            item.isOpen = true;
                            stack.push(ind);
                        }
                    });
            }
        }
        this.message = '';
        this.checkWin();
    }

    checkWin() {
        if (
            this.openedCells + this.field.flagsCount ===
            this.field.cellsCount
        ) {
            this.status = GAME_WIN;
            this.message = 'Congatulations! You win the game :)';
        }
    }
}

export default Engine;
