import React from 'react';
import {Redirect} from "react-router-dom";

import Cookies from 'js-cookie';

import Navbar from "../components/navbar/index"

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import "./index.css"

var exampleProfile = {
  name: "Jane Bishop",
  cardSummary: "I am a professional student designer and i love concerts",
  city: "New York",
  country: "NY",
  birthday: "October 23 1990",
  gender: "Female",
  relationshipStatus: "Single",
  occupation: "Dentist",
  education: "University of Columbia",
  languages: "English, French",
  about: "I am a dentist in New York looking for company",
  interests: "",
  likes: "I love reading books. I like fishing, yoga, listening to music, and watching movies.",
  hates: "I hate cooking. I don't like swimming that much.",
  favourites: "My favourite book is Martin Eden. My favourite musician is Lana del Rey. I love jazz and blues. My favourite movie is Sirpski",
  attendedEvents: "Duman Concert, May 2017, Istanbul, Tasoda Festival, April 2017, Bogazici",
  willAttendEvents: "Coffee Fest, November 2018, Istanbul",
  createdEvents: "Home Party, September 2018, Istanbul",
}

export default class ProfileCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      propsToken: this.props.location.token,
      email: "",
      name: "",
      password: "",
      cardSummary: "",
      city: "",
      country: "",
      birthday: "",
      gender: "",
      relationshipStatus: "",
      occupation: "",
      education: "",
      languages: "",
      about: "",
      interests: "",
      likes: "",
      hates: "",
      favourites: "",
      attendedEvents: "",
      willAttendEvents: "",
      createdEvents: "",
    }
    this.state = exampleProfile;
    this.oldState = this.state;
    this.state.propsToken = this.props.location.token;
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  componentDidMount(){

  }

  async handleChange(e) {
    const { name, value } = e.target
  
    await this.setState({[name] : value,});
  }

  async handleCancel(){
    await this.setState(this.oldState);
  }

  async handleSave(){
    this.oldState = this.state;
  }

  render(){
    if((this.state.propsToken === Cookies.get("token")) && Cookies.get("token") !== undefined && this.state.propsToken !== undefined){
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
                    <img className="card-img-top w-100" src="https://lh3.googleusercontent.com/a8_ujXr3VWHstGkxgJL1TkqfrytP4r_52QhcvqRQVaQPRQ9DHdQ6seI99qc4jLjC0WDM=h900" alt="Card image"  />
                    <div className="card-body">
                      <h4 className="card-title">{this.state.name}</h4>
                      <p className="card-text">{this.state.cardSummary}</p>
                      <div className="address">								
                        <ul>
                          <li><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.country} </li>
                          <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {this.state.birthday} </li>
                          <li><i className="fa fa-transgender" aria-hidden="true"></i> {this.state.gender} </li>
                          <li><i className="fa fa-heart" aria-hidden="true"></i> {this.state.relationshipStatus} </li>
                          <li><i className="fa fa-university" aria-hidden="true"></i> {this.state.occupation} </li>
                          <li><i className="fa fa-book" aria-hidden="true"></i> {this.state.education} </li>
                          <li><i className="fa fa-comments" aria-hidden="true"></i> {this.state.languages} </li>
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
                      <a href="" data-target="#friends" data-toggle="tab" className="nav-link">Friends</a>
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
                          <p> {this.state.about}</p>
                          <hr/>
                          <h5>Things I like</h5>
                          <p>{this.state.likes}</p>
                          <hr/>
                          <h5>Things I don't like</h5>
                          <p>{this.state.hates}</p>
                          <hr/>
                          <h5>Favourite movie, book, music, meal...</h5>
                          <p>{this.state.favourites}</p>
                          <hr/>
                        </div>
                        <div className="col-md-12">
                          <h5>Interests</h5>
                          <a href="#" className="badge badge-success badge-pill interest-pills">html5</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">react</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">codeply</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">angularjs</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">css3</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">jquery</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">bootstrap</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">responsive-design</a>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="events">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>Events I have attended to</h5>
                          <p> {this.state.attendedEvents}</p>
                          <hr/>
                          <h5>Events I will attend to</h5>
                          <p>{this.state.willAttendEvents}</p>
                          <hr/>
                          <h5>Things I have created</h5>
                          <p>{this.state.createdEvents}</p>
                          <hr/>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="friends">
                      <div className="row">
                        <div className="col-12">
                          <h5>Friends</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  <li className="list-item col-xs-12 col-lg-6 float-left my-3">
                                    <div className="col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/m101.jpg" alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid"/>
                                    </div>
                                    <div className="col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Mike Anamendolla</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Los Angeles, CA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-right my-3">
                                    <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/w104.jpg" alt="Debbie Schmidt" className="img-fluid rounded-circle d-block mx-auto"/>
                                    </div>
                                    <div className="col-12 col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Debbie Schmidt</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Boston, MA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-left my-3">
                                    <div className="col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/m101.jpg" alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid"/>
                                    </div>
                                    <div className="col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Mike Anamendolla</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Los Angeles, CA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-right my-3">
                                    <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/w104.jpg" alt="Debbie Schmidt" className="img-fluid rounded-circle d-block mx-auto"/>
                                    </div>
                                    <div className="col-12 col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Debbie Schmidt</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Boston, MA
                                      <br/>
                                    </div>
                                  </li>
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
                    <div className="tab-pane" id="edit">
                      <form role="form">
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Name</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div>
                        <div className="form-group row">
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
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">Short Summary</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="cardSummary" value={this.state.cardSummary} onChange={e => this.handleChange(e)}/>
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
                        <div className="form-group row">
                          <label className="col-lg-3 col-form-label form-control-label">About Me</label>
                          <div className="col-lg-9">
                            <input className="form-control" type="text" name="about" value={this.state.about} onChange={e => this.handleChange(e)}/>
                          </div>
                        </div> 
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
                            <input type="button" className="btn btn-success float-right" value="Submit"/>
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
    else{
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
                    <img className="card-img-top w-100" src="https://lh3.googleusercontent.com/a8_ujXr3VWHstGkxgJL1TkqfrytP4r_52QhcvqRQVaQPRQ9DHdQ6seI99qc4jLjC0WDM=h900" alt="Card image"  />
                    <div className="card-body">
                      <h4 className="card-title">{this.state.name}</h4>
                      <p className="card-text">{this.state.cardSummary}</p>
                      <div className="address">								
                        <ul>
                          <li><i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.country} </li>
                          <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {this.state.birthday} </li>
                          <li><i className="fa fa-transgender" aria-hidden="true"></i> {this.state.gender} </li>
                          <li><i className="fa fa-heart" aria-hidden="true"></i> {this.state.relationshipStatus} </li>
                          <li><i className="fa fa-university" aria-hidden="true"></i> {this.state.occupation} </li>
                          <li><i className="fa fa-book" aria-hidden="true"></i> {this.state.education} </li>
                          <li><i className="fa fa-comments" aria-hidden="true"></i> {this.state.languages} </li>
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
                      <a href="" data-target="#friends" data-toggle="tab" className="nav-link">Friends</a>
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
                          <p> {this.state.about}</p>
                          <hr/>
                          <h5>Things I like</h5>
                          <p>{this.state.likes}</p>
                          <hr/>
                          <h5>Things I don't like</h5>
                          <p>{this.state.hates}</p>
                          <hr/>
                          <h5>Favourite movie, book, music, meal...</h5>
                          <p>{this.state.favourites}</p>
                          <hr/>
                        </div>
                        <div className="col-md-12">
                          <h5>Interests</h5>
                          <a href="#" className="badge badge-success badge-pill interest-pills">html5</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">react</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">codeply</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">angularjs</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">css3</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">jquery</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">bootstrap</a>
                          <a href="#" className="badge badge-success badge-pill interest-pills">responsive-design</a>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="events">
                      <div className="row">
                        <div className="col-md-12">
                          <h5>Events I have attended to</h5>
                          <p> {this.state.attendedEvents}</p>
                          <hr/>
                          <h5>Events I will attend to</h5>
                          <p>{this.state.willAttendEvents}</p>
                          <hr/>
                          <h5>Things I have created</h5>
                          <p>{this.state.createdEvents}</p>
                          <hr/>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="friends">
                      <div className="row">
                        <div className="col-12">
                          <h5>Friends</h5>
                          <div className="container">
                            <div className="card card-default">
                              <div id="contacts" className="panel-collapse collapse show" aria-expanded="true" >
                                <ul className="list-unstyled ">
                                  <li className="list-item col-xs-12 col-lg-6 float-left my-3">
                                    <div className="col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/m101.jpg" alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid"/>
                                    </div>
                                    <div className="col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Mike Anamendolla</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Los Angeles, CA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-right my-3">
                                    <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/w104.jpg" alt="Debbie Schmidt" className="img-fluid rounded-circle d-block mx-auto"/>
                                    </div>
                                    <div className="col-12 col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Debbie Schmidt</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Boston, MA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-left my-3">
                                    <div className="col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/m101.jpg" alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid"/>
                                    </div>
                                    <div className="col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Mike Anamendolla</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Los Angeles, CA
                                      <br/>
                                    </div>
                                  </li>
                                  <li className="list-item col-xs-12 col-lg-6 float-right my-3">
                                    <div className="col-8 col-sm-4 col-md-2 px-0 float-left">
                                      <img src="http://demos.themes.guide/bodeo/assets/images/users/w104.jpg" alt="Debbie Schmidt" className="img-fluid rounded-circle d-block mx-auto"/>
                                    </div>
                                    <div className="col-12 col-sm-8 col-md-10 float-right">
                                      <label className="name lead mb-0">Debbie Schmidt</label>
                                      <br/>
                                      <i className="fa fa-map-marker" aria-hidden="true"></i> Boston, MA
                                      <br/>
                                    </div>
                                  </li>
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
