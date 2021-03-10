class Maze {
    constructor(mazeID, rows, cols) {
        this.mazeID = mazeID;
        this.rows = rows;
        this.cols = cols;

        this.maze = [[]];
        this.isSearching = false;
        this.isGenerating = false;
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

    clearDestinationCells() {
        // clear all the destination cells
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

    generateWalls() {
        // generate walls randomly at any cell used when user click to generate maze.
        let walls = 0;
        let self = this;
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if(Math.random() < .28) {
                    walls += 1;
                    self.setCellState(this.maze[row][col], WALL);
                    // setTimeout(function () {
                    //
                    // }, walls * 3);
                }
            }
        }
    }

    clearMaze() {
        // clear entire maze set each cell to EMPTY except source destination.
        for (let row = 0; row < this.rows; row += 1) {
            for (let col = 0; col < this.cols; col += 1) {
                if (this.maze[row][col].state !== SOURCE && this.maze[row][col].state !== DESTINATION) {
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
    }

    createMaze() {
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

    drawPath() {
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
        path.forEach((element) => {
            this.setCellState(element, PATH);
        });
    }

}

