import React from 'react';
import Cookies from 'js-cookie';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleEventClick = this.handleEventClick.bind(this);
  }
  handleEventClick(e){
    console.log("Clicked");
    Cookies.set("clickedEvent", this.props.id);
  }


  render() {
  return (
    <div>
    <div class="row">
      <div className="event-container"></div>
      <div class="col">
      <div class="card">
        <div class="card-body">
          <a href="../event" onClick={e => this.handleEventClick(e)}>{this.props.title}</a>
          <div class="card-title">{this.props.subtitle}</div>
        </div>
        <img width="100%" src={this.props.eventPhoto} alt="Card image cap" />
        <div class="card-body">
          <div class="card-text">{this.props.eventDetails}</div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
  }
}
