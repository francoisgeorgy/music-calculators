import {Component} from "react";
import React from "react";
import './NotePlusInterval.css';

class NotePlusInterval extends Component {

    state = {
        noteFrom: '',
        noteTo: '',
        semitones: '',
        interval: ''
    };

    onClickNoteFrom = (note) => {
        console.log(note);
        this.setState({noteFrom: note});
    };

    onClickNoteTo = (note) => {
        console.log(note);
        this.setState({noteTo: note})
    };

    render() {

        let whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
        let blackKeysFlats =  ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
        let blackKeysSharps = ['C#', 'D#', 'F#', 'G#', 'A#'];

        return (
            <div className="NotePlusInterval">
                <div>
                    from:
                    <div className="piano">
                        {whiteKeys.map(
                            (v, i) => <div key={i} className={`white-key note-${v.toLowerCase()} ${v === this.state.noteFrom ? 'sel' : ''}`} onClick={() => this.onClickNoteFrom(v)}>{v}</div>
                        )}
                        {blackKeysFlats.map(
                            (v, i) => <div key={i} className={`black-key note-${v.toLowerCase()} ${v === this.state.noteFrom ? 'sel' : ''}`} onClick={() => this.onClickNoteFrom(v)}>{v}</div>
                        )}
                    </div>
                </div>
                <div className="intervals-wrapper">
                    <div className="intervals">
                        <div className="interval interval-1">1</div>
                        <div className="interval interval-2">2</div>
                        <div className="interval interval-3">3</div>
                        <div className="interval interval-4">4</div>
                        <div className="interval interval-5">5</div>
                        <div className="interval interval-6">6</div>
                        <div className="interval interval-7">7</div>
                        <div className="interval interval-8">8</div>
                    </div>
                    <div className="interval-alterations">
                        <div className="interval-alteration interval-down">&#9650;</div>
                        <div className="interval-alteration interval-dim">dim</div>
                        <div className="interval-alteration interval-min">min</div>
                        <div className="interval-alteration interval-maj">Maj</div>
                        <div className="interval-alteration interval-aug">Aug</div>
                        <div className="interval-alteration interval-up">&#9660;</div>
                    </div>
                    {/*P5*/}
                </div>
                <div>
                    to:
                    <div className="piano">
                        {whiteKeys.map(
                            (v, i) => <div key={i} className={`white-key note-${v.toLowerCase()} ${v === this.state.noteTo ? 'sel' : ''}`} onClick={() => this.onClickNoteTo(v)}>{v}</div>
                        )}
                        {blackKeysFlats.map(
                            (v, i) => <div key={i} className={`black-key note-${v.toLowerCase()} ${v === this.state.noteTo ? 'sel' : ''}`} onClick={() => this.onClickNoteTo(v)}>{v}</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export default NotePlusInterval;
