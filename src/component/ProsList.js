import React, { Component } from 'react';
import { connect } from 'react-redux';
import { prosAction, dropAction, dragStartAction } from '../store/actions/prosAction';


class ProsList extends Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
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
        // this.dragged.parentNode.removeChild(this.placeholder);
        
        // update state
        let data = this.props.pros.list;
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
                <div className="pros-content">
                    <ol className="pros-list">
                        {
                            this.props.pros.list.map((pro, index) => {
                                return (
                                    <li
                                    className="inp"
                                    id={`pro-${index}`}
                                    data-id={index}
                                    draggable="true"
                                    onDrop={(e) => {this.drop(e)}}
                                    key={index}                                
                                    onDragEnd={this.dragEnd.bind(this)}
                                    onDragStart={this.dragStart.bind(this)} >
                                        <input onChange={(e) => {this.handleChange(e, index)}} value={pro.text} />
                                    </li>
                                ) 
                            })
                        }
                    </ol>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        pros: state.pros
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchChange: (text, id) => dispatch((prosAction(text, id))),
        dispatchDragStart: (desiredId, text) => dispatch(dragStartAction(desiredId, text)),
        dispatchDrop: (text, id) => dispatch((dropAction(text, id)))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProsList);