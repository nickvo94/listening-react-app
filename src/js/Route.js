    // Route.js
    import React, { Component } from 'react';
    //import {Platform} from 'react-native';
    // import components from react-native-router-flux
    //import {Router, Stack, Scene} from 'react-native-router-flux';
    import {
      BrowserRouter as Router,
      Switch,
      Route,
      Link
    } from 'react-router-dom';
    import {Navbar, Row} from 'react-bootstrap'
    // import our screens as components 
    import Home from './screens/Home';
    import WatchVideo from './screens/Video';
    export default class Routes extends Component {
      render() {
        return(
          <Router>
            
              <Navbar expand="true" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="/">Listening App</Navbar.Brand>
              </Navbar>
            

            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/video" render={props => <WatchVideo {...props} />} />
            </Switch>
          </Router>
          )
      }
    }