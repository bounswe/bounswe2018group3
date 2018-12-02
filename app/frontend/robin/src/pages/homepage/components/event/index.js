import React from 'react';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  
  render() {
  return (
    <div>
    <div class="row">
      <div className="event-container"></div>
      <div class="col">
      <div class="card">
        <div class="card-body">
          <a href="../event">{this.props.title}</a>
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
