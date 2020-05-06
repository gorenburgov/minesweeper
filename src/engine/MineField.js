import Cell from './Cell';

export default class Minefield {
    constructor({ width, height, mines }) {
        this.width = width;
        this.height = height;
        this.createMineSet(mines);
        this.createField();
        this.flagSet = new Set();
    }

    createMineSet(mines) {
        const mineSet = new Set();
        if (mines instanceof Array) {
            mines.forEach((mine) => mineSet.add(this.hash(mine.x, mine.y)));
        } else {
            const { width, height } = this;
            for (let i = 0; i < mines; i++) {
                let x, y, hash;
                do {
                    x = Math.floor(Math.random() * width);
                    y = Math.floor(Math.random() * height);
                    hash = this.hash(x, y);
                } while (mineSet.has(hash));
                mineSet.add(hash);
            }
        }
        this.mineSet = mineSet;
    }

    get minesCount() {
        return this.mineSet.size;
    }

    get flagsCount() {
        return this.flagSet.size;
    }

    get cellsCount() {
        if (!this._cellCount) {
            this._cellCount = this.width * this.height;
        }
        return this._cellCount;
    }

    hash(x, y) {
        return `${x}_${y}`;
    }

    createField() {
        const { width, height } = this;
        this.mineFieldData = [];
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                const cell = new Cell();
                cell.minesAround = this.getMinesAround(j, i);
                cell.isMined = this.isMined(j, i);
                row.push(cell);
            }
            this.mineFieldData.push(row);
        }
    }

    getMinesAround(x, y) {
        return this.getNeighbours(x, y).reduce(
            (sum, el) => sum + this.mineSet.has(this.hash(el.x, el.y)),
            0
        );
    }

    getNeighbours(x, y) {
        const { width, height } = this;
        let ret = [];
        for (let i = y - 1; i < y + 2; i++)
            for (let j = x - 1; j < x + 2; j++) {
                if (
                    j >= 0 &&
                    j < width &&
                    i >= 0 &&
                    i < height &&
                    !(j === x && i === y)
                ) {
                    ret.push({ x: j, y: i });
                }
            }
        return ret;
    }

    getCell(x, y) {
        return this.mineFieldData[y][x];
    }

    isMined(x, y) {
        const hash = this.hash(x, y);
        return this.mineSet.has(hash);
    }

    isFlagged(x, y) {
        const hash = this.hash(x, y);
        return this.flagSet.has(hash);
    }

    toggleFlag(x, y) {
        const hash = this.hash(x, y);
        const cell = this.getCell(x, y);

        if (this.isFlagged(x, y)) {
            this.flagSet.delete(hash);
            cell.isFlagged = false;
        } else {
            this.flagSet.add(hash);
            cell.isFlagged = true;
        }
    }

    getCellsToShow(full) {
        return this.mineFieldData.map((raw) =>
            raw.map((cell) => cell.getCellView(full))
        );
    }
}
