import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import './matrix.css';

class AlignmentMatrix extends React.Component {
    
    constructor(props) {
            super(props);
            this.matrix = undefined;
            this.state = {
                color : "white"
            }
    }
    
    prepareMatrix() {
            const SPACE =  " ";
            const EMPTY = "";
    
            const databaseSeq = "ACGT";
            const querySeq = "ACGT";
            this.matrix = [];
    
            var dbSequenceRow = databaseSeq.split(EMPTY);
            dbSequenceRow.unshift(SPACE);
    
            var querySequenceColumn = querySeq.split(EMPTY);
    
            for(var i = 0 ; i < this.props.data.length; i++){
                this.matrix.push(JSON.parse(JSON.stringify(this.props.data[i])));
            }
    
            for(i = 0 ; i < querySequenceColumn.length; i++){
                this.matrix[i].unshift(querySequenceColumn[i]);
            }
    
            this.matrix.unshift(dbSequenceRow);
        }
    
        renderSquare(val) {
            return <Square data={val} />;
        }
    
        render(){
    
            this.prepareMatrix();
            
    
            return (
                    <div className="alignment-matrix">
                    {    
                        this.matrix.map(function(row, i){
                            return <div className="board-row"> 
                                        { 
                                            row.map(function(element,i){
                                                return <Square data={element} />
                                            }) 
                                        }
                                    </div>
                        })
                    }
                    </div>
                );
    }
}

export default AlignmentMatrix;