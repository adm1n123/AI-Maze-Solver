class Maze {
    constructor(mazeID, rows, cols, wallProb) {
        this.mazeID = mazeID;
        this.rows = rows;
        this.cols = cols;

        this.maze = [[]];
        this.isSearching = false;
        this.isGenerating = false;
        this.wallProb = wallProb ;
        // all the paths will be stored in this.
        this.path = [];
        this.pathToDraw = [];
    }

    getMazeID() {
        return this.mazeID;
    }

    getNumberOfRows() {

    }

    getNumberOfCols() {

    }

    getIsSearching() {
        return this.isSearching;
    }

    setIsSearching(bool) {
        if (typeof bool === 'boolean') {
            this.isSearching = bool;
        } else {
            alert("at set searching Invalid params");
        }
    }
    getIsGenerating() {
        return this.isGenerating;
    }
    setIsGenerating(bool) {
        this.isGenerating = bool;
    }

    isVisited(cell) {
        // return true false
    }


    getSourceCell() {
        // return source cell.
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === SOURCE) {
                    return this.maze[row][col];
                }
            }
        }
        return null;
    }

    hasSourceCell() {
        return this.getSourceCell() !== null;
    }

    setSourceCell(source) {
        // set source cell.
        this.maze[source.row][source.col].state = SOURCE;
        this.setCellState(this.maze[source.row][source.col], SOURCE);
    }

    isSourceCell(cell) {
        return cell.state === SOURCE;
    }

    clearSourceCell() {
        // remove the source class from cell
    }

    isDestinationCell(cell) {
        return cell.state === DESTINATION;
    }

    getDestinationCells() {
        // return list of destination cells
        let destinations = new Set();
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === DESTINATION) {
                    destinations.add(this.maze[row][col]);
                }
            }
        }
        return destinations;
    }

    getOneDestinationCell() {
        // return one of destination cells
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === DESTINATION) {
                    return this.maze[row][col];
                }
            }
        }
        return null;
    }

    setDestinationCells(destinationList) {
        // set list of destination cells
        let array = Array.from(destinationList);
        let self = this;
        array.forEach((destination) => {
            self.maze[destination.row][destination.col].state = DESTINATION;
            self.setCellState(this.maze[destination.row][destination.col], DESTINATION);
        });
    }

    hasDestinationCell() {
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === DESTINATION) {
                    return true;
                }
            }
        }
        return false;
    }

    isAllDestinationsReached() {
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === DESTINATION &&
                    this.maze[row][col].heuristics.state === NEW) {
                    return false;
                }
            }
        }
        return true;
    }

    clearDestinationCells() {
        // clear all the destination cells
    }

    hasSourceDestination() {
        return this.hasSourceCell() && this.hasDestinationCell();
    }

    getCellState(cell) {
        // return cell value from grid
    }

    setCellState(cell, state) {
        // setTimeout(() => {  console.log("World!"); }, 2000);

        let element = document.getElementById(this.getMazeID()+'-'+cell.row+'-'+cell.col);
        if (state === EMPTY) {
            cell.state = EMPTY;
            element.className = EMPTY_CLASS;
        } else if (state === WALL) {
            cell.state = WALL;
            element.className = WALL_CLASS;
        } else if (state === SOURCE) {
            cell.state = SOURCE;
            element.className = SOURCE_CLASS;
        } else if (state === DESTINATION) {
            cell.state = DESTINATION;
            element.className = DESTINATION_CLASS;
        } else if (state === VISITED) {
            cell.state = VISITED;
            element.className = VISITED_CLASS;
        } else if (state === PATH) {
            cell.state = PATH;
            element.className = PATH_CLASS;
        } else if (state === BORDER) {
            cell.state = BORDER;
            element.className = BORDER_CLASS;
        } else if (state === OPEN) {
            cell.heuristics.state = OPEN;
            element.className = OPEN_CLASS;
        }
    }

    flipCellState(cell) {   // flip empty to wall, and wall to empty.
        if (cell.state === EMPTY)
            this.setCellState(cell, WALL)
        else
            this.setCellState(cell, EMPTY)

    }

    generateWalls() {
        // generate walls randomly at any cell used when user click to generate maze.
        let walls = 0;
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if(Math.random() < this.wallProb) {
                    walls += 1;
                    this.setCellState(this.maze[row][col], WALL);
                } else {
                    this.setCellState(this.maze[row][col], EMPTY);
                }
            }
        }
    }

    cleanMaze() {
        // clear entire maze set each cell to EMPTY except source destinations.
        this.resetStatistics();
        this.resetPathLength();
        this.initPath();
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                this.maze[row][col] = {
                    state: EMPTY,
                    row: row,
                    col: col,
                    heuristics: null     // this object stores the statistics of cell used only in algorithms
                };
                this.setCellState(this.maze[row][col], EMPTY);
            }
        }
        // set the source and destination from user config it might be changed because of any bug or user input selection.
        this.setSourceCell(userConfig.source);
        this.setDestinationCells(userConfig.destinationList);
    }

    resetMaze() {
        // clear entire maze set each cell to EMPTY except source destination and wall.
        this.resetStatistics();
        this.resetPathLength();
        this.initPath();
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state !== WALL) {
                    this.maze[row][col] = {
                        state: EMPTY,
                        row: row,
                        col: col,
                        heuristics: null     // this object stores the statistics of cell used only in algorithms
                    };
                    this.setCellState(this.maze[row][col], EMPTY);
                }
            }
        }
        // set the source and destination from user config it might be changed because of any bug or user input selection.
        this.setSourceCell(userConfig.source);
        this.setDestinationCells(userConfig.destinationList);
    }

    clearPath() {
        // clear the final path generated.
    }

    cellClick() {
        alert("cell click");
    }

    createTable() {
        let mazeDiv = document.getElementById(this.getMazeID());
        mazeDiv.classList.add('maze');
        let table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('table-bordered');
        let tableBody = document.createElement('tbody');
        for (let row = 0; row < this.rows; row += 1) {
            let tr = document.createElement('tr');
            for (let col = 0; col < this.cols; col += 1) {
                let td = document.createElement('td');

                td.id = `${this.getMazeID()}-${row}-${col}`;
                // td.onclick = function (event) {
                //     alert("click");
                // };
                td.style.width = '1px' ;
                td.style.height = '1px' ;
                
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }
        table.appendChild(tableBody);
        mazeDiv.appendChild(table);

        if (this.getMazeID() === userConfig.maze1ID) {
            document.getElementsByTagName('table')[0].addEventListener('click', mazeClick, false);
        } else if (this.getMazeID() === userConfig.maze2ID) {
            document.getElementsByTagName('table')[1].addEventListener('click', mazeClick, false);
        }

    }


    createMaze() {  // creates the empty maze.
        for (let row = 0; row < this.rows; row += 1) {
            this.maze[row] = [];
            for (let col = 0; col < this.cols; col += 1) {
                this.maze[row][col] = {
                    state: EMPTY,
                    row: row,
                    col: col,
                    heuristics: null     // this object stores the statistics of cell used only in algorithms
                };
            }
        }
        this.createTable();
    }

    copyMaze(newMaze) {
        newMaze.createMaze();

        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                newMaze.setCellState(newMaze.maze[row][col], this.maze[row][col].state);
            }
        }
    }

    getBidirectionalPath(fromSource, fromDestination) {
        let pathCell = fromSource;
        let spath = []; // don't include source and destination in path.
        while (pathCell !== null && pathCell.state !== SOURCE) {
            spath.push(pathCell);
            pathCell = pathCell.heuristics.parent;
        }
        spath.reverse();

        pathCell = fromDestination;
        let dpath = []; // don't include source and destination in path.
        while (pathCell !== null && pathCell.state !== DESTINATION) {
            dpath.push(pathCell);
            pathCell = pathCell.heuristics.parent;
        }
        dpath.reverse();

        let path = [];
        while (spath.length > 0 && dpath.length > 0) {
            path.push(spath.pop());
            path.push(dpath.pop());
        }
        while (spath.length > 0) {
            path.push(spath.pop());
        }
        while (dpath.length > 0) {
            path.push(dpath.pop());
        }
        return path;
    }

    getPath(fromDestination=null) {
        if (this.mazeID === userConfig.maze1ID && userConfig.maze1Algo.name === BIDIRECTIONAL_ALGO) {
            let source = userConfig.maze1Algo.object.cellFromSource;
            let destination = userConfig.maze1Algo.object.cellFromDestination;
            return this.getBidirectionalPath(source, destination);
        } else if (this.mazeID === userConfig.maze2ID && userConfig.maze2Algo.name === BIDIRECTIONAL_ALGO) {
            let source = userConfig.maze2Algo.object.cellFromSource;
            let destination = userConfig.maze2Algo.object.cellFromDestination;
            return this.getBidirectionalPath(source, destination);
        }

        let destinations = Array.from(this.getDestinationCells());
        let destination = null;
        destinations.some(function (element, index) {
            if (element.heuristics.state === CLOSED) {
                destination = element;
                return true;
            }
        });
        // if destination is given then start finding path from that destination.
        if (fromDestination !== null) {
            destination = fromDestination;
        }
        let pathCell = destination.heuristics.parent;
        let path = []; // don't include source and destination in path.
        while (pathCell !== null && pathCell.state !== SOURCE) {
            path.push(pathCell);
            pathCell = pathCell.heuristics.parent;
        }
        path.reverse();
        return path;
    }

    getNewStateCells() {

          // return list of destination cells
          let newStateCells = [];
          for (let row = 0; row < this.rows; row += 1) {
              for (let col = 0; col < this.cols; col += 1) {
                  if (this.maze[row][col].heuristics.state === NEW) {
                    newStateCells.push(this.maze[row][col]);
                  }
              }
          }
          return newStateCells;

    }

    getOpenStateCells() {

        // return list of destination cells
        let openStateCells = [];
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].heuristics.state === OPEN) {
                    openStateCells.push(this.maze[row][col]);
                }
            }
        }
        return openStateCells;

  }

    getClosedStateCells() {

    // return list of destination cells
    let closedStateCells = [];
    for (let row = 0; row < this.rows; row += 1) {
        for (let col = 0; col < this.cols; col += 1) {
            if (this.maze[row][col].heuristics.state === CLOSED) {
                closedStateCells.push(this.maze[row][col]);
            }
        }
    }
    return closedStateCells;

}

    isPathDrawn() {
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state === PATH) {
                    return true;
                }
            }
        }
        return false;
    }

    setStatistics(){
        
        let newStateCells = this.getNewStateCells();
        let notVisitedCells = document.getElementById("Not Visited Cells"+" "+this.mazeID);
        notVisitedCells.value = newStateCells.length ;

        let openStateCells = this.getOpenStateCells();
        let visitedCells = document.getElementById("Visited Cells"+" "+this.mazeID);
        visitedCells.value = openStateCells.length ;

        let closedStateCells = this.getClosedStateCells();
        let exploredCells = document.getElementById("Explored Cells"+" "+this.mazeID);
        exploredCells.value = closedStateCells.length ;
        
    }

    setPath(){
        let path = this.getPath();
        let pathLength = document.getElementById("Path Length"+" "+this.mazeID);
        pathLength.value = path.length ;
    }

    resetStatistics(){

        let notVisitedCells = document.getElementById("Not Visited Cells"+" "+this.mazeID);
        notVisitedCells.value = 0 ;


        let visitedCells = document.getElementById("Visited Cells"+" "+this.mazeID);
        visitedCells.value = 0 ;


        let exploredCells = document.getElementById("Explored Cells"+" "+this.mazeID);
        exploredCells.value = 0 ;
        
    }

    resetPathLength(){

        let pathLength = document.getElementById("Path Length"+" "+this.mazeID);
        pathLength.value = 0 ;
    }

    initPath() {
        this.path = [];
        this.pathToDraw = [];
    }

    addNewPath(path) {
        this.path.push(path);
        this.pathToDraw.push(path);
    }

    drawOnePathCell() { // make one cell of each path green.
        let drawn = false;
        if (this.pathToDraw.length > 0) {
            for(let pathNumber = 0; pathNumber < this.pathToDraw.length; pathNumber += 1) {
                if (this.pathToDraw[pathNumber].length > 0) {
                    let pathCell = this.pathToDraw[pathNumber].shift();
                    if (pathCell.state !== DESTINATION)     // don't change color of destination.
                        this.setCellState(pathCell, PATH);
                    drawn = true;
                }
            }
        }
        return drawn;
    }

}

