import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import axios from 'axios';
import './matrix.css';

class AlignmentMatrix extends React.Component {
    
    constructor(props) {
            super(props);
            
            //Solution matrix that we obtained from the backend
            this.solutionMatrix = props.data.matrix;

            //This is the matrix for display on the UI
            this.matrix = undefined;
            this.prepareMatrix();

            //This matrix holds the values that use has entered in the "game" mode
            this.userMatrix = this.initializeInputMatrix();

            this.directionCells = this.getDirectionCells();
            
            this.state = {
                mode : props.data.mode
            };
    }

    initializeInputMatrix() {
        /*var inputMatrix = [];
        for(var i = 0 ; i < this.matrix.length; i++){
            var row = [];
            for(var j = 0 ; j < this.matrix[0].length; j++){
                row.push(0);
            }
            inputMatrix.push(row);
        }*/

        var inputMatrix = new Array(this.matrix.length);
        for (let i = 0; i < this.matrix.length; i++) {
            inputMatrix[i] = new Array(this.matrix[0].length);
        }

        return inputMatrix;
    }

    verifySolution(){
        var i = 0;
        var failed = false;
        var userMatrix = this.userMatrix;
        var row;
        var incorrectUserValues = 0;
        var incorrectValueDataArray = [];
        var userScore = 0;
        /*
        //Create a new object
        var matrixSpliced = [];
        for(i = 0; i < userMatrix.length; i++){
            row = userMatrix[i].slice();

            row.splice(0,1);
            matrixSpliced.push(row);
        }

        //Remove the first row
        matrixSpliced.splice(0,1);
        */
        console.log(this.solutionMatrix);
        console.log(userMatrix);
        //Check for correctness
        for(i = 1 ; i < this.solutionMatrix.length; i++){
            for(var j = 1 ; j < this.solutionMatrix[0].length; j++){
                if(this.solutionMatrix[i][j] !== userMatrix[i][j]){
                    failed = true;
                    incorrectUserValues++;
                    let incorrectValueData = {
                        row: i,
                        column: j,
                        correcValue: this.solutionMatrix[i][j],
                        incorrectValue: userMatrix[i][j]
                    };
                    incorrectValueDataArray.push(incorrectValueData);
                }
            }
        }
        console.log(incorrectUserValues);
        userScore = 100 - (incorrectUserValues * 100 / ((userMatrix.length - 1) * (userMatrix[0].length - 1)));
        var result = {
            userScore: userScore,
            incorrectValueDataArray: incorrectValueDataArray
        };
        console.log(result);
        return result;
    }
    
    prepareMatrix() {
    		console.log(this.props.data);
    		var response = this.props.data;
           

            const query = response.query;
            const database = response.database;
            const alignmentType = response.type;
            const gap = response.gap;
            const matrixValues = response.matrix;
            
            this.matrix = this.initializeMatrix(query, database, alignmentType, gap, matrixValues);

    }

	initializeMatrix(query, database, alignmentType, gap, matrixValues) {
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

    isElementHidden(rowIndex, columnIndex, element) {
        if(this.props.data.mode === "demo"){
            if( rowIndex === 0 || columnIndex === 0 || 
                rowIndex === 1 || columnIndex === 1 ||
                isNaN(element) || element === " "){
                return false;
            } else {
                return true;
            }
        } else if(this.props.data.mode === "game"){
            if( rowIndex === 0 || columnIndex === 0 ||
                isNaN(element) || element === " "){
                return false;
            }else {
                return true;
            }
        }
    }

    handleSubmit(){
        const apiBaseUrl = "http://192.168.0.4:4200/";
        var payload = this.props.data;

        //ADD USER SCORE HERE
        var verifySolutionResult = this.verifySolution();
        payload.userScore = verifySolutionResult.userScore;
        console.log(verifySolutionResult);
        //var failed = this.verifySolution();
        alert(`User Score = ${payload.userScore}`);
        axios.post(apiBaseUrl + 'updateGameScore', payload)
            .then((response) => {
                console.log(response.status);
            }); 
    }

    onCellValueChange(cell) {
        if (isNaN(cell.value)) {
            alert(`Please enter a number at row: ${cell.rowIndex + 1} and column ${cell.columnIndex + 1}`);
            return;
        }
        var inputMatrix = this.userMatrix;
        inputMatrix[cell.rowIndex][cell.columnIndex] = cell.value;
    }

    getDirectionCells() {
        var cells = [];
        let directionRowIndexStart = this.props.data.startOfDirectionString.row + 1;
        let directionColumnIndexStart = this.props.data.startOfDirectionString.column + 1;
        let directionValues = this.props.data.directionString.split("");

        for(var i = 0 ; i < directionValues.length;i++){

            var cell = {
                row:directionRowIndexStart,
                column: directionColumnIndexStart,
                direction: undefined
            };
            var direction = undefined;
            var directionCode = directionValues[i];
            if(directionCode === "d"){
                cell.direction = 8598;
                directionRowIndexStart--;
                directionColumnIndexStart--;
            }else if(directionCode === "u"){
                cell.direction = 8593;
                directionRowIndexStart--;
            }else if(directionCode === "l"){
                cell.direction = 8592;
                directionColumnIndexStart--;
            }
            cells.push(cell);
        }

        return cells;
    }

    getDirectionValue(row, column) {
        var cells = this.directionCells;
        var direction = undefined;
        for(var i = 0; i < cells.length; i++){
            var cellRow = cells[i].row;
            var cellColumn = cells[i].column;

            if(cellRow === row && cellColumn === column){
                direction = cells[i].direction;
            }
        }

        return direction;
    }
    
    render(){
    
        let mode = this.props.data.mode;
        let rowIndex;
        let columnIndex;
        let getHiddenStatus = this.isElementHidden.bind(this);
        let onChangeHandler = this.onCellValueChange.bind(this);

        let fetchDirectionValue = this.getDirectionValue.bind(this);

        return (
                <div>
                    <div className="alignment-matrix">
                    {    
                        this.matrix.map(function(row, i){
                            rowIndex = i;
                            return <div className="board-row"> 
                                        { 
                                            row.map(function(element,j){
                                                columnIndex = j;
                                                var cell;
                                                if(mode === "demo"){
                                                    cell = {
                                                        value: element,
                                                        hidden: getHiddenStatus(rowIndex, columnIndex, element),
                                                        mode: mode,
                                                        rowIndex: rowIndex,
                                                        columnIndex: columnIndex
                                                    };
                                                } else if (mode === "result") {
                                                    var directionValue = fetchDirectionValue(rowIndex, columnIndex);
                                                    cell = {
                                                        value: element,
                                                        mode: mode,
                                                        rowIndex: rowIndex,
                                                        columnIndex: columnIndex,
                                                        direction: directionValue
                                                    }
                                                } else {
                                                    cell = {
                                                        value: element,
                                                        isInput: getHiddenStatus(rowIndex, columnIndex, element),
                                                        mode: mode,
                                                        rowIndex: rowIndex,
                                                        columnIndex: columnIndex
                                                    };
                                                }
                                                
                                                return <Square data={cell} handleChange={onChangeHandler}/>
                                            }) 
                                        }
                                    </div>
                        })
                    }
                    </div>
                    <div className={(this.state.mode === "demo" || this.state.mode === "result") ? "hidden" : ""}>
                        <button onClick={this.handleSubmit.bind(this)}>
                            Submit!
                        </button>
                    </div>

                </div>
            );
    }
}

export default AlignmentMatrix;