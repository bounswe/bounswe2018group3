import React from 'react';
import {Redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import 'font-awesome/css/font-awesome.min.css';
import Cookies from 'js-cookie';
import "./index.css"
import "./index.css"

export default class ProfileCard extends React.Component{

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
                    <h4 className="card-title">John Niro Yumang</h4>
                    <p className="card-text">I am a professional student designer and i love concerts</p>
                    <div className="address">								
                      <ul>
                        <li> <i className="fa fa-map-marker" aria-hidden="true"></i> Pampanga, Phillippines </li>
                        <li><i className="fa fa-university" aria-hidden="true"></i> University of the Phillippines </li>
                        <li><i className="fa fa-heart" aria-hidden="true"></i> Single </li>
                        <li><i className="fa fa-calendar-o" aria-hidden="true"></i> October 23 1990 </li>
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
                        <h4>About</h4>
                        <p> Web Designer, UI/UX Engineer</p>
                        <h5>Hobbies</h5>
                        <p>Indie music, skiing and hiking. I love the great outdoors.</p>
                      </div>
                      <div className="col-md-12">
                        <h5>Favourite tags</h5>
                        <a href="#" class="badge badge-dark badge-pill">html5</a>
                        <a href="#" class="badge badge-dark badge-pill">react</a>
                        <a href="#" class="badge badge-dark badge-pill">codeply</a>
                        <a href="#" class="badge badge-dark badge-pill">angularjs</a>
                        <a href="#" class="badge badge-dark badge-pill">css3</a>
                        <a href="#" class="badge badge-dark badge-pill">jquery</a>
                        <a href="#" class="badge badge-dark badge-pill">bootstrap</a>
                        <a href="#" class="badge badge-dark badge-pill">responsive-design</a>
                      </div>
                      <div class="col-md-12">
                        <h5 class="mt-2"><span class="fa fa-clock-o ion-clock float-right"></span> Recent Activity</h5>
                        <table class="table table-sm table-hover table-striped">
                          <tbody>                                    
                            <tr>
                              <td>
                                <strong>Abby</strong> joined ACME Project Team in <strong>`Collaboration`</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Gary</strong> deleted My Board1 in <strong>`Discussions`</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Kensington</strong> deleted MyBoard3 in <strong>`Discussions`</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>John</strong> deleted My Board1 in <strong>`Discussions`</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Skell</strong> deleted his post Look at Why this is.. in <strong>`Discussions`</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="edit">
                    <form role="form">
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">First name</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value="Jane"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Last name</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value="Bishop"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Email</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="email" value="email@gmail.com"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Company</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value=""/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Website</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="url" value=""/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Address</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value="" placeholder="Street"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label"></label>
                        <div class="col-lg-6">
                          <input class="form-control" type="text" value="" placeholder="City"/>
                        </div>
                        <div class="col-lg-3">
                          <input class="form-control" type="text" value="" placeholder="State"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Time Zone</label>
                        <div class="col-lg-9">
                          <select id="user_time_zone" class="form-control" size="0">
                            <option value="Hawaii">(GMT-10:00) Hawaii</option>
                            <option value="Alaska">(GMT-09:00) Alaska</option>
                            <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                            <option value="Arizona">(GMT-07:00) Arizona</option>
                            <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                            <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                            <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                            <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Username</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="text" value="janeuser"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Password</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="password" value="11111122333"/>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Confirm password</label>
                        <div class="col-lg-9">
                          <input class="form-control" type="password" value="11111122333"/>
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
