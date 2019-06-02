import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 


class Comments extends Component {

  constructor() {
    super();
		
    this.state = {
       editing: false
    }

    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  };

  edit() {
    this.setState({editing:true});
  };

  remove() {
    this.props.deleteFromBoard(this.props.index);
  };

  save() {
    this.props.updatedCommentText(this.refs.newText.value,this.props.index);
    this.setState({editing:false});
  };

  renderNormal() {
    return (
      <div className="border border-primary">
        <div className="badge badge-secondary">{this.props.children}</div><br/>
        <button className="btn-primary" onClick={this.edit}>Edit</button><br/>
        <button className="btn-danger" onClick={this.remove}>Remove</button><br/>
      </div>
    ); 
  };
  renderForm() {
    return (
      <div className="border border-primary">
        <textarea ref="newText" defaultValue={this.props.children}></textarea>
        <button className="btn-success" onClick={this.save}>Save</button><br/>
      </div>
    ); 
  }

  render() {
    if(this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderNormal();
    }
  }
}

class Board extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {
      comments : [
        //'My Name Is Sajeev Sasidharan',
        //'I like ice cream',
        //'We have enough comments'
      ]
    }
    
    this.eachComment = this.eachComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
  };

  removeComment(i){
    var  arr = this.state.comments;
    arr.splice(i,1);
    this.setState({comments:arr});
  };

  /*updateComment = (nexText, i)=> {
    var  arr = this.state.comments;
    arr[i] = nexText;
    this.setState({comments:arr});
  }*/
  
  updateComment(nexText, i) {
    var  arr = this.state.comments;
    arr[i] = nexText;
    this.setState({comments:arr});
  };

  addNewComment(text) {
    var  arr = this.state.comments;
    arr.push(text);
    this.setState({comments:arr});
  }

  eachComment(text, i) {
    return (
      <Comments key = {i} index={i} updatedCommentText ={this.updateComment} deleteFromBoard = {this.removeComment}>
        {text}
      </Comments>
    );
  };

   render() {
    return(
      <div>
        <button className="button-info" onClick={this.addNewComment.bind(null,'Default Text')}>Add New Comment</button>
        <div className="container">
          {this.state.comments.map(this.eachComment)}
        </div>
      </div>
      );
  }
}

export default Board;