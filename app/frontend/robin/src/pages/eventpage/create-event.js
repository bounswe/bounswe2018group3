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
      <div className="container-event">
        <form className="form-event">
        
            <div className="row">
            <div className="col-lg-6 w-80">
            Name of the event:
            </div>
            <label>
            <input 
                className="col-10 col-md-8 col-lg-12 w-80"
                name="eventName"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          </div>
          <div className="row">
          <div className="col-lg-6">
            Enter info about the event:
            </div>
          <label>
            <div className="col-lg-6 event-in">
            <input
                name="eventInfo"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
                </div>
          </label>
          </div>
          <div className="row">
          <div className="col-lg-6">
            Artist of the event:
            </div>
          <label>

            <div className="col-lg-6 event-in">
            <input
                name="artistName"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
                </div>
          </label>
          </div>
          <div className="row">

              <div className="col-lg-6">
            Date of the event:
            </div>
          <label>
            <div className="col-lg-6 event-in">
            <input
                name="eventDate"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
                </div>
          </label>
          </div>
          <div className="row">

              <div className="col-lg-6">
            Time of the event:
            </div>
          <label>
            <div className="col-lg-6 event-in">
            <input
                name="eventTime"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
                </div>
          </label>
          </div>
          <div className="row">

              <div className="col-lg-6">
            Price of the event:
            </div>
          <label>
            <div className="col-lg-6 event-in">
            <input
                name="eventPrice"
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
                </div>
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
          <input type="button" className="btn btn-success float-right" value="Submit"/>
        </form>
        </div>
        </React.Fragment>
      );
    }
  }