import {Component} from "react";
import React from "react";
import './NotePlusInterval.css';

class NotePlusInterval extends Component {

    render() {
        return (
            <div className="NotePlusInterval">
                <div>
                    from:
                    <div className="piano">
                        <div className="white-key note-c">C</div>
                        <div className="black-key note-cs">C#</div>
                        <div className="white-key note-d">D</div>
                        <div className="black-key note-ds">D#</div>
                        <div className="white-key note-e">E</div>
                        <div className="white-key note-f">F</div>
                        <div className="black-key note-fs">F#</div>
                        <div className="white-key note-g">G</div>
                        <div className="black-key note-gs">G#</div>
                        <div className="white-key note-a">A</div>
                        <div className="black-key note-as">A#</div>
                        <div className="white-key note-b">B</div>
                        <div className="white-key note-c2">C2</div>
                    </div>
                </div>
                <div class="intervals-wrapper">
                    {/*interval:*/}
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
                        <div className="interval-alteration interval-dim">dim</div>
                        <div className="interval-alteration interval-min">min</div>
                        <div className="interval-alteration interval-maj">Maj</div>
                        <div className="interval-alteration interval-aug">Aug</div>
                    </div>
                    {/*P5*/}
                </div>
                <div>
                    to:
                    <div className="piano">
                        <div className="white-key note-c">C</div>
                        <div className="black-key note-cs">C#</div>
                        <div className="white-key note-d">D</div>
                        <div className="black-key note-ds">D#</div>
                        <div className="white-key note-e">E</div>
                        <div className="white-key note-f">F</div>
                        <div className="black-key note-fs">F#</div>
                        <div className="white-key note-g">G</div>
                        <div className="black-key note-gs">G#</div>
                        <div className="white-key note-a">A</div>
                        <div className="black-key note-as">A#</div>
                        <div className="white-key note-b">B</div>
                        <div className="white-key note-c2">C2</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default NotePlusInterval;
