import React, { Component } from 'react';

class Dashboard extends Component {
    state = {
        width: 0,
        height: 0,
        mines: 0,
        mode: false,
        err: '',
    };

    componentDidMount() {
        const { width, height, mines, mode } = this.props;
        this.setState({ width, height, mines, mode });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (!isNaN(value) && value >= 0) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validate()) {
            const newState = { ...this.state, mode: false, err: '' };
            this.setState(newState);
            this.props.onSubmit(newState);
        }
    }

    handleCheckboxChange(event) {
        this.setState({ mode: event.target.checked });
        this.props.onChangeMode(event.target.checked);
    }

    validate() {
        const { width, height, mines } = this.state;
        if (width <= 0) {
            this.setState({ err: `Width shoud be a positive number` });
            return false;
        }

        if (width > this.props.maxWidth) {
            this.setState({ err: `Max width is ${this.props.maxWidth}` });
            return false;
        }

        if (height <= 0) {
            this.setState({ err: `Height shoud be a positive number` });
            return false;
        }

        if (height > this.props.maxHeight) {
            this.setState({ err: `Max height is ${this.props.maxHeight}` });
            return false;
        }

        const maxMines = Math.floor((width * height) / 2);

        if (maxMines < mines) {
            this.setState({
                err: `Max count of mines is ${maxMines} - the count of cells divided by 2`,
            });
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className="dashboard">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="dasboard-row">
                        <label>
                            width:
                            <input
                                name="width"
                                type="text"
                                value={this.state.width}
                                onChange={(event) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </label>
                        <label>
                            height:
                            <input
                                name="height"
                                type="text"
                                value={this.state.height}
                                onChange={(event) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </label>
                        <label>
                            mines:
                            <input
                                name="mines"
                                type="text"
                                value={this.state.mines}
                                onChange={(event) =>
                                    this.handleInputChange(event)
                                }
                            />
                        </label>
                    </div>
                    <div className="dashboard-row">
                        <label>
                            <input
                                name="mode"
                                label="superman"
                                type="checkbox"
                                value="Superman"
                                checked={this.state.mode}
                                onChange={(event) =>
                                    this.handleCheckboxChange(event)
                                }
                            />
                            superman
                        </label>

                        <button
                            type="submit"
                            disabled={this.state.pendingRequest}
                            className="waves-effect waves-light btn-small">
                            New game
                        </button>
                    </div>
                </form>
                <div className="dashboard-message">{this.state.err}</div>
            </div>
        );
    }
}

export default Dashboard;
