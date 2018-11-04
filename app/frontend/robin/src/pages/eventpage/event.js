import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css";
import borisPhoto from "../homepage/boris.png";
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';


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

                   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                 <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
          </div>

        </div>
        /** 
      <Card>

      <CardBody>
        <CardTitle>Boris Brejcha for Cercle</CardTitle>
        <CardSubtitle>Château de Fontainebleau, 24 Oct 2018</CardSubtitle>
      </CardBody>
      <Row>
      <Col sm="6">
      <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
      </Col>
      <Col sm="6">
      <CardBody>
        <Row>
        <Col sm="9">
        <CardText>Free</CardText>
        </Col>
        <Col sm="3">
        <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
        />
        </Col>
        </Row>
        <CardText>This is the masterpiece of his musical work so far. His unbelievable passion for music combined with the longtime experience as a producer for different genres fuses into this exclusive distinctive and very special sound.</CardText>
        <CardLink href="#">Join</CardLink>
        <CardLink href="#">Send Message</CardLink>
      </CardBody>
      </Col></Row>
      </Card>
      */
      )
    }
  }
