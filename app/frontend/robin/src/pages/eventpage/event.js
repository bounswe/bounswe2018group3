import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css"

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

      <Card>

      <CardBody>
        <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
      </CardBody>
      <Row>
      <Col sm="6">
      <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
      </Col>
      <Col sm="6">
      <CardBody>
        <Row>
        <Col sm="9">
        <CardText>For Free</CardText>
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
        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
        <CardLink href="#">Card Link</CardLink>
        <CardLink href="#">Another Link</CardLink>
      </CardBody>
      </Col></Row>
      </Card>
      )
    }
  }
