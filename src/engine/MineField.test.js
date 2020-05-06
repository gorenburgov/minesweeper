import Minefield from './MineField';
let mineField, cell;
let width, height, mines;

it('should create MineField', () => {
    width = 10;
    height = 8;
    mines = 9;
    mineField = new Minefield({ width, height, mines });
    expect(mineField.cellsCount).toEqual(width * height);
    expect(mineField.minesCount).toEqual(mines);
    expect(mineField.flagsCount).toEqual(0);
});

it('should define cell neighbours correctly', () => {
    let neighbs = mineField.getNeighbours(0, 0);
    expect(neighbs.length).toEqual(3);
    expect(neighbs.filter((el) => el.x === 1 && el.y === 1).length).toEqual(1);
    neighbs = mineField.getNeighbours(width - 1, 0);
    expect(neighbs.length).toEqual(3);
    neighbs = mineField.getNeighbours(0, height - 1);
    expect(neighbs.length).toEqual(3);
    neighbs = mineField.getNeighbours(width - 1, height - 1);
    expect(neighbs.length).toEqual(3);

    neighbs = mineField.getNeighbours(1, 0);
    expect(neighbs.length).toEqual(5);
    neighbs = mineField.getNeighbours(1, height - 1);
    expect(neighbs.length).toEqual(5);
    neighbs = mineField.getNeighbours(0, 2);
    expect(neighbs.length).toEqual(5);
    neighbs = mineField.getNeighbours(width - 1, 2);
    expect(neighbs.length).toEqual(5);

    neighbs = mineField.getNeighbours(2, 2);
    expect(neighbs.length).toEqual(8);
});

it('should create MineField with predefined mines', () => {
    mines = [
        { x: 5, y: 6 },
        { x: 7, y: 6 },
        { x: 1, y: 0 },
        { x: 6, y: 3 },
        { x: 0, y: 1 },
    ];
    mineField = new Minefield({ width, height, mines });
    expect(mineField.cellsCount).toEqual(width * height);
    expect(mineField.minesCount).toEqual(mines.length);
    expect(mineField.flagsCount).toEqual(0);
});

it('should return isMined correctly', () => {
    expect(mineField.isMined(5, 6)).toEqual(true);
    expect(mineField.isMined(6, 6)).toEqual(false);
    cell = mineField.getCell(5, 6);
    expect(cell.isMined).toEqual(true);
    cell = mineField.getCell(6, 6);
    expect(cell.isMined).toEqual(false);
});

it('should define mines around cell correctly', () => {
    expect(mineField.getCell(6, 6).minesAround).toEqual(2);
    expect(mineField.getCell(6, 7).minesAround).toEqual(2);
    expect(mineField.getCell(0, 0).minesAround).toEqual(2);
    expect(mineField.getCell(1, 1).minesAround).toEqual(2);
    expect(mineField.getCell(6, 2).minesAround).toEqual(1);
    expect(mineField.getCell(4, 3).minesAround).toEqual(0);
});

it('should flagged cells correctly and return isFlagged', () => {
    cell = mineField.getCell(6, 6);
    expect(cell.isFlagged).toEqual(false);
    expect(mineField.flagsCount).toEqual(0);
    expect(mineField.isFlagged(6, 6)).toEqual(false);
    mineField.toggleFlag(6, 6);
    expect(cell.isFlagged).toEqual(true);
    expect(mineField.flagsCount).toEqual(1);
    expect(mineField.isFlagged(6, 6)).toEqual(true);
    mineField.toggleFlag(6, 6);
    expect(cell.isFlagged).toEqual(false);
    expect(mineField.flagsCount).toEqual(0);
    expect(mineField.isFlagged(6, 6)).toEqual(false);
});

it('should return cells views to show correctly', () => {
    cell = mineField.getCell(6, 6);
    cell.isOpen = true;
    let cells = mineField.getCellsToShow();
    expect(cells[6][6].minesAround).toEqual(2);
    expect(cells[7][6].minesAround).toEqual(undefined);
    expect(cells[6][7].isMined).toEqual(undefined);
    cells = mineField.getCellsToShow(true);
    expect(cells[6][6].minesAround).toEqual(2);
    expect(cells[7][6].minesAround).toEqual(2);
    expect(cells[6][7].isMined).toEqual(true);
});
