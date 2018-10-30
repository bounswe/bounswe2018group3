import 'bootstrap/dist/css/bootstrap.min.css';
import "./eventpage.css"

import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';


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
            
      <Card>
      <Row>
      <Col sm="1"></Col>

      <Col sm="8">
      <CardBody>
        <Row>
        <Col sm="2">
        <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        </Col>
        <Col sm="6">
        <CardText>User Name</CardText>
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
        <CardText>Good Event.</CardText>
        <CardLink href="#">Card Link</CardLink>
        <CardLink href="#">Another Link</CardLink>
      </CardBody>
      </Col>
      <Col sm="1">
      </Col>
      </Row>      
      </Card>
     
      )
    }
  }