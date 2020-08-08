import React, {Component} from 'react';
import { Distance, Interval, Note } from "tonal";
// import logo from './logo.svg';
import './App.css';
import NotePlusInterval from "./NotePlusInterval";
// import KeyboardEventHandler from "react-keyboard-event-handler";

class App extends Component {

    state = {
        activeCalculator: 1,
        noteFrom: '',
        noteTo: '',
        semitones: '',
        interval: ''
    };

    /*  keypress vs keydown

        https://developer.mozilla.org/en-US/docs/Web/Events/keypress :

        The keypress event is fired when a key that produces a character value is pressed down.
        Examples of keys that produce a character value are alphabetic, numeric, and punctuation keys.
        Examples of keys that don't produce a character value are modifier keys such as Alt, Shift, Ctrl, or Meta.

        https://stackoverflow.com/questions/3396754/onkeypress-vs-onkeyup-and-onkeydown :

        To understand the difference between keydown and keypress, it is useful to distinguish between characters
        and keys. A key is a physical button on the computer's keyboard. A character is a symbol typed by pressing
        a button. On a US keyboard, hitting the 4 key while holding down the Shift key typically produces a "dollar sign"
        character. This is not necessarily the case on every keyboard in the world. In theory, the keydown and keyup
        events represent keys being pressed or released, while the keypress event represents a character being typed.
        In practice, this is not always the way it is implemented.

     */

    componentWillMount() {
        document.addEventListener('keydown', this.onKeyDown, false);
        // document.addEventListener('keyup', this.handleKeyboardEvent, false);
        // document.addEventListener('keypress', this.handleKeyboardEvent, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown, false);
        // document.removeEventListener('keyup', this.handleKeyboardEvent, false);
        // document.removeEventListener('keypress', this.handleKeyboardEvent, false);
    }

    onNoteFromChange = (event) => {
        console.log("onNoteFromChange");
        this.setFromNote(event.target.value);
    };

    onNoteToChange = (event) => {
        this.setToNote(event.target.value);
    };

    onSemitonesChange = (event) => {
        let n = 0;
        if (event.target.value.trim()) {
            n = Number.parseInt(event.target.value, 10);
            if (Number.isNaN(n)) {
                return;
            }
        }
        this.setSemitones(n);
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

        if (n === 0) return;    // interval "0" does not exist

        let alt;
        if ([1, 4, 5, 8].includes(n)) { // TODO: use modulo to check for all values
            alt = 0;
        } else if ([2, 3, 6, 7].includes(n)) {  // TODO: use modulo to check for all values
            alt = 0;
        }

        let i = Interval.build({ num: n, alt: alt });
        // console.log('i', i);

        this.setInterval(i);

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

/*
    onKey = (key) => {
        console.log(`onKey`, key);
        switch(key) {
            case
        }
    };
*/

    setFromNote = (note) => {

        if (note === null) return;

        if (note.trim() === '') {
            this.setState({
                noteFrom: ''
            });
        }

        let n = Note.name(note);

        if (n === null) return;

        //TODO: if interval or semitones not null, then re-compute noteTo

        if (this.state.semitones) {
            this.setState({
                noteFrom: n,
                noteTo: Distance.transpose(n, Interval.fromSemitones(this.state.semitones))
            });
        } else if (this.state.noteTo) {
            this.setState({
                noteFrom: n,
                semitones: Distance.semitones(n, this.state.noteTo),
                interval: Distance.interval(n, this.state.noteTo)
            });
        } else {
            this.setState({noteFrom: n});
        }
    };

    setToNote = (note) => {

        if (note === null) return;

        if (note.trim() === '') {
            this.setState({
                noteTo: ''
            });
        }

        let n = Note.name(note);

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

    /**
     *
     * @param semitones Number
     */
    setSemitones = (semitones) => {
        if (this.state.noteFrom) {
            let i = Interval.fromSemitones(semitones);
            this.setState({
                noteTo: Distance.transpose(this.state.noteFrom, i),
                semitones: semitones,
                interval: i
            });
        } else {
            this.setState({semitones: semitones});
        }
    };


    /**
     *
     * @param semitones Number
     */
    setInterval = (interval) => {
        if (this.state.noteFrom) {
            // let i = Interval.fromSemitones(semitones);
            this.setState({
                noteTo: Distance.transpose(this.state.noteFrom, interval),
                semitones: Interval.semitones(interval),
                interval: interval
            });
        } else {
            this.setState({interval: interval});
        }
    };

    onKeyDown = (event) => {

        console.log("onKeyDown", event.key, event.keyCode, event.which, event.target, event);

        if (event.keyCode === 27) { // ESC
            event.target.blur();
            // document.body.focus();

            //TODO: if focus not on input element, place it on focus element --> toggleFocus
            return;
        }

        // PageDown
        if (event.keyCode === 33) {
            let i = (this.state.activeCalculator - 1) % 3;
            if (i < 0) i = 2;
            this.setState({activeCalculator: i})
            return;
        }

        // PageDown
        if (event.keyCode === 34) {
            this.setState({activeCalculator: (this.state.activeCalculator + 1) % 3})
            return;
        }

        if (event.target.tagName.toLowerCase() === 'input') {
            console.log("ignore keyboard event on input tag");
            return;
        }

        // Backspace
        if (event.keyCode === 8 && event.ctrlKey) {
            console.log("clear");
            this.clear();
            return;
        }

        // TODO:
        // T    84
        // #    51
        // Ctrl-DEL : clear
        // Ctrl-S : swap notes

        // a..g 65..71
        if (!event.shiftKey && ((event.keyCode >= 65) && (event.keyCode <= 71))) {
            this.setFromNote(event.key);
        }

        // A..G 97..103
        if (event.shiftKey && ((event.keyCode >= 65) && (event.keyCode <= 71))) {
            this.setToNote(event.key);
        }

        // 0..9 48..57
        // if ((event.keyCode >= 48) && (event.keyCode <= 57)) {
        //     this.setSemitones(Number.parseInt(event.key, 10));   //TODO: check if not NaN
        // }
        // 0..9 48..57
        if ((event.keyCode >= 48) && (event.keyCode <= 57)) {
            let alt = 0;                                        // FIXME: see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            if (event.shiftKey) alt++;
            if (event.altKey) alt--;
            console.log(`set interval ${event.key} ${alt}`);
            this.setInterval(Interval.build({ num: Number.parseInt(event.key, 10), alt: alt }));   //TODO: check if not NaN
        }

        // +
        if (event.key === '+') {
            let n = Number.parseInt(this.state.semitones, 10);
            if (Number.isNaN(n)) {
                n = 0;
            }
            this.setSemitones(n + 1);
        }

        // -
        if (event.key === '-') {
            // console.log(`minus ${event.key}`);
            let n = Number.parseInt(this.state.semitones, 10);
            if (Number.isNaN(n)) {
                n = 0;
            }
            this.setSemitones(n - 1);
        }

    };

/*
    handleKeyboardEvent = (event) => {

        //TODO: tab key to select active calculator

        console.log("handleKeyboardEvent", event.key, event.keyCode, event.which, event);

        if (event.target.tagName.toLowerCase() === 'input') {
            console.log("ignore keyboard event on input tag");
            return;
        }

        // TODO:
        // T    84
        // #    51
        // Ctrl-DEL : clear
        // Ctrl-S : swap notes

        // A..G 97..103
        if ((event.keyCode >= 65) && (event.keyCode <= 71)) {
            this.setToNote(event.key);
        }
        // a..g 65..71
        if ((event.keyCode >= 97) && (event.keyCode <= 103)) {
            this.setFromNote(event.key);
        }

        // 0..9 48..57
        // if ((event.keyCode >= 48) && (event.keyCode <= 57)) {
        //     this.setSemitones(Number.parseInt(event.key, 10));   //TODO: check if not NaN
        // }
        // 0..9 48..57
        if ((event.keyCode >= 48) && (event.keyCode <= 57)) {
            let alt = 0;                                        // FIXME: see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            if (event.shiftKey) alt++;
            if (event.altKey) alt--;
            console.log(`set interval ${event.key} ${alt}`);
            this.setInterval(Interval.build({ num: Number.parseInt(event.key, 10), alt: alt }));   //TODO: check if not NaN
        }

        // + 43
        if (event.keyCode === 43) {
            let n = Number.parseInt(this.state.semitones, 10);
            if (Number.isNaN(n)) {
                n = 0;
            }
            this.setSemitones(n + 1);
        }

        // - 45
        if (event.keyCode === 45) {
            // console.log(`minus ${event.key}`);
            let n = Number.parseInt(this.state.semitones, 10);
            if (Number.isNaN(n)) {
                n = 0;
            }
            this.setSemitones(n - 1);
        }

        // if (e.ctrlKey && e.which === 87) {
        //     this.props.toggleWebcamModal()
        // } else if (e.ctrlKey & e.which === 83) {
        //     this.props.openSaveModal()
        // } else if (e.ctrlKey && e.shiftKey && e.which === 68) {
        //     this.handleClear()
        // }
    };
*/

    render() {
        return (
            <div className="App">
{/*
                <KeyboardEventHandler handleKeys={
                    ['a', 'b', 'c', 'd', 'e', 'f', 'g',
                        'shift+a', 'shift+b', 'shift+c', 'shift+d', 'shift+e', 'shift+f', 'shift+g',
                        'numeric']
                } onKeyEvent={this.onKey}
                />
*/}
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}
                    <h1 className="App-title">Music Calculators</h1>
                </header>

                <div className={this.state.activeCalculator === 0 ? 'calculator active' : 'calculator'}>
                    <div className={"c"}>
                        <div className={"i"}>
                            <input type="text"  tabIndex={1} onChange={this.onNoteFromChange} value={this.state.noteFrom} placeholder={"C"} />
                            <label>note</label>
                        </div>

                        {/*autoFocus={true}*/}

                        <div className={"op"}>
                            <div>+</div>
                            <label>&nbsp;</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={3} onChange={this.onIntervalChange} value={this.state.interval} placeholder={"3m"} />
                            <label>interval</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={2} onChange={this.onSemitonesChange} value={this.state.semitones} placeholder={"4"} />
                            <label>semitones</label>
                        </div>

                        <div className={"op"}>
                            <div>=</div>
                            <label>&nbsp;</label>
                        </div>

                        <div className={"i"}>
                            <input type="text" tabIndex={4} onChange={this.onNoteToChange} value={this.state.noteTo} placeholder={"Eb"} />
                            <label>note</label>
                        </div>

                    </div>
                    <div className={"c"}>
                        <div>
                            <button onClick={this.swapNotes}>&#x21c6; swap notes</button>
                        </div>
                        <div>
                            <button onClick={this.clear}>clear</button>
                        </div>
                        {/* TODO: invert */}
                        {/* TODO: transpose */}
                    </div>
                </div>

                <div className={this.state.activeCalculator === 1 ? 'calculator active' : 'calculator'}>
                    <div className={"c"}>
                        <div className={"i"}>
                            <input type="text" placeholder={"3M"} />
                            <label>interval</label>
                        </div>
                        <div className={"op"}>
                            <div>+</div>
                            <label>&nbsp;</label>
                        </div>
                        <div className={"i"}>
                            <input type="text" placeholder={"5P"} />
                            <label>interval</label>
                        </div>
                        <div className={"op"}>
                            <div>=</div>
                            <label>&nbsp;</label>
                        </div>
                        <div className={"i"}>
                            <input type="text" />
                            <label>interval</label>
                        </div>
                    </div>
                    <div className={"c"}>
                        <div>
                            <button>clear</button>
                        </div>
                    </div>
                </div>

                <div className={this.state.activeCalculator === 2 ? 'calculator active' : 'calculator'}>
                    <div className={"c"}>
                        <div className={"i"}>
                            <input type="text" placeholder={"3M"} />
                            <label>interval</label>
                        </div>
                        <div className={"op"}>
                            <div>-</div>
                            <label>&nbsp;</label>
                        </div>
                        <div className={"i"}>
                            <input type="text" placeholder={"5P"} />
                            <label>interval</label>
                        </div>
                        <div className={"op"}>
                            <div>=</div>
                            <label>&nbsp;</label>
                        </div>
                        <div className={"i"}>
                            <input type="text" />
                            <label>interval</label>
                        </div>
                    </div>
                    <div className={"c"}>
                        <div>
                            <button>clear</button>
                        </div>
                    </div>
                </div>

                <div id="help">
                    <div>
                        <div className={"help"}><span>a..g</span> : note from</div>
                        <div className={"help"}><span>A..G</span> : note to</div>
                        <div className={"help"}><span>0..9</span> : interval (major or perfect)</div>
                        <div className={"help"}><span>Shift 0..9</span> : minor or diminished interval</div>
                        <div className={"help"}><span>Alt 0..9</span> : augmented interval</div>
                        <div className={"help"}><span>t T</span> : tritone</div>
                    </div>
                </div>

{/*
                <div>
                    <h3>experimental:</h3>
                    <NotePlusInterval/>
                </div>
*/}

            </div>
        );
    }
}

export default App;
