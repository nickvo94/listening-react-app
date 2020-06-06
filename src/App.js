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
/* const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
 */
