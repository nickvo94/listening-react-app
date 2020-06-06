import React, { Component } from 'react';
import {Row, ProgressBar } from 'react-bootstrap';

const initialProgress = {now: 0, score: 0, max: 0}

export default class Progress extends Component{
    constructor(props) {
        super(props);
        this.state = initialProgress;
    }
    setProgress(progress, scriptlen){
        var prog = progress/scriptlen * 100;
        console.log(prog)
        this.setState({now: prog})
    }
    setMaxScore(progahead){
        var mx = progahead * 10
        this.setState({max: mx})
    }
    setScore(match){
        var newscore = Math.round(match/10) 
        this.setState({score: this.state.score + newscore })

    }
    render(){
        return(
            <div>
            <ProgressBar animated now={this.state.now} />
            <h4>Score: {this.state.score} / {this.state.max}</h4>
            </div>

        )
    }
}