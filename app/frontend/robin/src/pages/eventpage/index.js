import Event from "./event"
import Comment from "./comment"
import Navbar from "../components/navbar/index"
import GuestBar from "../components/guestBar/index"
import React from 'react';
import Location from "../components/map/LocationPicker"

import Cookies from 'js-cookie';
import axios from 'axios';

import "./eventpage.css"

export default class EventPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
    this.handleAddCommentClick = this.handleAddCommentClick.bind(this);
  }

  componentDidMount() {
    // fetch(url).then(response => response.json()).then(comments => this.setState({ comments }));
    this.setState({
      comments: [{
        userName: "Ergun Erdogmus",
        text: "aman aman ne guzel, guzel"
      }, {
        userName: "Ozge Onur",
        text: "vay vay, guzel mı guzel"
      }, {
        userName: "Ozge Onur",
        text: "vay vay, guzel mı guzel"
      }]
    })
  }

  handleAddCommentClick(e){
    // commenti backende atcan
    e.preventDefault();
    this.setState({
      comments: [{
        userName: "Benım bu",
        text: this.state.commentValue
      }, ...this.state.comments]
    });
    console.log(this.state.commentValue);
  }

  handleAddcommentBox(){
    if(Cookies.get("token") === undefined || Cookies.get("token") === ""){
      return(
        <form className="addCommentContainer" action="" onSubmit={e => e.preventDefault()}>
          <h4 className="text-center">You must be logged in to comment</h4>
        </form>
      );
    }
    else{
      return(
        <form className="addCommentContainer" action="" onSubmit={e => e.preventDefault()}>
          <input className="addComment" type="text" value={this.state.commentValue} onChange={e => this.setState({ commentValue: e.target.value })} placeholder="Type..."/>
          <button onClick={e => this.handleAddCommentClick(e)}>Comment</button>
        </form>
      )
    }
  }

  render(){
    return (
      <React.Fragment>
      <div className="mb-70">
        <Navbar currentPath={this.props.location.pathname}/>
      </div>
      <div className="wrapper position-absolute">
        <GuestBar/>
      </div>
      <Event />
     
        <h2></h2>
        <h2 style={{margin:'22px'}}>
        Comments:
        </h2>
        
        
        {this.handleAddcommentBox()}
        {this.state.comments.map(comment => {
          return <Comment userName={comment.userName} text={comment.text} date={Date.now()}/>
        })}
      </React.Fragment>
    );
  }
};