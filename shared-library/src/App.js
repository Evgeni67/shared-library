import CalendarComponent from "./sharedComponents/calendarComponent/CalendarComponent";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <>
        <Container>
          <CalendarComponent
            events={[
              {
                day: "Tue Jun 01 2021 00:00:00 GMT+0500 (Pakistan Standard Time)",
                type: "green",
              },
            ]}
          />
        </Container>
      </>
    );
  }
}

export default App;
