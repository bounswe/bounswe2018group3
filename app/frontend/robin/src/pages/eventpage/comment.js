import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css"

import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const dateTimeFormat = new Intl.DateTimeFormat("en-EN", { hour: "numeric", minutes: "numeric", month: "numeric", year: "numeric" })

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
      const { pp, userName, text, date } = this.props;
      const { rating } = this.state;

        return (
          <div class="card">
            <div class="card-body">
            <div class="row">
            <div class="col-sm-2">
              <img width="80%" class="rounded-circle" src={pp} alt="Card image cap" />
            </div>
            <div class="col-sm-10">
            <div class="row"> 
            <div class="col-sm-10">
            <div class="card-title">{ userName } - { dateTimeFormat.format(date) }</div>
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
            <p class="card-text shadow-sm bg-white rounded" style={{marginRight:'30px', marginTop:'20px'}}>{ text }</p>
            </div>
            </div>
          </div>
        </div>
      )
    }
  }
