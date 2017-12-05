import React from 'react';
import './matrix.css';

class Square extends React.Component {

    constructor(props){
        super();
        this.state = {
            value: null,
            hidden: props.data.hidden,
            isInput: props.data.isInput,
            rowIndex : props.data.rowIndex,
            columnIndex: props.data.columnIndex,
            highlightText: props.data.highlightText
        };
    }

    handleClick(event){
        if(this.state.hidden){
            var state = {
                value : this.props.value,
                hidden: false
            };
            this.setState(state);
        }
    }

    onEdit(event) {
        //this.state.value = event.target.value;
        var inputValue = (event.target.value);
        this.setState({
            value: inputValue,
            hidden: this.props.data.hidden,
            isInput: this.props.data.isInput,
            rowIndex : this.props.data.rowIndex,
            columnIndex: this.props.data.columnIndex
        });

        var data = {
            value: inputValue,
            rowIndex: this.state.rowIndex,
            columnIndex: this.state.columnIndex
        };
        this.props.handleChange(data);
    }


    renderDemoModeSquare(){
        if(this.state.hidden){
            return (
                <div onClick={this.handleClick.bind(this)} className="square" key={this.props.uniqueKey}>
                   {null} 
                </div>
              );
        }else {
              return (
                <div className="square" key={this.props.uniqueKey}>
                  {this.props.data.value}
                </div>
              );
        }
    }

    renderGameModeSquare(){
        if(this.state.isInput){
            return (
                <div key={this.props.uniqueKey}>
                   <input type="text" className="square" onChange={this.onEdit.bind(this)}/>
                </div>
              );
        }else {
              return (
                <div className="square" key={this.props.uniqueKey}>
                    {this.props.data.value} 
                </div>
              );
        }
    }

   renderResultModeSquare() {
        var direction = this.props.data.direction;
        if(direction){
            return (
                <div>
                    <div style = {{color: this.state.highlightText ? "red" : ""}} className="square" key={this.props.uniqueKey}>
                        { String.fromCharCode(direction) + " " +  this.props.data.value }
                    </div>
                </div>
               
            );
        }else {
            return (
                <div>
                    <div style = {{color: this.state.highlightText ? "red" : ""}} className="square" key={this.props.uniqueKey}>
                        {this.props.data.value}
                    </div>
                </div>
               
            );
        }
      
    }

    render() {
        if(this.props.data.mode === "demo"){
            return this.renderDemoModeSquare();
        } else if(this.props.data.mode === "game"){
            return this.renderGameModeSquare();
        } else if (this.props.data.mode === "result") {
            return this.renderResultModeSquare();
        }
    }
}

export default Square;