import React from 'react';
import {Redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';
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
}

export default class ProfileCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
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
    }
    this.state = exampleProfile;
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    const { name, value } = e.target
  
    await this.setState({[name] : value,});
    console.log(this.state);
  }

  render(){
    return (
      <div className="wrapper mt-70">
        <div className="container-fluid" id="body-container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-10">
                <div className="card w-100" >
                  <img className="card-img-top w-100" src="https://lh3.googleusercontent.com/a8_ujXr3VWHstGkxgJL1TkqfrytP4r_52QhcvqRQVaQPRQ9DHdQ6seI99qc4jLjC0WDM=h900" alt="Card image"  />
                  <div className="card-body">
                    <h4 className="card-title">{this.state.name}</h4>
                    <p className="card-text">{this.state.cardSummary}</p>
                    <div className="address">								
                      <ul>
                        <li> <i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.city}, {this.state.country} </li>
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
                    <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Events</a>
                  </li>
                  <li className="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Friends</a>
                  </li>
                  <li className="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" className="nav-link">Photos</a>
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
                          <input className="form-control" type="email" name="email" value={this.state.email}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Password</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="password" name="password"/>
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
                          <input className="form-control" type="text" name="city" value={this.state.city} placeholder="City"/>
                        </div>
                        <div className="col-lg-3">
                          <input className="form-control" type="text" name="country" value={this.state.country} placeholder="State"/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Birthday</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="date" name="birthday" value={this.state.birthday}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="gender" value={this.state.gender}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Relationship Status</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="relationshipStatus" value={this.state.relationshipStatus}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Company / Occupaion</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="occupation" value={this.state.occupation}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Education</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="education" value={this.state.education}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Languages</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="languages" value={this.state.languages}/>
                        </div>
                      </div>  
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">About Me</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="about" value={this.state.about}/>
                        </div>
                      </div> 
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Things I Like</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="likes" value={this.state.likes}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Things I Don't Like</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="hates" value={this.state.hates}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Favourite movie, book, music, meal...</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="favourites" value={this.state.favourites}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label">Interests</label>
                        <div className="col-lg-9">
                          <input className="form-control" type="text" name="interests" value={this.state.interests}/>
                        </div>
                      </div>
                      <div clasclassNames="form-group row">
                        <label className="col-lg-3 col-form-label form-control-label"></label>
                        <div className="col-lg-9">
                          <input type="reset" className="btn btn-secondary" value="Cancel"/>
                          <input type="button" className="btn btn-primary" value="Save Changes"/>
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
    );
  }
};
