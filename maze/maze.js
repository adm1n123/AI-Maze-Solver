class Maze {
    constructor(mazeID, rows, cols, wallProb) {
        this.mazeID = mazeID;
        this.rows = rows;
        this.cols = cols;

        this.maze = [[]];
        this.isSearching = false;
        this.isGenerating = false;
        this.wallProb = wallProb ;
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
    setDestinationCells(destinationList) {
        // set list of destination cells
        let array = Array.from(destinationList);
        array.forEach((destination) => {
            this.maze[destination.row][destination.col].state = DESTINATION;
            this.setCellState(this.maze[destination.row][destination.col], DESTINATION);
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
        }
    }

    flipCellState(cell) {   // flip emtpy to wall, and wall to empty.
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
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state !== SOURCE && this.maze[row][col].state !== DESTINATION) {
                    this.setCellState(this.maze[row][col], EMPTY);
                }
            }
        }
    }

    resetMaze() {
        // clear entire maze set each cell to EMPTY except source destination and wall.
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state !== SOURCE &&
                    this.maze[row][col].state !== DESTINATION &&
                    this.maze[row][col].state !== WALL) {
                    this.setCellState(this.maze[row][col], EMPTY);
                }
            }
        }
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

    getPath() {
        let destinations = Array.from(this.getDestinationCells());
        let destination = null;
        destinations.some(function (element, index) {
            if (element.heuristics.state === CLOSED) {
                destination = element;
                return true;
            }
        });

        let pathCell = destination.heuristics.parent;
        let path = []; // don't include source and destination in path.
        while (pathCell !== null && pathCell.state !== SOURCE) {
            path.push(pathCell);
            pathCell = pathCell.heuristics.parent;
        }
        path.reverse();
        return path;
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
}

