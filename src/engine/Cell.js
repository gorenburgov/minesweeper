export default class Cell {
    constructor() {
        this.isOpen = false;
        this.isFlagged = false;
        this.isMined = false;
        this.minesAround = 0;
    }

    get isExploded() {
        return this.isOpen && this.isMined && !this.isFlagged;
    }

    getCellView(isFull) {
        const ret = {
            isOpen: this.isOpen,
            isFlagged: this.isFlagged,
            isExploded: this.isExploded,
        };
        if (isFull || this.isOpen) {
            ret.isMined = this.isMined;
            ret.minesAround = this.minesAround;
        }

        return ret;
    }
}
