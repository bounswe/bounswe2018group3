import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';

import { Link, Redirect } from "react-router-dom";

import axios from 'axios';
import { push } from 'react-router-redux';

import { EVENT_URL, USERS_URL, EVENT_IMAGES_URL , TAGS_URL} from "../constants/backend-urls";

export default class CreateEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: "",
        name: "",
        info: "",
        artistName: "",
        date: "",
        time: "",
        price: "",
        location: "",
        photo: {},
        creator: {},
        isGoing: true,
        numberOfGuests: 2,
        submitClicked: false,
        existingTagsInDB: [],
        existingTags: [],
        nonexistingTags: [],
        tags: "",
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleErrorMessage = this.handleErrorMessage.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
      this.checkError = this.checkError.bind(this);
      this.getUser = this.getUser.bind(this);
      this.uploadPhotoHandler = this.uploadPhotoHandler.bind(this);
      this.photoHandler = this.photoHandler.bind(this);
    }

    async componentDidMount(){
      this.setState({creator: this.getUser(Cookies.get("userid"))})
      var headers= {
        "Content-Type": "application/json",
        //"Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        url: TAGS_URL ,
        headers: headers,
      };
      await axios(options).then(async response => {
        console.log("tags");
        console.log(response);
        if(response.status === 200){
          this.setState({
            existingTagsInDB: response.data,
          })
        }
      })

      // At this point, we have all the tags in the database stored in this.state.existingTagsInDB
      var tagsArray = this.state.tags.split(",");
      console.log(tagsArray);

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
          [name]: value,
        });
    }

    getUser(e){
      var data = {
        // TODO: Change here according to API
        //id: Cookies.get("clickedEvent")
      };
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        // TODO: Update search url page.
        url: USERS_URL + e,
        //data: data,
        headers: headers,
      };
      axios(options).then(response => {
        if(response.status === 200){
          var resp = response.data;
          this.setState({creator: resp});
          return resp.username;
        }
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    

    }

    async handleCreate(e){
      var tag_ids = [];
      var id;
      this.setState({submitClicked: true});
      var headers= {
        //"Content-Type": "multipart/form-data;boundary",
        "Authorization" : "JWT " + Cookies.get("token"),
        "Content-Type": "application/json",
        //"Content-Type": "application/x-www-form-urlencoded",
        //'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',

      };
      if(this.checkError()){}
      /*  Cookies.set("eventName", this.state.name);
        Cookies.set("eventInfo", this.state.info);
        Cookies.set("eventDate", this.state.date);
        Cookies.set("eventTime", this.state.time);
        Cookies.set("eventPrice", this.state.price);
        Cookies.set("numberOfGuests", this.state.numberOfGuests);
      }*/
      
      else
        return;
      var tagsArray = this.state.tags.split(",");
      console.log(tagsArray);
      for(let i = 0; i < tagsArray.length; i++){
        var found = false;
        for(let j = 0; j < this.state.existingTagsInDB.length; j++){
          console.log(this.state.existingTagsInDB[j].name)
          if(tagsArray[i] === this.state.existingTagsInDB[j].name){
            found = true;
            id = this.state.existingTagsInDB[j].id;
          }
        }
        if(!found){
          var data = {name: tagsArray[i]};
          var options = {
            method: "POST",
            url: TAGS_URL,
            headers: headers,
            data: data,
          };
          console.log(options);
          await axios(options).then(async response => {
            console.log(response);
            if(response.status === 201){
              await this.setState({existingTagsInDB: this.state.existingTagsInDB.append(response.data) })
              tag_ids.push(response.data.id)
            }
          })
        }
        else{
          tag_ids.push(id);
        }
      }
      var eventId = {};
      var data = {
        name : this.state.name,
        info : this.state.info,
        artist : this.state.artistName,
        date : this.state.date,
        time : this.state.time,
        location: this.state.location,
        price : this.state.price,
        comments: [],
        ratings: [],
        images: [],
        tags: [],
        tag_ids:tag_ids,
        //creator: this.state.creator,
      };
      
      var options = {
        method: "POST",
        url: EVENT_URL,
        data: data,
        headers: headers,
      };
      console.log(options);
      axios(options).then(async response =>  {
        console.log(response);
        if(response.status === 200){
          eventId.id = response.data.id;
          if(this.state.photo){
            var headers= {
              "Authorization" : "JWT " + Cookies.get("token"),
              "Content-Type": "application/json",      
            };
            const formData = new FormData()
            formData.append('content', this.state.photo, this.state.photo.name);
            formData.append('event_id', response.data.id);
      
            console.log(formData);
            var data = {
              //content: formData,
              //event_id: response.data.id,
              //creator: this.state.creator,
            };
            options = {
              method: "POST",
              url: EVENT_IMAGES_URL,
              headers: headers,
              data: formData,
            }
            console.log(options)
            await axios(options).then(response => {
              //console.log(response);
              if(response.status === 200){
                this.setState({redirect: "event/" + eventId.id})
              }
              }).catch(error => {
              console.error(error);
              this.setState({error: true});
            })
          }          
          //this.setState({redirect: "/createEventSuccess"});
          //window.location.reload();
        }
        this.setState({redirect: "event/" + eventId.id})
      }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    }

    checkError(){
      if(this.state.name === "" || this.state.date === "" || this.state.time === "" || this.state.location === ""){
        return false;
      }
      else return true;
    }

    handleErrorMessage(){
      if(this.state.submitClicked){
        if(this.state.name === ""){
          return(
            <div className="text-danger text-center ">
              Event name cannot be empty
            </div>
          );
        }
        else if(this.state.date === ""){
          return(
            <div className="text-danger text-center ">
              Event date cannot be empty
            </div>
          );
        }
        else if(this.state.time === ""){
          return(
            <div className="text-danger text-center ">
              Event time cannot be empty
            </div>
          );
        }
        else if(this.state.location === ""){
          return(
            <div className="text-danger text-center ">
              Event location cannot be empty
            </div>
          );
        }
      }
      return;
    }

    async uploadPhotoHandler(e){
      e.preventDefault();
      await this.setState({pic: this.state.photo});
      //console.log(this.state);
    }
  
    async photoHandler(e){
      const file = e.target.files[0];
      await this.setState({photo: file})
      //console.log(this.state);
    }
  
    render() {
      console.log("state")
      console.log(this.state);
      if(this.state.redirect !== ""){
        return (<Redirect to={this.state.redirect}/>)
      }
    
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
                      name="name"
                      type="text"
                      value={this.state.name}
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
                      name="info"
                      type="text"
                      value={this.state.info}
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
                    <input type="text" placeholder="yyyy-mm-dd"  name="date" value={this.state.date} onChange={this.handleNameChange}/>
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
                      name="time"
                      type="text"
                      value={this.state.time}
                      placeholder="hh:mm"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Location of the event:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="location"
                      type="text"
                      value={this.state.location}
                      placeholder="Location"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Price of the event in dollar:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="price"
                      type="text"
                      value={this.state.price}
                      placeholder="Price"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  Tags:
                </div>
                <label>
                  <div className="col-lg-6 event-in">
                    <input
                      name="tags"
                      type="text"
                      value={this.state.tags}
                      placeholder="Tags"
                      onChange={this.handleNameChange}/>
                  </div>
                </label>
              </div>
              <div className="row">
              <div className="col-lg-6">
                  Photo for the event:
                </div>
                
              <div className="col-lg-6">
                <input className="form-control inputfile" id="photo" type="file" name="photo" onChange={e => this.photoHandler(e)}/>
                <label value="choose a photo" for="photo">{this.state.photo.name ? this.state.photo.name : "Choose a file"}</label>
                {/*<button className="btn btn-primary" onClick={e => this.uploadPhotoHandler(e)}>Add photo</button>*/}
              </div>
              </div>
              <br />
              
              {this.handleErrorMessage()}
              <div className="row">
                <div className="col-xs-2 mx-auto">
                  <button type="button" onClick={e => this.handleCreate(e)} className="btn btn-success mx-auto">Create</button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );
    }
  }