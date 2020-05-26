// screens/Video.js
import React, { Component } from 'react';
//import { StyleSheet, SafeAreaView, View} from 'react-native';
//import { Player } from 'video-react';
import ReactPlayer from 'react-player'
import { Grid, CardMedia } from '@material-ui/core';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';
import Transcript from '../lib/Transcript'

const playTextObj = {true: 'Play', false: 'Pause'};

export default class WatchVideo extends Component {

/*     home(){
    Actions.home();
    }
 */
    constructor(props) {
        super(props);
        this.state = {
            play: true, 
            playText: playTextObj.false
        }
        this.player = React.createRef();
        this.transcript = new Transcript(this.props.location.state.video_id);
        console.log(this.props);
    }
    componentWillMount() {
        this.transcript.fetchTranscriptData();
    }
    handleOnPlay(){
        this.setState({
            playText: playTextObj[this.state.play] , 
            play: !this.state.play,
        })
    }
    render() {
    return (
        <Row>
            <Col>
            <div className='overlay'>
                <ReactPlayer
                    ref={this.player}
                    url={'https://www.youtube.com/embed/'+ 
                    this.props.location.state.video_id+'?start=2s'}  
                    className='react-player' 
                    playing={this.state.play}
                    onStart={() => this.handleOnPlay()}
                    
                />
            </div> 

            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" 
                    onClick={() => this.handleOnPlay()}>
                    {this.state.playText}
                </Button>
                <Button variant="secondary">Back</Button>
            </ButtonGroup>
            
            </Col>
        </Row>
    );
    }
}
/* const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: '#fff'
    }
}); */