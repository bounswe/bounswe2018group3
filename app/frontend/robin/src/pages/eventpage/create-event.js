import Event from "./event"
import Comment from "./comment"
import Navbar from "../components/navbar/index"
import React from 'react';
import "./createevent.css";


export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        numberOfGuests: 2
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleNameChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
  
    render() {
      return (
          <React.Fragment>
                    <div>
        <Navbar currentPath={this.props.location.pathname}/>
      </div>
      <div class="container-event">
        <form class="form-event">
            <div class="row-event">
            <label>
            Name of the event:
            <input
                name="eventName"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Enter info about the event:
            <input
                name="eventInfo"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Artist of the event:
            <input
                name="artistName"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Date of the event:
            <input
                name="eventDate"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Time of the event:
            <input
                name="eventTime"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Price of the event:
            <input
                name="eventPrice"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div class="row-event">
          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          </div>
          <br />
          <div class="row-event">
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
          </div>
        </form>
        </div>
        </React.Fragment>
      );
    }
  }