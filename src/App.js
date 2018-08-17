import React, {Component} from 'react';
import { Distance, Interval, Note } from "tonal";
// import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        noteFrom: '',
        noteTo: '',
        semitones: '',
        interval: ''
    };

    onNoteFromChange = (event) => {

        //pattern="[a-gA-G0-9#-]+"

        let n = Note.name(event.target.value);

        console.log(`change ${event.target.value} --> ${n}`);

        if (n === null) return;

        if (this.state.noteTo) {
            this.setState({
                noteFrom: n,
                semitones: Distance.semitones(n, this.state.noteTo),
                interval: Distance.interval(n, this.state.noteTo)
            });
        } else {
            this.setState({noteFrom: n});
        }
    };

    onNoteToChange = (event) => {

        console.log('onNoteToChange', event.target.value);

        let n = Note.name(event.target.value);

        if (n === null) return;

        if (this.state.noteFrom) {
            this.setState({
                noteTo: n,
                semitones: Distance.semitones(this.state.noteFrom, n),
                interval: Distance.interval(this.state.noteFrom, n)
            });
        } else {
            this.setState({noteTo: n});
        }
    };

    onSemitonesChange = (event) => {

        console.log('onSemitonesChange', event.target.value);

        let n = 0;

        if (event.target.value.trim()) {
            n = Number.parseInt(event.target.value, 10);
            if (Number.isNaN(n)) {
                return;
            }
        }

        if (this.state.noteFrom) {
            let i = Interval.fromSemitones(n);
            console.log(`${n} --> ${i}`);
            this.setState({
                noteTo: Distance.transpose(this.state.noteFrom, i),
                semitones: n,
                interval: i
            });
        } else {
            this.setState({semitones: event.target.value});
        }

    };

    onIntervalChange = (event) => {
        console.log('onIntervalChange', event.target.value);

        let n = 0;

        if (event.target.value.trim()) {
            n = Number.parseInt(event.target.value, 10);
            if (Number.isNaN(n)) {
                return;
            }
        }
/*
        if (this.state.noteFrom) {
            let i = Interval.fromSemitones(n);
            console.log(`${n} --> ${i}`);
            this.setState({
                noteTo: Distance.transpose(this.state.noteFrom, i),
                semitones: n,
                interval: i
            });
        } else {
            this.setState({interval: event.target.value});
        }
*/
    };

    swapNotes = () => {
        if (!this.state.noteFrom || !this.state.noteTo) return;
        let f = this.state.noteTo;
        let t = this.state.noteFrom;
        this.setState({
            noteFrom: f,
            noteTo: t,
            semitones: Distance.semitones(f, t),
            interval: Distance.interval(f, t)
        });
    };

    clear = () => {
        this.setState({
            noteFrom: '',
            noteTo: '',
            semitones: '',
            interval: ''
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <h1 className="App-title">Music Calculators</h1>
                </header>
                <div>
                    <div className={"c"}>
                        <div className={"i"}>
                            <input type="text" autoFocus={true} tabIndex={1} onChange={this.onNoteFromChange} value={this.state.noteFrom} placeholder={"C"} />
                            <label>note from</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={2} onChange={this.onSemitonesChange} value={this.state.semitones} placeholder={"4"} />
                            <label>semitones</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={3} onChange={this.onIntervalChange} value={this.state.interval} placeholder={"3m"} />
                            <label>interval</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={4} onChange={this.onNoteToChange} value={this.state.noteTo} placeholder={"Eb"} />
                            <label>note to</label>
                        </div>

                    </div>
                    <div className={"c"}>
                        <div>
                            <button onClick={this.swapNotes}>&#x21c6; swap notes</button>
                        </div>
                        <div>
                            <button onClick={this.clear}>clear</button>
                        </div>
                    </div>
                </div>
                <div id="help">
                    <div>
                        <div className={"help"}><span>a..g</span> : note from</div>
                        <div className={"help"}><span>Shift A..G</span> : note to</div>
                        <div className={"help"}><span>0..9</span> : interval (major or perfect)</div>
                        <div className={"help"}><span>Shift 0..9</span> : minor or diminished interval</div>
                        <div className={"help"}><span>Alt 0..9</span> : augmented interval</div>
                        <div className={"help"}><span>t T</span> : tritone</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
