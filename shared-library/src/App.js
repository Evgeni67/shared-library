import CalendarComponent from "./sharedComponents/calendarComponent/CalendarComponent";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import {
  Container
} from "react-bootstrap";

class App extends Component {
 
  render() {
    return (
      <>
          <Container>
            <CalendarComponent />
          </Container>
      </>
    );
  }
}

export default App;
