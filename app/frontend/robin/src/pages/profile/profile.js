import React from 'react';
import {Redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';
import "./index.css"
import "./index.css"

var exampleProfile = {
  cardInfo: {
    name: "Jane Bishop",
    cardSummary: "I am a professional student designer and i love concerts",
    city: "New York",
    country: "NY",
    birthday: "October 23 1990",
    gender: "Female",
    relationshipStatus: "Single",
    occupation: "Dentist",
    education: "University of Columbia",
    languages: "English, French"
  },
  aboutInfo: {
    about: "I am a dentist in New York looking for company",
    interests: "",
    likes: "I love reading books. I like fishing, yoga, listening to music, and watching movies.",
    hates: "I hate cooking. I don't like swimming that much.",
    favourites: "My favourite book is Martin Eden. My favourite musician is Lana del Rey. I love jazz and blues. My favourite movie is Sirpski",
  }
}

export default class ProfileCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      cardInfo: {
        name: "",
        cardSummary: "",
        city: "",
        country: "",
        birthday: "",
        gender: "",
        relationshipStatus: "",
        occupation: "",
        education: "",
        languages: "",
      },
      aboutInfo: {
        about: "",
        interests: "",
        likes: "",
        hates: "",
        favourites: "",
      }
    }
    this.state = exampleProfile;
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
                    <h4 className="card-title">{this.state.cardInfo.name}</h4>
                    <p className="card-text">{this.state.cardInfo.cardSummary}</p>
                    <div className="address">								
                      <ul>
                        <li> <i className="fa fa-map-marker" aria-hidden="true"></i> {this.state.cardInfo.city}, {this.state.cardInfo.country} </li>
                        <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {this.state.cardInfo.birthday} </li>
                        <li><i className="fa fa-transgender" aria-hidden="true"></i> {this.state.cardInfo.gender} </li>
                        <li><i className="fa fa-heart" aria-hidden="true"></i> {this.state.cardInfo.relationshipStatus} </li>
                        <li><i className="fa fa-university" aria-hidden="true"></i> {this.state.cardInfo.occupation} </li>
                        <li><i className="fa fa-book" aria-hidden="true"></i> {this.state.cardInfo.education} </li>
                        <li><i className="fa fa-comments" aria-hidden="true"></i> {this.state.cardInfo.languages} </li>
                      </ul>								
                    </div>
                    <div class="text-center social-btn">
                        <a href="#" class="btn btn-primary btn-facebook"><i class="fa fa-facebook"></i>&nbsp; facebook</a>
                        <a href="#" class="btn btn-info btn-twitter"><i class="fa fa-twitter"></i>&nbsp; twitter</a>
                        <a href="#" class="btn btn-danger btn-google"><i class="fa fa-google"></i>&nbsp; google</a>
                    </div>
                  </div>
                </div>		
              </div>

              <div class="col-lg-8 col-md-6 order-lg-2">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a href="" data-target="#profile" data-toggle="tab" class="nav-link active">About</a>
                  </li>
                  <li class="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Events</a>
                  </li>
                  <li class="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Friends</a>
                  </li>
                  <li class="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Photos</a>
                  </li>
                  <li class="nav-item">
                    <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Edit</a>
                  </li>
                </ul>
                <div class="tab-content py-4">
                  <div class="tab-pane active" id="profile">
                    <div class="row">
                      <div class="col-md-12">
                        <h5>About</h5>
                        <p> {this.state.aboutInfo.about}</p>
                        <hr/>
                        <h5>Things I like</h5>
                        <p>{this.state.aboutInfo.likes}</p>
                        <hr/>
                        <h5>Things I don't like</h5>
                        <p>{this.state.aboutInfo.hates}</p>
                        <hr/>
                        <h5>Favourite movie, book, music, meal...</h5>
                        <p>{this.state.aboutInfo.favourites}</p>
                        <hr/>
                      </div>
                      <div className="col-md-12">
                        <h5>Interests</h5>
                        <a href="#" class="badge badge-dark badge-pill">html5</a>
                        <a href="#" class="badge badge-dark badge-pill">react</a>
                        <a href="#" class="badge badge-dark badge-pill">codeply</a>
                        <a href="#" class="badge badge-dark badge-pill">angularjs</a>
                        <a href="#" class="badge badge-dark badge-pill">css3</a>
                        <a href="#" class="badge badge-dark badge-pill">jquery</a>
                        <a href="#" class="badge badge-dark badge-pill">bootstrap</a>
                        <a href="#" class="badge badge-dark badge-pill">responsive-design</a>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="edit">
                    <form role="form">
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Name</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value={this.state.cardInfo.name}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Email</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="email" value={this.state.cardInfo.email}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Password</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="password"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Short Summary</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value={this.state.cardInfo.cardSummary}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">City and Country</label>
                        <div class="col-lg-6">
                          <input class="form-control" type="text" value={this.state.cardInfo.city} placeholder="City"/>
                        </div>
                        <div class="col-lg-3">
                          <input class="form-control" type="text" value={this.state.cardInfo.country} placeholder="State"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Birthday</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Gender</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Relationship Status</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Occupation</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value={this.state.cardInfo.occupation}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Education</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value={this.state.cardInfo.education}/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Languages</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value={this.state.cardInfo.education}/>
                        </div>
                      </div>   
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label"></label>
                        <div class="col-lg-9">
                          <input type="reset" class="btn btn-secondary" value="Cancel"/>
                          <input type="button" class="btn btn-primary" value="Save Changes"/>
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
