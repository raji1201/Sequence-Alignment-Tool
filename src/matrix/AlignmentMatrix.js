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
    		console.log(this.props.data);
    		var response = this.props.data;
            /*const SPACE =  " ";
            const EMPTY = "";
    
            const databaseSeq = "ACGT";
            const querySeq = "ACGT";
            this.matrix = [];
    
            var dbSequenceRow = databaseSeq.split(EMPTY);
            dbSequenceRow.unshift(SPACE);
    		


            var querySequenceColumn = querySeq.split(EMPTY);
            querySequenceColumn = querySequenceColumn.unshift(SPACE);
    
            for(var i = 0 ; i < response.matrix.length; i++){
                this.matrix.push(response.matrix[i]);
            }
    
            for(i = 0 ; i < querySequenceColumn.length; i++){
                this.matrix[i].unshift(querySequenceColumn[i].unshift(SPACE));
            }
    
            this.matrix.unshift(dbSequenceRow);*/

            const query = response.query;
            const database = response.database;
            const alignmentType = response.type;
            const gap = response.gap;
            const matrixValues = response.matrix;
            
            this.matrix = this.initializeMatrix(query, database, alignmentType, gap, matrixValues);

        }

	    initializeMatrix (query, database, alignmentType, gap, matrixValues)  {
	    	var matrix = matrixValues;

	    	var queryColumn = query.split("");
	    	queryColumn.unshift(" ", " ");
 
	    	var databaseRow = database.split("");
	    	databaseRow.unshift(" ");

	    	matrix.unshift(databaseRow);

	    	for (let i = 0; i < matrix.length; i++) {
	    		matrix[i].unshift(queryColumn[i]);
	    	}

	    	return matrix;
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