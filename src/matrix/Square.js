import React from 'react';
import ReactDOM from 'react-dom';
import './matrix.css';

class Square extends React.Component {

    constructor(){
        super();
        this.state = {
            bg_color: "white"
          }
    }

    handleClick(event){
        if(this.state.bg_color === "white" || this.state.bg_color === "green"){
            this.setState({bg_color : "red"})
        }else if(this.state.bg_color === "red"){
            this.setState({bg_color : "green"})
        }
    }
    
    render() {
        if(isNaN(this.props.data) || this.props.data === " "){
            return (
                <div style={{backgroundColor: this.state.bg_color}} className="square" key={this.props.uniqueKey}>
                  {this.props.data}
                </div>
              );
        }else {
              return (
                <div style={{backgroundColor: this.state.bg_color}} onClick={this.handleClick.bind(this)} className="square" key={this.props.uniqueKey} contentEditable>
                  {this.props.data}
                </div>
              );
        }
    }
}

export default Square;