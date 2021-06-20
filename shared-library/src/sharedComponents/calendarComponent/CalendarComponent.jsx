import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./CalendarComponent.css";
import { Container, Row, Col } from "react-bootstrap";
import { ImArrowRight } from "react-icons/im";
import { ImArrowLeft } from "react-icons/im";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle as HiMinusCircle } from "react-icons/ai";

class CalendarComponent extends Component {
  state = {
    greenEvents: [],
    redEvents: [],
    orangeEvents: [],
    notes: [], // Coming soon
    seeNotes: false,
    isDateSelected: false,
    dateSelected: {},
    today: new Date(),
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
  selectDate = async (date) => {
    this.setState({ isDateSelected: true });
    this.setState({ dateSelected: date });
  };
  componentDidMount = async () => {
    //load props in state
    if(this.props.events !== undefined){
      let greenEventsFromProps1 = this.props.events.filter(
        (event) => event.type === "green"
      );
      let greenEventsFromProps = [];
  
      if (greenEventsFromProps1.length > 0) {
        greenEventsFromProps1.forEach((event) =>
          greenEventsFromProps.push(event.day)
        );
      }
  
      let orangeEventsFromProps1 = this.props.events.filter(
        (event) => event.type === "orange"
      );
      let orangeEventsFromProps = [];
  
      if (orangeEventsFromProps1.length > 0) {
        orangeEventsFromProps1.forEach((event) =>
          orangeEventsFromProps.push(event.day)
        );
      }
  
      let redEventsFromProps = [];
      let redEventsFromProps1 = this.props.events.filter(
        (event) => event.type === "orange"
      );
  
      if (redEventsFromProps1.length > 0) {
        redEventsFromProps1.forEach((event) =>
          redEventsFromProps.push(event.day)
        );
      }
  
      this.setState({ orangeEvents: orangeEventsFromProps });
      this.setState({ redEvents: redEventsFromProps });
      this.setState({ greenEvents: greenEventsFromProps });
    }
    
    var today = new Date();
    this.setState({ currentYear: today.getFullYear() });
    this.setState({ currentMonth: today.getMonth() });

  
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

  reduceGreenEvents = async () => {
    var greenEventsNew = this.state.greenEvents;
    if (
      greenEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 0
    ) {
    } else {
      //custom remove at
      for (let i = 0; i < greenEventsNew.length; i++) {
        if (
          new Date(greenEventsNew[i]).getTime() ===
          this.state.dateSelected.getTime()
        ) {
          greenEventsNew.splice(i, 1);
          i = greenEventsNew.length;
        }
      }
      this.setState({ greenEvents: greenEventsNew });
    }
  };
  reduceOrangeEvents = async () => {
    var orangeEventsNew = this.state.orangeEvents;
    if (
      orangeEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 0
    ) {
    } else {
      //custom remove at
      for (let i = 0; i < orangeEventsNew.length; i++) {
        if (
          new Date(orangeEventsNew[i]).getTime() ===
          this.state.dateSelected.getTime()
        ) {
          orangeEventsNew.splice(i, 1);
          i = orangeEventsNew.length;
        }
      }
      this.setState({ orangeEvents: orangeEventsNew });
    }
  };
  reduceRedEvents = async () => {
    var redEventsNew = this.state.redEvents;
    if (
      redEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 0
    ) {
    } else {
      //custom remove at
      for (let i = 0; i < redEventsNew.length; i++) {
        if (
          new Date(redEventsNew[i]).getTime() ===
          this.state.dateSelected.getTime()
        ) {
          redEventsNew.splice(i, 1);
          i = redEventsNew.length;
        }
      }
      this.setState({ redEvents: redEventsNew });
    }
  };
  saveInRedEvents = async () => {
    const redEventsNew = this.state.redEvents;
    if (
      redEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 3
    ) {
      window.alert("Max 3 per type");
    } else {
      redEventsNew.push(new Date(this.state.dateSelected).getTime());
      this.setState({ redEvents: redEventsNew });
    }
  };
  saveInOrangeEvents = async () => {
    const orangeEventsNew = this.state.orangeEvents;
    if (
      orangeEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 3
    ) {
      window.alert("Max 3 per type");
    } else {
      orangeEventsNew.push(new Date(this.state.dateSelected).getTime());
      this.setState({ orangeEvents: orangeEventsNew });
    }
  };
  saveInGreenEvents = async () => {
    const greenEventsNew = this.state.greenEvents;
    if (
      greenEventsNew.filter(
        (date) => new Date(date).getTime() === this.state.dateSelected.getTime()
      ).length === 3
    ) {
      window.alert("Max 3 per type");
    } else {
      greenEventsNew.push(new Date(this.state.dateSelected).getTime());
      this.setState({ greenEvents: greenEventsNew });
    }
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
        <Container className="calendarContainer mt-2 noselect">
          <h5 className="calendarText d-flex justify-content-center">
            Calendar
          </h5>
          <Row className="d-flex justify-content-center"></Row>
          <Row className="monthYearRow ">
            <Col
              sm={2}
              className="d-flex justify-content-center "
              onClick={() => this.changeCurrentMonth(1)}
            >
              {" "}
              <ImArrowLeft className="arrow" />
            </Col>{" "}
            <Col sm={8} className="d-flex justify-content-center ">
              {" "}
              {this.state.readyToRender ? (
                <p className="yearMonth d-flex justify-content-center">
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
            </Col>
            <Col
              sm={2}
              className="d-flex justify-content-center "
              onClick={() => this.changeCurrentMonth(0)}
            >
              {" "}
              <ImArrowRight className="arrow" />
            </Col>
          </Row>
          <Row className="">
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
                  <Col className="dateFromPrevMonth ">
                    {new Date(day.day).getDate()}
                  </Col>
                ))}
                {this.state.allDaysInTheMonth.map((day) => (
                  <>
                    <Col
                      className={
                        new Date(day.day).getDate() ===
                          this.state.today.getDate() &&
                        new Date(day.day).getMonth() ===
                          this.state.today.getMonth() &&
                        new Date(day.day).getYear() ===
                          this.state.today.getYear()
                          ? "dateToday "
                          : "date "
                      }
                      onClick={() => this.selectDate(day.day)}
                    >
                      <p className="dateP"> {new Date(day.day).getDate()} </p>
                      <table className="mt-1">
                        <tr></tr>
                        <tr className="evenets">
                          {this.state.redEvents
                            .filter(
                              (event) =>
                                new Date(event).getTime() ===
                                new Date(day.day).getTime()
                            )
                            .map((event) => (
                              <td className="eventDot">🔴</td>
                            ))}
                        </tr>
                        <tr className="evenets">
                          {this.state.orangeEvents
                            .filter(
                              (event) =>
                                new Date(event).getTime() ===
                                new Date(day.day).getTime()
                            )
                            .map((event) => (
                              <td className="eventDot">🟠</td>
                            ))}
                        </tr>
                        <tr className="evenets">
                          {this.state.greenEvents
                            .filter(
                              (event) =>
                                new Date(event).getTime() ===
                                new Date(day.day).getTime()
                            )
                            .map((event) => (
                              <td className="eventDot">🟢</td>
                            ))}
                        </tr>
                        <tr className="evenets"></tr>
                      </table>
                    </Col>
                  </>
                ))}
                {this.state.allDaysInTheMonth
                  .slice(0, this.state.endArrayLenght)
                  .map((day) => (
                    <Col className="dateFromNextMonth ">
                      {new Date(day.day).getDate()}
                    </Col>
                  ))}
              </>
            ) : (
              <p> loading</p>
            )}
          </Row>
          {this.state.isDateSelected ? (
            <>
              {" "}
              <Row className="mt-4">
                <Col className="addDot d-flex justify-content-center">
                  <HiMinusCircle
                    className="minus"
                    onClick={() => this.reduceRedEvents()}
                  />{" "}
                  <text className="redDot"> 🔴 </text>
                  <BsFillPlusCircleFill
                    className="plus"
                    onClick={() => this.saveInRedEvents()}
                  />
                </Col>
                <Col className="addDot d-flex justify-content-center">
                  <HiMinusCircle
                    className="minus"
                    onClick={() => this.reduceOrangeEvents()}
                  />{" "}
                  <text className="redDot"> 🟠 </text>
                  <BsFillPlusCircleFill
                    className="plus"
                    onClick={() => this.saveInOrangeEvents()}
                  />
                </Col>
                <Col className="addDot d-flex justify-content-center">
                  <HiMinusCircle
                    className="minus"
                    onClick={() => this.reduceGreenEvents()}
                  />{" "}
                  <text className="redDot"> 🟢 </text>
                  <BsFillPlusCircleFill
                    className="plus"
                    onClick={() => this.saveInGreenEvents()}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <h5 className="d-flex justify-content-center mt-5 ">
              Select a date{" "}
            </h5>
          )}
        </Container>
      </>
    );
  }
}
export default CalendarComponent;
