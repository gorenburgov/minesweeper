import Cell from './Cell';

let cell;
beforeEach(() => {
    cell = new Cell();
});

it('should get exploded property', () => {
    expect(cell.isExploded).toEqual(false);
    cell.isOpen = true;
    cell.isMined = true;
    expect(cell.isExploded).toEqual(true);
});
it('should get cell view', () => {
    cell.minesAround = 3;
    cell.isMined = true;
    let view = cell.getCellView();
    expect(view.minesAround).toEqual(undefined);
    expect(view.isMined).toEqual(undefined);
    view = cell.getCellView(true);
    expect(view.minesAround).toEqual(3);
    expect(view.isMined).toEqual(true);
    cell.isOpen = true;
    view = cell.getCellView();
    expect(view.minesAround).toEqual(3);
    expect(view.isMined).toEqual(true);
});
