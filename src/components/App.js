import React, { PureComponent } from 'react';
import './App.css';
import './Dashboard';
import Dashboard from './Dashboard';
import Game from './game/Game';

class App extends PureComponent {
    state = { width: 12, height: 8, mines: 9, mode: false, key: 1 };

    newGame(params) {
        const key = this.state.key + 1;
        this.setState({ ...params, key });
    }

    changeMode(mode) {
        this.setState({ mode });
    }

    render() {
        const { state } = this;
        return (
            <div className="App">
                <header className="App-header">Minesweeper</header>
                <Dashboard
                    maxWidth={300}
                    maxHeight={300}
                    width={this.state.width}
                    height={this.state.height}
                    mines={this.state.mines}
                    mode={this.state.mode}
                    onSubmit={(params) => this.newGame(params)}
                    onChangeMode={(mode) => this.changeMode(mode)}
                />
                <Game {...state} />
            </div>
        );
    }
}

export default App;
