import Navbar from "../components/navbar/index"
import React from 'react';
import "./index.css";
import Cookies from 'js-cookie';

import { Redirect } from "react-router-dom";
import { USERS_URL, EDIT_USER_URL } from "../constants/backend-urls"
import axios from 'axios';
import { push } from 'react-router-redux';


export default class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: Cookies.get("userid"),
        token: Cookies.get("token"),
        redirect: "",
        private: false,
        submitClicked: false,
        followingSettings: [true, true, true, false],
      };
  
      this.handleSave = this.handleSave.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleFollowingCheckboxes = this.handleFollowingCheckboxes.bind(this);
      this.handleFollowingCheckboxesChange = this.handleFollowingCheckboxesChange.bind(this);
      this.oldState = this.state;
      
    }

    async componentDidMount(){
      if(this.state.token === undefined || this.state.token === "")
        return;
  
      var headers= {
        "Content-Type": "application/json",
        //"Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        url: USERS_URL + this.state.id,
        headers: headers,
      };
      console.log(options)
      await axios(options).then(async response => {
        console.log("did mount");
        console.log(response);
        if(response.status === 200){
          this.setState({
            //...this.state,
            id: response.data.id,
            private: response.data.is_private,
          });
        }
      }).catch(error => {
        console.error(error);
      })
    } 

    handleCheckboxChange(){
      this.setState({private: !this.state.private})
    }

    handleFollowingCheckboxesChange(i){
      if(i === 3){
        if(!this.state.followingSettings[i]){
          this.setState({
            followingSettings: [false, false, false, true],
          });
        }
        else{
          var newFollowSettings = this.state.followingSettings;
          newFollowSettings[i] = !newFollowSettings[i];
          this.setState({
            followingSettings: newFollowSettings,
          })
        }
      }
      else{
        var newFollowSettings = this.state.followingSettings;
        newFollowSettings[i] = !newFollowSettings[i];
        newFollowSettings[3] = false;
        this.setState({
          followingSettings: newFollowSettings,
        })
      }
    }

    handleFollowingCheckboxes(){
      return(
        <p>
          <input type="checkbox" checked={this.state.followingSettings[0]} onChange={() => this.handleFollowingCheckboxesChange(0)} onClick={() => {this.checked = !this.checked}}/> Someone I follow creates an event 
          <br/> 
          <input type="checkbox" checked={this.state.followingSettings[1]} onChange={() => this.handleFollowingCheckboxesChange(1)} onClick={() => {this.checked = !this.checked}}/> Someone I follow is interested in an event 
          <br/>
          <input type="checkbox" checked={this.state.followingSettings[2]} onChange={() => this.handleFollowingCheckboxesChange(2)} onClick={() => {this.checked = !this.checked}}/> Someone I follow is going to an event
          <br/>
          <input type="checkbox" checked={this.state.followingSettings[3]} onChange={() => this.handleFollowingCheckboxesChange(3)} onClick={() => {this.checked = !this.checked}}/> Never
        </p>
      )
    }

    handleNameChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : "";
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    async handleSave(){
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var body = {
        is_private: this.state.private
        //profile_pic: this.state.profile_pic,
        //followedUsers: this.state.followedUsers,
        //followers: this.state.followers,
      };
        
      this.oldState = this.state;
  
      var options = {
        method: "PATCH",
        url: EDIT_USER_URL + Cookies.get("userid"),
        headers: headers,
        data: body,
      };
      //console.log(options);
      await axios(options).then(response => {
        console.log(response);
        if(response.status === 200){

        }
        }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
      
    }
  
    render() {
      console.log(this.state);
      if(this.state.id === undefined || this.state.id === ""){
        return (<Redirect to="/login" />)
      }
      return (
        <React.Fragment>
          <div>
            <Navbar currentPath={this.props.location.pathname}/>
          </div>
          <div className="container-event col-xs-12 col-sm-10 col-md-6">
            {/*<h2 className="text-center">Settings</h2>*/}
            <form className="form-event">
            <div class="or-seperator"><strong>Privacy Settings</strong></div>              
              <div className="row">
                <p>
                  <input type="checkbox" name="private" onChange={this.handleCheckboxChange} onClick={() => {this.checked = !this.checked}}/> Private Profile
                </p>
                <br/>
                <p><i>
                  Setting your profile private will disable those who do not follow you from reaching to your personal info.
                  The only info they can find will be your name and profile photo.
                </i></p>
              </div>
              <br/>
              <div className="row">
                <h6>Message Settings</h6>
              </div>
              <div className="row">
              Who can message me
              </div>
              <div className="row">
                <select>
                  <option value="one">Everybody</option>
                  <option value="two">My followers</option>
                  <option value="three">Nobody</option>
                </select>
                <p><i>
                  <br/>
                  You may change your message settings in order to specify who can message you. 
                </i></p>
              </div>  
              

              <div class="or-seperator"><strong>Notification Settings</strong></div> 
              <div className="row">
                <h6>Interested Event Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
                <select>
                  <option value="one">Event gets modified</option>
                  <option value="two">Events gets canceled</option>
                  <option value="three">Never</option>
                </select>
                <p><i>
                  <br/>
                  Interested events are the events that you are interested in. You may choose to get notifications whenever 
                  there is a modification about the event, when the event gets canceled or to never get any notifications about
                  the event. 
                </i></p>
              </div>  

              <br/>
            
              <div className="row">
                <h6>Attending Event Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
                <select>
                  <option value="one">Event gets modified</option>
                  <option value="two">Events gets canceled</option>
                  <option value="three">Never</option>
                </select>
                <p><i>
                  <br/>
                  Going events are the events that you are going to attend. You may choose to get notifications whenever 
                  there is a modification about the event, when the event gets canceled or to never get any notifications about
                  the event. 
                </i></p>
              </div>  

              <br/>

              <div className="row">
                <h6>Following Settings</h6>
              </div>
              <div className="row">
              Notify when
              </div>
              <div className="row">
              {this.handleFollowingCheckboxes()}
              <p><i>
                  When you follow someone, you may also choose to get notifications about that person. You may choose to get
                  notifications whenever that person creates an event, is interested in an event, is attending an event or 
                  not to get any notifications at all.
                </i></p>

              </div>  

              <br/>
       
              <div className="row">
                <div className="col-xs-2 mx-auto">
                  <button type="button" onClick={e => this.handleSave(e)} className="btn btn-success mx-auto">Save</button>
                </div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );
    }
  }