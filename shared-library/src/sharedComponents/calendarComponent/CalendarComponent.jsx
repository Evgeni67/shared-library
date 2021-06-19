import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./CalendarComponent.css";
import { Container, Row, Col } from "react-bootstrap";
class CalendarComponent extends Component {
  state = {
    currentYear: 0,
    currentMonth: 0,
    allDaysInThePrevMonth: [],
    allDaysInTheMonth: [],
    allDaysInTheNextMonth: [],
    readyToRender: false,
    firstDay: 0,
    startArrayLenght: 0,
    endArrayLenght: 0,
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  updateCurrentMonth = async (index) => {
    this.setState({ currentMonth: this.state.currentMonth + index }, () => {});
  };
  changeCurrentMonth = async (prevOrNext) => {
    if (prevOrNext === 0) {
      if (this.state.currentMonth === 11) {
        await this.updateCurrentMonth(-11);
        this.setState({ currentYear: this.state.currentYear + 1 });
      } else {
        await this.updateCurrentMonth(1);
      }
    } else {
      if (this.state.currentMonth === 0) {
        await this.updateCurrentMonth(11);
        this.setState({ currentYear: this.state.currentYear - 1 });
      } else {
        await this.updateCurrentMonth(-1);
      }
    }
    this.setState({
      allDaysInTheMonth: await this.getDaysInMonth(
        this.state.currentMonth,
        this.state.currentYear
      ),
    });

    if (this.state.currentMonth === 0) {
      this.setState({
        allDaysInThePrevMonth: await this.getDaysInMonth(
          11,
          this.state.currentYear - 1
        ),
      });
    } else {
      this.setState({
        allDaysInThePrevMonth: await this.getDaysInMonth(
          this.state.currentMonth - 1,
          this.state.currentYear
        ),
      });
    }
    if (this.state.currentMonth === 11) {
      this.setState({
        allDaysInTheNextMonth: await this.getDaysInMonth(
          0,
          this.state.currentYear + 1
        ),
      });
    } else {
      this.setState({
        allDaysInTheNextMonth: await this.getDaysInMonth(
          this.state.currentMonth + 1,
          this.state.currentYear
        ),
      });
    }
    const firstDay = this.state.allDaysInTheMonth.filter(
      (day) => new Date(day.day).getDate() === 1
    );
    if (new Date(firstDay[0].day).getDay() === 1) {
      this.setState({ startArrayLenght: 0 });
    } else if (new Date(firstDay[0].day).getDay() === 2) {
      this.setState({ startArrayLenght: 1 });
    } else if (new Date(firstDay[0].day).getDay() === 3) {
      this.setState({ startArrayLenght: 2 });
    } else if (new Date(firstDay[0].day).getDay() === 4) {
      this.setState({ startArrayLenght: 3 });
    } else if (new Date(firstDay[0].day).getDay() === 5) {
      this.setState({ startArrayLenght: 4 });
    } else if (new Date(firstDay[0].day).getDay() === 6) {
      this.setState({ startArrayLenght: 5 });
    } else if (new Date(firstDay[0].day).getDay() === 0) {
      this.setState({ startArrayLenght: 6 });
    }
    const prevMonthLength = this.state.allDaysInThePrevMonth.length;
    this.setState({
      allDaysInThePrevMonth: this.state.allDaysInThePrevMonth.slice(
        prevMonthLength - this.state.startArrayLenght,
        prevMonthLength
      ),
    });
    this.setState({ firstDay: new Date(firstDay[0].day).getDay() });

    this.setState({
      endArrayLenght:
        42 -
        (this.state.allDaysInTheMonth.length + this.state.startArrayLenght),
    });
  };
  componentDidMount = async () => {
    //Getting the current year and month
    var today = new Date();
    this.setState({ currentYear: today.getFullYear() });
    this.setState({ currentMonth: today.getMonth() });

    // React does not guarantee that the state changes are
    // applied immediately so we pass the props to getDaysInMonth like this

    this.setState({
      allDaysInTheMonth: await this.getDaysInMonth(
        today.getMonth(),
        today.getFullYear()
      ),
    });
    if (today.getMonth() === 0) {
      this.setState({
        allDaysInThePrevMonth: await this.getDaysInMonth(
          11,
          today.getFullYear() - 1
        ),
      });
    } else {
      this.setState({
        allDaysInThePrevMonth: await this.getDaysInMonth(
          today.getMonth() - 1,
          today.getFullYear()
        ),
      });
    }
    if (today.getMonth() === 11) {
      this.setState({
        allDaysInTheNextMonth: await this.getDaysInMonth(
          0,
          today.getFullYear() + 1
        ),
      });
    } else {
      this.setState({
        allDaysInTheNextMonth: await this.getDaysInMonth(
          today.getMonth() + 1,
          today.getFullYear()
        ),
      });
    }

    // Get the day that the month starts from
    const firstDay = this.state.allDaysInTheMonth.filter(
      (day) => new Date(day.day).getDate() === 1
    );
    if (new Date(firstDay[0].day).getDay() === 1) {
      this.setState({ startArrayLenght: 0 });
    } else if (new Date(firstDay[0].day).getDay() === 2) {
      this.setState({ startArrayLenght: 1 });
    } else if (new Date(firstDay[0].day).getDay() === 3) {
      this.setState({ startArrayLenght: 2 });
    } else if (new Date(firstDay[0].day).getDay() === 4) {
      this.setState({ startArrayLenght: 3 });
    } else if (new Date(firstDay[0].day).getDay() === 5) {
      this.setState({ startArrayLenght: 4 });
    } else if (new Date(firstDay[0].day).getDay() === 6) {
      this.setState({ startArrayLenght: 5 });
    } else if (new Date(firstDay[0].day).getDay() === 0) {
      this.setState({ startArrayLenght: 6 });
    }
    const prevMonthLength = this.state.allDaysInThePrevMonth.length;
    this.setState({
      allDaysInThePrevMonth: this.state.allDaysInThePrevMonth.slice(
        prevMonthLength - this.state.startArrayLenght,
        prevMonthLength
      ),
    });
    this.setState({ firstDay: new Date(firstDay[0].day).getDay() }); // This number represents the day that the month starts at
    this.setState({
      endArrayLenght:
        42 -
        (this.state.allDaysInTheMonth.length + this.state.startArrayLenght),
    });
    this.setState({ readyToRender: true });
  }; 
  getDaysInMonth = async (month, year) => {
    // get the first day of the month
    var date = new Date(year, month, 1);
    var days = [];
    // while the day is not the last of the month push it
    // in the array and then increese its value
    while (date.getMonth() === month) {
      days.push({ day: new Date(date), reminders: [] });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  render() {
    return (
      <>
        <Container className="calendarContainer mt-2">
          <Row className="d-flex justify-content-center">
            {this.state.readyToRender ? (
              <p className="d-flex justify-content-center">
                {this.state.currentYear}{" "}
                {
                  this.state.monthNames[
                    new Date(this.state.allDaysInTheMonth[0].day).getMonth()
                  ]
                }
              </p>
            ) : (
              1
            )}
          </Row>
          <Row>
            <Col
              sm={6}
              className="d-flex justify-content-center"
              onClick={() => this.changeCurrentMonth(1)}
            >
              {" "}
              Prev
            </Col>{" "}
            <Col
              sm={6}
              className="d-flex justify-content-center"
              onClick={() => this.changeCurrentMonth(0)}
            >
              {" "}
              Next
            </Col>
          </Row>
          <Row>
            <Col className="date">Mon</Col>
            <Col className="date">Tue</Col>
            <Col className="date">Wed</Col>
            <Col className="date">Thu</Col>
            <Col className="date">Fri</Col>
            <Col className="date">Sat</Col>
            <Col className="date">Sun</Col>
            {this.state.readyToRender ? (
              <>
                {" "}
                {this.state.allDaysInThePrevMonth.map((day) => (
                  <Col className="dateFromPrevMonth">
                    {new Date(day.day).getDate()}
                  </Col>
                ))}
                {this.state.allDaysInTheMonth.map((day) => (
                  <>
                    <Col className="date">
                      <p className="dateP"> {new Date(day.day).getDate()} </p>
                      <table>
                        <tr></tr>
                        <tr className="evenets">
                          <td>o</td>
                          <td>o</td>
                          <td>o</td>
                          <td>o</td>
                        </tr>
                        <tr className="evenets">
                          <td>o</td>
                          <td>o</td>
                          <td>o</td>
                          <td>o</td>
                        </tr>
                      </table>
                    </Col>
                  </>
                ))}
                {this.state.allDaysInTheMonth
                  .slice(0, this.state.endArrayLenght)
                  .map((day) => (
                    <Col className="dateFromPrevMonth">
                      {new Date(day.day).getDate()}
                    </Col>
                  ))}
              </>
            ) : (
              <p> loading</p>
            )}
          </Row>
        </Container>
      </>
    );
  }
}
export default CalendarComponent;