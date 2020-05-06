import Minefield from './MineField';
import Engine from './Engine';

const width = 12;
const height = 8;
const mines = [
    { x: 2, y: 2 },
    { x: 7, y: 2 },
    { x: 0, y: 3 },
    { x: 4, y: 6 },
    { x: 7, y: 6 },
];
const mode = false;

let field = new Minefield({ width, height, mines });
let engine = new Engine({ field, mode });
let state;

it('open all  neihgboring cell with no mines around ', () => {
    expect(engine.inProgress).toEqual(true);
    engine.openCell(0, 7);
    //console.log(field.getCell(0, 7));
    expect(field.getCell(0, 7).isOpen).toEqual(true);
    expect(field.getCell(2, 6).isOpen).toEqual(true);
    expect(field.getCell(3, 6).isOpen).toEqual(true);
    expect(field.getCell(4, 7).isOpen).toEqual(false);
});

it('change to win status when win', () => {
    engine.toggleFlagCell(2, 2);
    engine.toggleFlagCell(7, 2);
    engine.toggleFlagCell(0, 3);
    engine.toggleFlagCell(0, 3);
    expect(field.flagsCount).toEqual(2);
    engine.toggleFlagCell(0, 3);
    engine.toggleFlagCell(4, 6);
    engine.toggleFlagCell(7, 6);
    expect(field.flagsCount).toEqual(5);
    state = engine.toggleFlagCell(6, 6);
    expect(field.flagsCount).toEqual(5);
    expect(state.message).toEqual(
        'You are out of flags! You can pick up any unnecessary set flag'
    );
    engine.openCell(5, 6);
    engine.openCell(6, 6);
    engine.openCell(4, 7);
    engine.openCell(5, 7);
    engine.openCell(6, 7);
    state = engine.openCell(7, 7);
    expect(state.message).toEqual('Congatulations! You win the game :)');
    expect(engine.inProgress).toEqual(false);
});
it('change to lost status when loose', () => {
    field = new Minefield({ width, height, mines });
    engine = new Engine({ field, mode });
    engine.openCell(0, 7);
    state = engine.openCell(2, 2);
    expect(state.message).toEqual('Sorry, you are lost the game :(');
    expect(engine.inProgress).toEqual(false);
});

it('should switch the god mode ', () => {
    field = new Minefield({ width, height, mines });
    engine = new Engine({ field, mode });
    state = engine.getViewState();
    expect(state.cells[2][2].isMined).toEqual(undefined);
    expect(state.cells[1][1].minesAround).toEqual(undefined);
    engine.setGodMode(true);
    state = engine.getViewState();
    expect(state.cells[2][2].isMined).toEqual(true);
    expect(state.cells[1][1].minesAround).toEqual(1);
    engine.setGodMode(false);
    state = engine.getViewState();
    expect(state.cells[2][2].isMined).toEqual(undefined);
    expect(state.cells[1][1].minesAround).toEqual(undefined);
});
