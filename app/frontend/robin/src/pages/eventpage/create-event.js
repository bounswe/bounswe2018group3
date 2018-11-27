import Event from "./event"
import Comment from "./comment"
import Navbar from "../components/navbar/index"
import React from 'react';
import "./create-event.css";


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
                    <div className="mb-70">
        <Navbar currentPath={this.props.location.pathname}/>
      </div>
        <form>
            <label>
            Name of the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Enter info about the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Artist of the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Date of the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Time of the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Price of the event:
            <input
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleNameChange}/>
          </label>
          <label>
            Is going:
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.isGoing}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={this.state.numberOfGuests}
              onChange={this.handleInputChange} />
          </label>
        </form>
        </React.Fragment>
      );
    }
  }