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
          <h3 class="card-title">Card title</h3>
          <div class="row">
            <div class="col-sm-6">
              <img class="card-img-top" src={borisPhoto} alt="Card image cap" />
            </div>
            <div class="col-sm-6">
            <div class="card-body">
                <div class="row">
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
                <div class="row">
                  <div class="col-sm-10">
                  Date-Time :
                  </div>
                  <div class="col-sm-2">
                  User
                  </div>
                </div>

                <div class="row" style={{marginTop: '10px'}}>
                <div class="col-sm-12">
                <p class="card-text">Description : Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                </div>
                </div>
                 <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
          </div>

        </div>
      )
    }
  }
