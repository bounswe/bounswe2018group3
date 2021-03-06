import React from 'react';
import {Redirect, Link} from "react-router-dom";

import Cookies from 'js-cookie';
import axios from 'axios';

import Navbar from "../components/navbar/index"
import GuestBar from "../components/guestBar/index"

import { USERS_URL, EDIT_USER_URL, GET_USER_PIC_URL, FOLLOW_URL, TAGS_URL, USER_WATCH_TAGS_URL } from "../constants/backend-urls"

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import "./index.css"


export default class ProfileCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      redirect: "",
      token: Cookies.get("token"),
      propsToken: this.props.location.token,
      id: this.props.location.pathname.substring(9),
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      //cardSummary: "",
      city: "",
      country: "",
      birthday: "",
      //gender: "",
      //relationshipStatus: "",
      //occupation: "",
      //education: "",
      //languages: "",
      //about: "",
      bio: "",
      //likes: "",
      //hates: "",
      //favourites: "",
      pastEvents: [],
      futureEvents: [],
      createdEvents: [],
      interestedEvents: [],
      chosen_profile_pic: "",
      profile_pic: {},
      profile_photo: {},
       /*photo: {},
      uploadPhoto: {},*/
      private: false,
      followedUsers: [],
      followers: [],
      following: false,
      userFollowing: [],
      interests: "",
      interestsArray: [],
      existingTagsInDB: [],
      watchingTags: [],
    }
    this.oldState = this.state;
    this.state.propsToken = this.props.location.token;
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.listFriends = this.listFriends.bind(this);
    //this.uploadPhotoHandler = this.uploadPhotoHandler.bind(this);
    this.uploadProfilePhotoHandler = this.uploadProfilePhotoHandler.bind(this);
    this.profilePhotoHandler = this.profilePhotoHandler.bind(this);
    this.follow = this.follow.bind(this);
    this.handleFollowButton = this.handleFollowButton.bind(this);
    this.redirectProfile = this.redirectProfile.bind(this);
  }

  async componentDidMount(){
    if(this.props.location.pathname.substring(9) === undefined || this.props.location.pathname.substring(9) === "")
      return;

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

    headers= {
      "Content-Type": "application/json",
      //"Authorization" : "JWT " + Cookies.get("token")
    };
    options = {
      method: "GET",
      url: USERS_URL + this.props.location.pathname.substring(9),
      headers: headers,
    };
    console.log(options)
    await axios(options).then(async response => {
      console.log("did mount");
      console.log(response);
      if(response.status === 200){
        await this.setState({
          //...this.state,
          id: response.data.id,
          bio: response.data.bio,
          birthday: response.data.birthday,
          city: response.data.city,
          country: response.data.country,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          followedUsers: response.data.followedUsers.map((person, key) => {return {id: person[0], first_name: person[1], last_name: person[2], pic: person[3], private: person[4]}}),
          followers: response.data.followers.map((person, key) => {return {id: person[0], first_name: person[1], last_name: person[2], pic: person[3], private: person[4]}}),
          private: response.data.private,
          profile_pic: response.data.profile_pic,
          profile_photo: {},
          private: response.data.is_private,
          pastEvents: response.data.pastEvents.map((event, key) => {return {id: event[0], name: event[1]}}),
          createdEvents: response.data.createdEvents.map((event, key) => {return {id: event[0], name: event[1]}}),
          futureEvents: response.data.futureEvents.map((event, key) => {return {id: event[0], name: event[1]}}),
          interestedEvents: response.data.interestedEvents.map((event, key) => {return {id: event[0], name: event[1]}}),
          watchingTags: response.data.watchingTags,
            interestsArray: response.data.watchingTags.map((tag, key) => {
              for(let i = 0; i < this.state.existingTagsInDB.length; i++){
                if(this.state.existingTagsInDB[i].id === tag){
                  return this.state.existingTagsInDB[i].name;
                }
              }
              }),
        }); 
        this.setState({interests: this.state.interestsArray.toString()})
        //if(response.data.private || this.state.private){
        if(this.state.private && this.state.id !== Cookies.get("userid")){
          await this.setState({redirect: "/privateprofile/" + this.state.id});

        }
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
    options = {
      method: "GET",
      url: GET_USER_PIC_URL + this.props.location.pathname.substring(9),
      headers: headers,
    }
    await axios(options).then(response => {
      //console.log(response);
      if(response.status === 200){
        this.setState({profile_pic: response.data.profile_pic.data})
      }
    }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
    if(this.state.token !== undefined){
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      var options = {
        method: "GET",
        url: USERS_URL + Cookies.get("userid"),
        headers: headers,
      };
      //console.log(options)
      await axios(options).then(async response => {
        console.log("did mount");
        //console.log(response);
        if(response.status === 200){
          //console.log(response)
          this.setState({
            userFollowing: response.data.followedUsers.map((person, key) => {return person[0]}),
          });
        }
      }).catch(error => {
        console.error(error);
      }) 
    }
    
    this.oldState = this.state;

  }

  handleFollowButton(){
    if(this.state.token !== undefined){
      if(!this.state.userFollowing.includes(this.state.id)){
        return(
          <button href="" className="btn btn-md btn-primary btn-block col-4 " onClick={this.follow}>
            <i className="fa fa-user-plus add-friend-image" aria-hidden="true"></i>
            Follow
          </button>
        )
      }
      else{
        return(
          <button href="" className="btn btn-md btn-success btn-block col-4 " onClick={this.follow}>
            <i className="fa fa-user-plus add-friend-image" aria-hidden="true"></i>
            Following
          </button>
        )
      }
    }
  }

  async handleChange(e) {
    const { name, value } = e.target
  
    await this.setState({[name] : value,});
  }

  async handleCancel(){
    await this.setState(this.oldState);
  }

  async handleSave(){
    var profile_pic_changed = false;
    var interests_changed = false;
    var headers= {
      "Content-Type": "application/json",
      "Authorization" : "JWT " + Cookies.get("token")
    };
    var body = {
      bio: this.state.bio,
      birthday: this.state.birthday,
      city: this.state.city,
      country: this.state.country,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      //profile_pic: this.state.profile_pic,
      //followedUsers: this.state.followedUsers,
      //followers: this.state.followers,
    };
    if(this.state.profile_pic !== this.oldState.profile_pic){ 
      profile_pic_changed = true;
    }
    if(this.state.interests !== this.oldState.interests){
      interests_changed = true;
    }
      
    this.oldState = this.state;

    var options = {
      method: "PATCH",
      url: EDIT_USER_URL + Cookies.get("userid"),
      headers: headers,
      data: body,
    };
    //console.log(options);
    await axios(options).then(response => {
      //console.log(response);
      if(response.status === 200){
      }
      }).catch(error => {
      console.error(error);
      this.setState({error: true});
    })
    if(profile_pic_changed){
      const formData = new FormData()
      formData.append('profile_pic', this.state.profile_pic, this.state.profile_pic.name)
      options = {
        method: "PATCH",
        url: EDIT_USER_URL + Cookies.get("userid"),
        headers: headers,
        data: formData,
      }
      console.log(options)
      await axios(options).then(response => {
        //console.log(response);
        if(response.status === 200){
          //window.location.reload();
        }
        }).catch(error => {
        console.error(error);
        this.setState({error: true});
      })
    }
    if(interests_changed){
      console.log("interests changed")
      var headers= {
        "Content-Type": "application/json",
        "Authorization" : "JWT " + Cookies.get("token")
      };
      for(let i = 0; i < this.state.interestsArray.length; i++){
        for(let j = 0; j < this.state.existingTagsInDB.length; j++){
          console.log(this.state.interestsArray[i])
          console.log(this.state.existingTagsInDB[j].name)
          if(this.state.interestsArray[i] === this.state.existingTagsInDB[j].name ){
            found = true;
            var options = {
              method: "DELETE",
              url: USER_WATCH_TAGS_URL + this.state.existingTagsInDB[j].id,
              headers: headers,
            };
            console.log(options);
            await axios(options).then(response => {
              console.log(response);
              if(response.status === 200){
                
              }
              }).catch(error => {
              console.error(error);
              this.setState({error: true});
          })
          
          }
        }
      }

      await this.setState({interestsArray: this.state.interests.split(",")});
      for(let i = 0; i < this.state.interestsArray.length; i++){
        var found = false;
        for(let j = 0; j < this.state.existingTagsInDB.length; j++){
          console.log(this.state.interestsArray[i])
          console.log(this.state.existingTagsInDB[j].name)
          if(this.state.interestsArray[i] === this.state.existingTagsInDB[j].name ){
            found = true;
            var options = {
              method: "GET",
              url: USER_WATCH_TAGS_URL + this.state.existingTagsInDB[j].id,
              headers: headers,
            };
            await axios(options).then(response => {
              console.log(response);
              if(response.status === 200){
                
              }
              }).catch(error => {
              console.error(error);
              this.setState({error: true});
          })
          
          }
        }
        if(found){
          found = false;
          continue;
        }
        var data = {name: this.state.interestsArray[i]};
        var options = {
          method: "POST",
          url: TAGS_URL,
          headers: headers,
          data: data,
        };
        console.log(options);
        await axios(options).then(async response => {
          console.log(response);
          if(response.status === 200){
            await this.setState({existingTagsInDB: this.state.existingTagsInDB.append(response.data)})
          }
          var options = {
            method: "GET",
            url: USER_WATCH_TAGS_URL + response.data.id,
            headers: headers,
          };
          await axios(options).then(response => {
            console.log(response);
            if(response.status === 200){
              
            }
            }).catch(error => {
            console.error(error);
            this.setState({error: true});
        })
          }).catch(error => {
          console.error(error);
          this.setState({error: true});
      })
      
      }
      
  }

  }
/*
  uploadPhotoHandler(e){
    e.preventDefault();
    this.setState({uploadPhoto: e.target.files[0]});
    console.log(e.target.files[0])

    //console.log(this.state);
  }

  fileChangedHandler(event){
    const file = event.target.files[0];
    this.setState({photo: file})
  }
*/
  async uploadProfilePhotoHandler(e){
    e.preventDefault();
    await this.setState({profile_pic: this.state.profile_photo, profile_photo: {}});
    //console.log(this.state);
  }

  async profilePhotoHandler(e){
    const file = e.target.files[0];
    await this.setState({profile_photo: file})
    //console.log(this.state);
  }

  async follow(){ 
    if(this.state.token !== undefined){
      if(!this.state.userFollowing.includes(this.state.id)){
        var headers= {
          "Content-Type": "application/json",
          "Authorization" : "JWT " + Cookies.get("token")
        };
        var options = {
          method: "GET",
          url: FOLLOW_URL + this.props.location.pathname.substring(9),
          headers: headers,
        }
        await axios(options).then(response => {
          //console.log(response);
          if(response.status === 200){
          }
        }).catch(error => {
          console.error(error);
          this.setState({error: true});
        })
      }
      else{
        var headers= {
          "Content-Type": "application/json",
          "Authorization" : "JWT " + Cookies.get("token")
        };
        var options = {
          method: "DELETE",
          url: FOLLOW_URL + this.props.location.pathname.substring(9),
          headers: headers,
        }
        await axios(options).then(response => {
          //console.log(response);
          if(response.status === 200){
          }
        }).catch(error => {
          console.error(error);
          this.setState({error: true});
        })
      }
      window.location.reload();
    }
  } 

  redirectProfile(link){
    this.setState({redirect: link});
    window.location.reload();

  }

  listFriends(people){
    var ret = [];
    for(let i = 0; i < people.length; i++){
      var profileLink;
      if(people[i].private){
        profileLink = "/privateprofile/" + people[i].id;
      }
      else{
        profileLink = "/profile/" + people[i].id;
      }
      if(i % 2 === 1){
        ret.push(
          <li className="list-item col-xs-12 col-lg-6 float-right my-3" onClick={this.redirectProfile}>
            <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
              <img src={USERS_URL + people[i].pic} alt={people[i].first_name + " " + people[i].last_name} className="img-fluid rounded-circle d-block mx-auto"/>
            </div>
            <div className="col-12 col-sm-8 col-md-10 float-right" >
              <Link to={profileLink}>
                <label className="name lead mb-0">
                  {people[i].first_name + " " + people[i].last_name}
                </label>
              </Link>
              <br/>
              
            </div>
          </li>
        )
      }
      else{
        ret.push(
          <li className="list-item col-xs-12 col-lg-6 float-left my-3" onClick={this.redirectProfile}>
            <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
              <img src={USERS_URL + people[i].pic} alt={people[i].first_name + " " + people[i].last_name} className="img-fluid rounded-circle d-block mx-auto"/>
            </div>
            <div className="col-12 col-sm-8 col-md-10 float-right">
              <Link to={profileLink}>
                <label className="name lead mb-0">
                  {people[i].first_name + " " + people[i].last_name}
                </label>
              </Link>
              <br/>
              
            </div>
          </li>
        )
      }
    }
    return ret;
  }

  render(){
    console.log("state in render");
    console.log(this.state);
    if(this.props.location.pathname.substring(9) === undefined || this.props.location.pathname.substring(9) === ""){
      return(
        <div>
          <h2>
            User not found!
          </h2>
        </div>
      )
    }
    
    else if(Cookies.get("userid") === this.props.location.pathname.substring(9)){
    return (
      <div>
        <div className="mb-70">
          <Navbar currentPath={this.props.location.pathname}/>
        </div>
        <div className="wrapper">
          <div className="container-fluid" id="body-container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card w-100" >
                    <img className="card-img-top w-100" src={this.state.profile_pic} alt="Card image"  />
                    <div className="card-body">
                      <h4 className="card-title">{this.state.first_name + " " + this.state.last_name}</h4>
                      <p className="card-text">{this.state.cardSummary}</p>
                      <div className="address">								
                        <ul>
                          <li><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.country} </li>
                          <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {this.state.birthday} </li>
                          {/*}
                          <li><i className="fa fa-transgender" aria-hidden="true"></i> {this.state.gender} </li>
                          <li><i className="fa fa-heart" aria-hidden="true"></i> {this.state.relationshipStatus} </li>
                          <li><i className="fa fa-university" aria-hidden="true"></i> {this.state.occupation} </li>
                          <li><i className="fa fa-book" aria-hidden="true"></i> {this.state.education} </li>
                          <li><i className="fa fa-comments" aria-hidden="true"></i> {this.state.languages} </li>
                          */}
                        </ul>								
                      </div>
                      <div className="text-center social-btn">
                          <a href="#" className="btn btn-primary btn-facebook"><i className="fa fa-facebook"></i>&nbsp; facebook</a>
                          <a href="#" className="btn btn-info btn-twitter"><i className="fa fa-twitter"></i>&nbsp; twitter</a>
                          <a href="#" className="btn btn-danger btn-google"><i className="fa fa-google"></i>&nbsp; google</a>
                      </div>
                    </div>
                  </div>		
                </div>
                <div className="col-lg-8 col-md-6 order-lg-2">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">About</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#events" data-toggle="tab" className="nav-link">Events</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#followers" data-toggle="tab" className="nav-link">Followers</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#following" data-toggle="tab" className="nav-link">Following</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#photos" data-toggle="tab" className="nav-link">Photos</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                    </li>
                  </ul>
                  <div className="tab-content py-4">
                    <div className="tab-pane active" id="profile">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>About Me</h5>
                          <p> {this.state.bio}</p>
                          <hr/>
                          {/*}
                          <h5>Things I like</h5>
                          <p>{this.state.likes}</p>
                          <hr/>
                          <h5>Things I don't like</h5>
                          <p>{this.state.hates}</p>
                          <hr/>
                          <h5>Favourite movie, book, music, meal...</h5>
                          <p>{this.state.favourites}</p>
                          <hr/>
                        */}
                        </div>
                        <div className="col-md-12">
                          <h5>Interests</h5>
                          <p>{this.state.interestsArray.map((tag, key) => {
                            return (<div className="badge badge-success badge-pill interest-pills">{tag}</div>)
                          })}</p>
                          {/*<a href="#" className="badge badge-success badge-pill interest-pills">html5</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">react</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">codeply</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">angularjs</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">css3</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">jquery</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">bootstrap</a>
                      <a href="#" className="badge badge-success badge-pill interest-pills">responsive-design</a>*/}
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="events">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>Events I have attended to</h5>
                          <p> {this.state.pastEvents.length > 0 ? this.state.pastEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I will attend to</h5>
                          <p>{this.state.futureEvents.length > 0 ? this.state.futureEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I am interested in</h5>
                          <p>{this.state.interestedEvents.length > 0 ? this.state.interestedEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I have created</h5>
                          <p>{this.state.createdEvents.length > 0 ? this.state.createdEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          
                          <hr/>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="followers">
                      <div className="row">
                        <div className="col-12">
                          <h5>Followers</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  {this.listFriends(this.state.followers)}                                
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="following">
                      <div className="row">
                        <div className="col-12">
                          <h5>Following</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  {this.listFriends(this.state.followedUsers)} 
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*
                    <div className="tab-pane" id="photos">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>Photos</h5>
                          <form role="form">
                            <div className="form-group row">
                              <div className="col-lg-9">
                                <input className="form-control inputfile" id="photo" type="file" name="photo" onChange={e => this.fileChangedHandler(e)} />
                                <label value="choose a photo" for="photo">{this.state.photo==="" ? "Choose a file": this.state.photo.name}</label>
                                <button className="btn btn-primary" onClick={e => this.uploadPhotoHandler(e)}>Upload</button>
                              </div>
                            </div>
                          </form>
                          <p> </p>
                          <hr/>
                        </div>
                      </div>
                    </div>
                    */}
                    <div className="tab-pane" id="edit">
                      <form role="form">
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">First Name</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="first_name" value={this.state.first_name} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Last Name</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="last_name" value={this.state.last_name} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        {/*<div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Email</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Password</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="password" name="password" onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        */}
                        {/*
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Short Summary</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="cardSummary" value={this.state.cardSummary} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Profile Photo</label>
                            <div className="col-lg-9">
                              <input className="form-control inputfile" id="photo" type="file" name="photo" onChange={e => this.profilePhotoHandler(e)}/>
                              <label value="choose a photo" for="photo">{this.state.profile_photo.name ? this.state.profile_photo.name : "Choose a file" }</label>
                              <button className="btn btn-primary" onClick={e => this.uploadProfilePhotoHandler(e)}>Set as profile photo</button>
                            </div>
                          </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">City and Country</label>
                          <div className="col-lg-6">
                            <input className="form-control" type="text" name="city" value={this.state.city} onChange={e => this.handleChange(e)}/>
                          </div>
                          <div className="col-lg-3">
                            <input className="form-control" type="text" name="country" value={this.state.country} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Birthday</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="date" name="birthday" value={this.state.birthday} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        {/*}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="gender" value={this.state.gender} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Relationship Status</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="relationshipStatus" value={this.state.relationshipStatus} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Company / Occupaion</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="occupation" value={this.state.occupation} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Education</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="education" value={this.state.education} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Languages</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="languages" value={this.state.languages} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>  
                        */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">About Me</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="bio" value={this.state.bio} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div> 
                        {/*
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Things I Like</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="likes" value={this.state.likes} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Things I Don't Like</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="hates" value={this.state.hates} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Favourite movie, book, music, meal...</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="favourites" value={this.state.favourites} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        */}
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Interests</label>
                          <div className="col-lg-9">                        
                            <input className="form-control" type="text" name="interests" value={this.state.interests} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row ">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          <div className="col-lg-4 mx-auto">
                            <input type="reset" className="btn btn-danger" value="Cancel" onClick={this.handleCancel}/>
                            <input type="button" className="btn btn-success float-right" value="Submit" onClick={this.handleSave}/>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
    else if(this.state.redirect !== ""){
      return(
        <Redirect to={this.state.redirect}/>
      )
    }
    else{
      return (
        <div>
          <div className="wrapper position-absolute">
            <GuestBar/>
          </div>
        <div className="mb-70">
          <Navbar currentPath={this.props.location.pathname}/>
        </div>
        <div className="wrapper">
          <div className="container-fluid" id="body-container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card w-100" >
                    <img className="card-img-top w-100" src={this.state.profile_pic} alt="Card image"  />
                    <div className="card-body">
                      <h4 className="card-title">{this.state.first_name + " " + this.state.last_name}</h4>
                      <p className="card-text">{this.state.cardSummary}</p>
                      <div className="address">								
                        <ul>
                          <li><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.country} </li>
                          <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {this.state.birthday} </li>
                          {/*                          
                          <li><i className="fa fa-transgender" aria-hidden="true"></i> {this.state.gender} </li>
                          <li><i className="fa fa-heart" aria-hidden="true"></i> {this.state.relationshipStatus} </li>
                          <li><i className="fa fa-university" aria-hidden="true"></i> {this.state.occupation} </li>
                          <li><i className="fa fa-book" aria-hidden="true"></i> {this.state.education} </li>
                          <li><i className="fa fa-comments" aria-hidden="true"></i> {this.state.languages} </li>
                          */}
                        </ul>								
                      </div>
                      <div className="text-center social-btn">
                          <a href="#" className="btn btn-primary btn-facebook"><i className="fa fa-facebook"></i>&nbsp; facebook</a>
                          <a href="#" className="btn btn-info btn-twitter"><i className="fa fa-twitter"></i>&nbsp; twitter</a>
                          <a href="#" className="btn btn-danger btn-google"><i className="fa fa-google"></i>&nbsp; google</a>
                      </div>
                    </div>
                  </div>		
                </div>
                <div className="col-lg-8 col-md-6 order-lg-2">
                <div className="col-12 buttons mb-10 mx-auto">
                  {this.handleFollowButton()}
                  <button href="" className="btn btn-md btn-warning btn-block col-4 ">
                    <i className="fa fa-envelope add-friend-image" aria-hidden="true"></i>
                    Message
                  </button>
                </div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">About</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#events" data-toggle="tab" className="nav-link">Events</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#followers" data-toggle="tab" className="nav-link">Followers</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#following" data-toggle="tab" className="nav-link">Following</a>
                    </li>
                    <li className="nav-item">
                      <a href="" data-target="#photos" data-toggle="tab" className="nav-link">Photos</a>
                    </li>
                  </ul>
                  <div className="tab-content py-4">
                    <div className="tab-pane active" id="profile">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>About Me</h5>
                          <p> {this.state.bio}</p>
                          <hr/>
                          {/*
                          <h5>Things I like</h5>
                          <p>{this.state.likes}</p>
                          <hr/>
                          <h5>Things I don't like</h5>
                          <p>{this.state.hates}</p>
                          <hr/>
                          <h5>Favourite movie, book, music, meal...</h5>
                          <p>{this.state.favourites}</p>
                          <hr/>
                          */}
                        </div>
                        <div className="col-md-12">
                          <h5>Interests</h5>
                          <p>{this.state.interestsArray.map((tag, key) => {
                            return (<div className="badge badge-success badge-pill interest-pills">{tag}</div>)
                          })}</p>
                          {/*<a href="#" className="badge badge-success badge-pill interest-pills">html5</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">react</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">codeply</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">angularjs</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">css3</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">jquery</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">bootstrap</a>
                        <a href="#" className="badge badge-success badge-pill interest-pills">responsive-design</a>*/}
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="events">
                      <div className="row">
                        <div className="col-md-12">
                        <h5>Events I have attended to</h5>
                          <p> {this.state.pastEvents.length > 0 ? this.state.pastEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I will attend to</h5>
                          <p>{this.state.futureEvents.length > 0 ? this.state.futureEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I am interested in</h5>
                          <p>{this.state.interestedEvents.length > 0 ? this.state.interestedEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                          <h5>Events I have created</h5>
                          <p>{this.state.createdEvents.length > 0 ? this.state.createdEvents.map((event, key) => {
                            var eventLink = "/event/" + event.id;
                            return(
                              <div>
                              <Link to={eventLink}> {event.name} </Link> <br/>
                              </div>
                            )}
                          ) : "Wow such empty"}</p>
                          <hr/>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="followers">
                      <div className="row">
                        <div className="col-12">
                          <h5>Followers</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  {this.listFriends(this.state.followers)}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="following">
                      <div className="row">
                        <div className="col-12">
                          <h5>Following</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  {this.listFriends(this.state.followedUsers)}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="photos">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>Photos</h5>
                          <p> </p>
                          <hr/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
};
