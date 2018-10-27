import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, CardBody, CardSubtitle, CardLink } from 'reactstrap';

export default class EventComp extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
  return (
    <div>
    <Row>
      <Col>
      <Card>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.subtitle}</CardSubtitle>
        </CardBody>
        <img width="100%" src={this.props.eventPhoto} alt="Card image cap" />
        <CardBody>
          <CardText>{this.props.eventDetails}</CardText>
          <CardLink href="#">Event Tickets</CardLink>
          <CardLink href="#">Detailed Info</CardLink>
        </CardBody>
      </Card>
      </Col>
    </Row>
    </div>
  );
  }
}