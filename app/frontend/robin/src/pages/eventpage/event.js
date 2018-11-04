import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css";
import borisPhoto from "../homepage/boris.png";
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


  export default class Event extends React.Component {

    constructor(props){
      super(props);
      this.state = {
          rating: 1
      }
      this.onStarClick = this.onStarClick.bind(this);
    }
    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }
  
    render() {
      const { rating } = this.state;

        return (

          <div class="card">
          <h3 class="card-title" style={{marginTop:'30px', marginBottom:'30px'}}>Card title</h3>
          <div class="row">
            <div class="col-sm-6">
              <img class="card-img-top img-fluid shadow-lg bg-white" src={borisPhoto} alt="Card image cap" style={{marginBottom:'20px', maxWidth:'100%',height:'auto'}}/>
            </div>
            <div class="col-sm-6">
            <div class="card-body">
                <div class="row" style={{marginLeft:'20px'}}>
                  <div class="col-sm-10">
                    Price:
                  </div>
                  <div class="col-sm-2">
                  <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                  />  
                  </div>
                </div>
                <div class="row" style={{marginLeft:'15px'}}>
                  <div class="col-sm-10">
                  Date-Time :
                  </div>
                  <div class="col-sm-2">
                  User
                  </div>
                </div>

                <div class="row" style={{marginTop: '15px'}}>
                <div class="col-sm-12">
                <p class="card-text shadow-sm bg-white rounded" style={{marginLeft:'30px', marginRight:'30px', marginTop:'20px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet quam in sem molestie semper. Integer et tellus vitae neque viverra mattis sit amet ut orci. Praesent blandit urna justo, in viverra magna dapibus a. Nunc et consequat augue. Cras id dolor lectus. Nam blandit tristique leo interdum tristique. Nunc at elit enim. Phasellus ut est condimentum, molestie odio tincidunt, malesuada neque. Nulla ligula eros, semper in efficitur ut, tempor et turpis.</p>
                </div>
                </div>
                 <a href="#" class="btn btn-primary" style={{marginLeft:'30px', marginTop:'30px'}}>Join Event</a>
            </div>
            </div>
          </div>

        </div>
      )
    }
  }
