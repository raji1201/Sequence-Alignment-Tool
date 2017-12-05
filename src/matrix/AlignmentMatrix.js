import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Square from './Square';
import axios from 'axios';
import TextField from 'material-ui/TextField';
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
                mode : props.data.mode,
                showResultMatrix: false,
                incorrectValueSet: undefined,
                gameAlignedQuery: '',
                gameAlignedDB: ''
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
        //var failed = false;
        var userMatrix = this.userMatrix;
        var incorrectUserValues = 0;
        var incorrectValueDataArray = [];
        var incorrectValueSet = new Set();
        var userScore = 0;
        
        console.log(this.solutionMatrix);
        console.log(userMatrix);
        //Check for correctness
        for(i = 1 ; i < this.solutionMatrix.length; i++){
            for(var j = 1 ; j < this.solutionMatrix[0].length; j++){
                if(this.solutionMatrix[i][j] !== userMatrix[i][j]){
                    incorrectUserValues++;
                    let incorrectValueData = {
                        row: i,
                        column: j,
                        correcValue: this.solutionMatrix[i][j],
                        incorrectValue: userMatrix[i][j]
                    };
                   
                    incorrectValueSet.add(i+"_"+j);

                    incorrectValueDataArray.push(incorrectValueData);
                }
            }
        }
        this.setState({
            incorrectValueSet: incorrectValueSet
        });

        userScore = 100 - (incorrectUserValues * 100 / ((userMatrix.length - 1) * (userMatrix[0].length - 1)));
        var result = {
            userScore: userScore,
            incorrectValueDataArray: incorrectValueDataArray
        };

        this.setState({
            showResultMatrix: true
        });

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

        if (!this.verifyUserMatrixValues()) {
            alert("Please completely fill the game mode matrix");
            return;
        }

        const apiBaseUrl = "http://192.168.0.4:4200/";
        var payload = this.props.data;

        //ADD USER SCORE HERE
        var verifySolutionResult = this.verifySolution();

        payload.userScore = verifySolutionResult.userScore;
        console.log(verifySolutionResult);
        axios.post(apiBaseUrl + 'updateGameScore', payload)
            .then((response) => {
                console.log(response.status);
            }); 
    }

    onCellValueChange(cell) {
        if (cell.value == '-') {
            return;    
        }

        if (isNaN(cell.value)) {
            alert(`Please enter an integer at row: ${cell.rowIndex + 1} and column ${cell.columnIndex + 1}`);
            return;
        }
        var inputMatrix = this.userMatrix;
        inputMatrix[cell.rowIndex][cell.columnIndex] = Number(cell.value);
    }

    getDirectionCode(code){
        if(code === "d"){
            return 8598;  
        }else if(code === "u"){
            return 8593;
        }else if(code === "l"){
            return 8592;
        }

    }

    getDirectionCells() {
        var cells = [];
        let directionRowIndexStart = this.props.data.startOfDirectionString.row + 1;
        let directionColumnIndexStart = this.props.data.startOfDirectionString.column + 1;
        let directionValues = undefined;
        var directionString = this.props.data.directionString;

        if(directionString.length > 1) {
            directionValues = this.props.data.directionString.split("");
            for(var i = 0 ; i < directionValues.length;i++){
                var cell = {
                    row:directionRowIndexStart,
                    column: directionColumnIndexStart,
                    direction: undefined
                };
                //var direction = undefined;
                var directionCode = directionValues[i];
                if(directionCode === "d"){
                    cell.direction = this.getDirectionCode(directionCode);
                    directionRowIndexStart--;
                    directionColumnIndexStart--;
                }else if(directionCode === "u"){
                    cell.direction = this.getDirectionCode(directionCode);
                    directionRowIndexStart--;
                }else if(directionCode === "l"){
                    cell.direction = this.getDirectionCode(directionCode);
                    directionColumnIndexStart--;
                }
                cells.push(cell);
            }
        }else if (directionString.length === 1) {
            var cell = {
                row:directionRowIndexStart,
                column: directionColumnIndexStart,
                direction: this.getDirectionCode(directionString)
            };
            cells.push(cell);
        }

        return cells;
    }

    verifyUserMatrixValues() {
        for (let i = 1; i < this.userMatrix.length; i++) {
            for (let j = 1; j < this.userMatrix[0].length; j++) {
                if(isNaN(this.userMatrix[i][j])) {
                    return false;
                }
            }
        } 
        return true;
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
    
    checkIncorrectValue(row, column) {
        return this.state.incorrectValueSet.has(row+"_"+column);
    }

    unhideResultMatrix() {
        if (this.state.showResultMatrix) {
            let mode = "result";
            let rowIndex;
            let columnIndex;
            let getHiddenStatus = this.isElementHidden.bind(this);
            let onChangeHandler = this.onCellValueChange.bind(this);

            let fetchDirectionValue = this.getDirectionValue.bind(this);
            let incorrectValueSet = this.checkIncorrectValue.bind(this);
            let score = this.props.data.score;
            let userScore = this.props.data.userScore;

            return (<div className={(this.state.showResultMatrix) ? "" : "hidden"}>
                        <div className="alignment-matrix">
                            {   
                                this.matrix.map((row, i) => {
                                    rowIndex = i;
                                    return <div className="board-row"> 
                                                { 
                                                    row.map((element,j) => {
                                                        console.log(this.state.incorrectValueSet);
                                                        columnIndex = j;
                                                        var cell;
                                                        var directionValue = fetchDirectionValue(rowIndex, columnIndex);
                                                        cell = {
                                                            value: element,
                                                            mode: mode,
                                                            rowIndex: rowIndex,
                                                            columnIndex: columnIndex,
                                                            direction: directionValue,
                                                            highlightText: incorrectValueSet(rowIndex, columnIndex)
                                                        };
                                                                                                                 
                                                        return <Square data={cell} handleChange={onChangeHandler}/>
                                                    }) 
                                                }
                                            </div>
                                })
                            }
                            </div>
                            <br />
                            <div className="res">
                                Score : {score}<br />
                                User Score : {userScore}<br />
                                Query Alignment : {this.gameAlignedQuery}<br />
                                Database Alignment : {this.gameAlignedDB}
                            </div>
                    </div>);
        }
    }
    render(){
    
        let mode = this.props.data.mode;
        let alignedDatabase;
        let alignedQuery;
        let score;
        if(this.props.data.mode === "result")
        {
            alignedDatabase = this.props.data.alignedDatabase.toUpperCase();
            alignedQuery = this.props.data.alignedQuery.toUpperCase();
            score = this.props.data.score;
        }

        if(this.props.data.mode === "game")
        {
            this.gameAlignedQuery = this.props.data.alignedQuery.toUpperCase();
            this.gameAlignedDB = this.props.data.alignedDatabase.toUpperCase();   
        }
        let rowIndex;
        let columnIndex;
        let getHiddenStatus = this.isElementHidden.bind(this);
        let onChangeHandler = this.onCellValueChange.bind(this);

        let fetchDirectionValue = this.getDirectionValue.bind(this);
        let incorrectValueSet = this.checkIncorrectValue.bind(this);
        return (
                <div>
                    <div className="alignment-matrix">
                    {    
                        this.matrix.map((row, i) => {
                            rowIndex = i;
                            return <div className="board-row"> 
                                        { 
                                            row.map((element,j) => {
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
                    <br />
                    <div className="res">
                        {(this.state.mode === "result") ? "Score : " + score: ""}<br />
                        {(this.state.mode === "result") ? "Query Alignment : " + alignedQuery: ""}<br />
                        {(this.state.mode === "result") ? "Database Alignment : " + alignedDatabase: ""}
                    </div>
                    <div className={(this.state.mode === "demo" || this.state.mode === "result") ? "hidden" : ""}>
                        <RaisedButton onClick={this.handleSubmit.bind(this)} label = "Check Correctness" primary={true} />
                    </div>
                    <br />
                    <br />
                    {this.unhideResultMatrix()}
                    <br />
                    <br />
                </div>
            );
    }
}

export default AlignmentMatrix;