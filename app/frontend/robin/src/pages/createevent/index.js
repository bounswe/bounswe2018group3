import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';


export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        eventName: "",
        eventInfo: "",
        artistName: "",
        eventDate: "",
        eventTime: "",
        eventPrice: "",
        isGoing: true,
        numberOfGuests: 2,
        submitClicked: false,
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleErrorMessage = this.handleErrorMessage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkError = this.checkError.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleCheckboxChange(){
      this.setState({isGoing: !this.state.isGoing})
    }

    handleNameChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        console.log(this.state)
    }

    handleSubmit(){
      this.setState({submitClicked: true});
      if(this.checkError()){
        Cookies.set("eventName", this.state.eventName);
        Cookies.set("eventInfo", this.state.eventInfo);
        Cookies.set("eventDate", this.state.eventDate);
        Cookies.set("eventTime", this.state.eventTime);
        Cookies.set("eventPrice", this.state.eventPrice);
        Cookies.set("numberOfGuests", this.state.numberOfGuests);
      }
      else
        return;
    }

    checkError(){
      if(this.state.eventName === "" || this.state.eventDate === "" || this.state.eventTime === ""){
        return false;
      }
      else return true;
    }

    handleErrorMessage(){
      if(this.state.submitClicked){
        if(this.state.eventName === ""){
          return(
            <div className="text-danger text-center ">
              Event name cannot be empty
            </div>
          );
        }
        else if(this.state.eventDate === ""){
          return(
            <div className="text-danger text-center ">
              Event date cannot be empty
            </div>
          );
        }
        else if(this.state.eventTime === ""){
          return(
            <div className="text-danger text-center ">
              Event time cannot be empty
            </div>
          );
        }
      }
      return;
    }
  
    render() {
      return (
        <React.Fragment>
          <div>
            <Navbar currentPath={this.props.location.pathname}/>
          </div>
          <div className="container-event col-xs-12 col-sm-10 col-md-6">
            <h2 className="text-center">Create an Event</h2>
            <form className="form-event">
            <div className="row">
                <div className="col-lg-6">
                  Name of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventName"
                      type="text"
                      value={this.state.eventName}
                      placeholder="Name"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Info about the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventInfo"
                      type="text"
                      value={this.state.eventInfo}
                      placeholder="Info"
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
                      value={this.state.artistName}
                      placeholder="Artist"
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
                      value={this.state.eventDate}
                      placeholder="Date"
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
                      value={this.state.eventTime}
                      placeholder="Time"
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
                      value={this.state.eventPrice}
                      placeholder="Price"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              
              <div className="row">
                <div className="col-lg-6">
                  Number of guests:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="eventPrice"
                      type="number"
                      value={this.state.numberOfGuests}
                      onChange={this.handleInputChange}/>
                  </div>
                </label>
              </div>
              <br />
              <div class="row-event">
                <label>
                  Is going:
                  <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleCheckboxChange} />
                </label>
              </div>
              {this.handleErrorMessage()}
              <div className="row">
                <div className="col-xs-2 mx-auto">
                  <button type="button" className="btn btn-success mx-auto" onClick={this.handleSubmit}>Create</button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );
    }
  }