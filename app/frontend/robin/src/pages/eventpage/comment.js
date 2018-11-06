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
            <div class="card-body">
            <div class="row">
            <div class="col-sm-2">
              <img width="100%" class="rounded-circle" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            </div>
            <div class="col-sm-10">
            <div class="row"> 
            <div class="col-sm-10">
            <div class="card-title">User Name</div>
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
            <p class="card-text shadow-sm bg-white rounded" style={{marginRight:'30px', marginTop:'20px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet quam in sem molestie semper. Integer et tellus vitae neque viverra mattis sit amet ut orci. Praesent blandit urna justo, in viverra magna dapibus a. Nunc et consequat augue. Cras id dolor lectus. Nam blandit tristique leo interdum tristique. Nunc at elit enim. Phasellus ut est condimentum, molestie odio tincidunt, malesuada neque. Nulla ligula eros, semper in efficitur ut, tempor et turpis.</p>
            </div>
            </div>
          </div>
        </div>
      )
    }
  }
