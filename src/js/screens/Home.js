import React, { Component } from 'react'; 
//import { StyleSheet, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import Video from './Video'
import { Grid, List, Fab, ListItem, ListItemText } from '@material-ui/core';
import {Row, Col, ListGroup} from 'react-bootstrap'

//import {Actions} from 'react-native-router-flux';

const MAX_RESULT = 15; 
const PLAYLIST_ID = "PL5A4nPQbUF8ClpIml-vRT9-z_ReCaOHMb"; 
const API_KEY = "AIzaSyB6Yp5ERdjG0XO5x0yYm489n9is4odm6v4";
const PLAYLIST_URL = {
    part1: 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=', 
    part2: '&maxResults=',
    part3: '&part=snippet%2CcontentDetails&captions?&key='

}

export default class Home extends Component {
      
    watchVideo(video_id){
    //Actions.watchvideo({video_url: video_url});

    this.props.history.push({pathname:'/video', state: {video_id: video_id}});
    } 
    componentWillMount() {
    this.fetchPlaylistData();
    }
    fetchPlaylistData = async () => {
    const response = await fetch(
        PLAYLIST_URL.part1 + PLAYLIST_ID + 
        PLAYLIST_URL.part2 + MAX_RESULT + 
        PLAYLIST_URL.part3 + API_KEY
    );
    const json = await response.json();
    this.setState({ videos: json['items']});
    console.log(this.state.videos)
    };
    constructor(props) {
    super(props);
    this.state = {
        videos: [],
    }
    }
    render() {
    const videos = this.state.videos;
    
    return (
        <Row>
            <Col>
                <ListGroup as="ul">
                    {videos.length ? videos.map(
                        (item) => 
                        (<ListGroup.Item
                            key={item.id}
                            onClick={() => this.watchVideo(item.contentDetails.videoId)}
                        >{ item.snippet.title }</ListGroup.Item>)
                    ) : ''
                    
                    }
                </ListGroup>
            </Col>
        </Row>
        
    );
    }
}
/* const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: '#fff'
    },
    demacate: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    borderRadius:10
    },
    item: {
    padding: 10,
    fontSize: 12,
    height: 44,
    },
}); */