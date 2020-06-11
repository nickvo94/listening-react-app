import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from 'react-bootstrap/Container'
import Routes from './js/Route';
import './css/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-slider/dist/css/bootstrap-slider.css"

export default class App extends Component {
  render() {
    return (
      <Container>
        <Routes/>
      </Container>
    );
  }
}

export const YOUTUBE_VARS = {
  API_KEY : "AIzaSyB6Yp5ERdjG0XO5x0yYm489n9is4odm6v4",
  PLAYLIST_URL: {
    part1: 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=', 
    part2: '&maxResults=',
    part3: '&part=snippet%2CcontentDetails&captions?&key='

  },
  VIDEO_URL: {
    part1: 'https://www.googleapis.com/youtube/v3/captions?videoId=', 
    part2: '&part=snippet&key='
  },
  CAPTION_URL: {
      part1: 'https://video.google.com/timedtext?lang=', 
      part2: '&v='
  },
  PLAY_LISTS : {
    LIST1: {
      MAX_RESULT: 15, 
      PLAYLIST_ID: "PL5A4nPQbUF8ClpIml-vRT9-z_ReCaOHMb",

    }
  }
} 
/* const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
 */
