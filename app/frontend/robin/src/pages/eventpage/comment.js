import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css"

import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


  export default class Comment extends React.Component {

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
            <div class="row">
            <div class="col-sm-1"></div>

              <div class="col-sm-8">
             <div class="card-body">
             <div class="row">
        <div class="col-sm-2">
        <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        </div>
        <div class="col-sm-6">
        <div class="card-text">User Name</div>
        </div>
        <div class="col-sm-3">
          <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
            />
        </div>
        </div>
        <div class="card-text">Good Event.</div>
        <a href="#">Card Link</a>
        <a href="#">Another Link</a>
      </div>
      </div>
      <div class="col-sm-1">
      </div>
      </div>      
        </div>
      )
    }
  }
