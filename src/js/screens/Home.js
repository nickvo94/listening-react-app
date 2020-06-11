import React, { Component } from 'react'; 
import Video from './Video'
import { Grid, List, Fab, ListItem, ListItemText } from '@material-ui/core';
import {Row, Col, ListGroup} from 'react-bootstrap'
import {YOUTUBE_VARS} from '../../App'


export default class Home extends Component {
      
    watchVideo(video_id){
    this.props.history.push({pathname:'/video', state: {video_id: video_id}});
    } 
    componentWillMount() {
    console.log(YOUTUBE_VARS)
    this.fetchPlaylistData();
    }
    fetchPlaylistData = async () => {
    const response = await fetch(
        YOUTUBE_VARS.PLAYLIST_URL.part1 + YOUTUBE_VARS.PLAY_LISTS.LIST1.PLAYLIST_ID + 
        YOUTUBE_VARS.PLAYLIST_URL.part2 + YOUTUBE_VARS.PLAY_LISTS.LIST1.MAX_RESULT + 
        YOUTUBE_VARS.PLAYLIST_URL.part3 + YOUTUBE_VARS.API_KEY
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
