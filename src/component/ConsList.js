import React, { Component } from 'react';
import { connect } from 'react-redux';
import { consAction, dragStartAction, dropAction } from '../store/actions/consAction';

class ConsList extends Component {

    constructor(props) {
        super(props);
        this.placeholder = document.createElement("li");
        this.placeholder.className = "placeholder";
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, index) {
        this.props.dispatchChange(e.target.value, index);
    }


    dragStart(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.dragged);
      }
      dragEnd(e) {
        this.dragged.style.display = 'block';
        this.dragged.parentNode.removeChild(this.placeholder);
        
        // update state
        let data = this.props.cons.list;
        let from = Number(this.dragged.dataset.id);
        let to = Number(this.over.dataset.id);
        if(from < to) to--;
        data.splice(to, 0, data.splice(from, 1)[0]);
        this.props.dispatchDrop(data);
      }
      dragOver(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.target.className === 'placeholder') return;
        this.over = e.target;
        e.target.parentNode.insertBefore(this.placeholder, e.target);
      }
      drop(e) {
          this.forceUpdate();
      }

    render() {
            return (
                <div className="container">
                <div className="cons-content">
                    <ol className="cons-list" onDragOver={this.dragOver.bind(this)}>
                        {
                            this.props.cons.list.map((con, index) => {
                                return (
                                    <li 
                                    className="inp"
                                    id={`con-${index}`}
                                    key={index}                                
                                    data-id={index}
                                    draggable="true"
                                    onDrop={(e) => {this.drop(e)}}
                                    onDragEnd={this.dragEnd.bind(this)}
                                    onDragStart={this.dragStart.bind(this)} >
                                        <input onChange={(e) => {this.handleChange(e, index)}} value={con.text} />
                                    </li>
                                ) 
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cons: state.cons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchChange: (text, id) => dispatch(consAction(text, id)),
        dispatchDragStart: (desiredId, text) => dispatch(dragStartAction(desiredId, text)),
        dispatchDrop: (data) => dispatch(dropAction(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConsList);