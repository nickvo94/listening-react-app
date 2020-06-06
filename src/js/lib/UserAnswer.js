import React, { Component } from 'react';
import {Button, InputGroup, FormControl, Row, Badge} from 'react-bootstrap';
import stringSimilarity from 'string-similarity'
var scriptLine = ''
const initialState = {
    value: '',
    percent: 0,
    pass: false,
    resultOpc: 0,
    wordCount: 0,
    prog: 0

}

export default class UserAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        //this.scriptLine = this.setLine.bind(this);
        
    }

    componentDidMount(){
    }

    handleChange(event){
        
        var answer = event.target.value;
        var per = Math.round(stringSimilarity.compareTwoStrings(answer, scriptLine) * 100) 
        answer = answer.toLowerCase() //.match(/\w+/g);
        this.setState({
            value: answer,
            percent: per
        });
        if(per > 50)
        {
            this.setState({
                pass: true
            });
        }else{
            this.setState({
                pass: false
            });

        }
        console.log(answer)
        console.log(scriptLine)
        console.log(per)
    }

   setLine(text){
        scriptLine = text.toLowerCase() //.match(/\w+/g);
    }
    setWordCount(){
        var count = scriptLine.split(' ').length
        console.log('length: ' + count)
        this.setState({wordCount: count});

    }
    showResult(){this.setState({resultOpc: 1});}

    clear(){this.setState(initialState);}

    saveAnswer(){
        this.props.saveHandler(true, this.state.percent)
        this.showResult()
    }

    render(){
        return(
            <Row className="m-3">
                <div className="information">
                    <Badge pill variant="info" className="hint">Hint: {this.state.wordCount} Words </Badge> 
                    <Badge pill variant="info" className="match">Match : {this.state.percent} %</Badge>                  
                </div>
                
                <InputGroup className="m-3">
                    <FormControl
                    disabled={this.props.initial || this.props.save}
                    placeholder="User's Answer"
                    aria-label="User's Answer"
                    aria-describedby="basic-addon2"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    />
                    <InputGroup.Append>
                    <Button  disabled={!this.state.pass} onClick={() => this.saveAnswer()} variant="outline-secondary">Save</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Badge pill variant="primary" className="result" style={{opacity: this.state.resultOpc}}>Result: {scriptLine}</Badge>
                
            </Row>

        )

    }

}