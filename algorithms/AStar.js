class AStar {

    constructor(mazeObject) {
        this.openSet = new Set();
        this.closedSet = new Set();
        this.hFunction = new Manhattan();

        for (let row = 0; row < mazeObject.rows; row += 1) {
            for (let col = 0; col < mazeObject.cols; col += 1) {
                mazeObject.maze[row][col].heuristics = {
                    state: NEW,
                    f: Number.MAX_SAFE_INTEGER,
                    g: Number.MAX_SAFE_INTEGER,
                    h: this.hFunction.hScore(mazeObject.maze[row][col]), // get the h value. h value is fixed.
                    parent: null    // cell is reached from parent with min cost.
                };
            }
        }

        let source = mazeObject.getSourceCell();
        source.heuristics.g = 0;
        source.heuristics.f = source.heuristics.h + source.heuristics.g;
        this.openSet.add(source);
    }

    runStep(mazeObject) {
        if (this.openSet.size > 0) {
            let current = this.minCostCell();
            this.openSet.delete(current);
            current.heuristics.state = CLOSED;  // closed is internal state same as visited
            this.closedSet.add(current);

            if (current.state === DESTINATION) {    // unexpected event just return.
                mazeObject.setIsSearching(false);
                return true;
            }
            if (current.state !== SOURCE)
                mazeObject.setCellState(current, VISITED); // cell is visited change colour

            let neighbors = this.getAllNeighbours(current, mazeObject);
            let self = this;
            neighbors.some(function (element, index) { // some() stops if true is returned. forEach never stops
                if (element.heuristics.state === NEW) {
                    element.heuristics.state = OPEN;
                    element.heuristics.g = current.heuristics.g + 1;
                    element.heuristics.f = element.heuristics.g + element.heuristics.h;
                    element.heuristics.parent = current;
                    self.openSet.add(element);
                } else if (element.heuristics.state === CLOSED) {
                    if (element.heuristics.g > current.heuristics.g + 1) {
                        element.heuristics.g = current.heuristics.g + 1;
                        element.heuristics.f = element.heuristics.g + element.heuristics.h;
                        self.closedSet.delete(element);
                        element.heuristics.state = OPEN;
                        self.openSet.add(element);
                        element.heuristics.parent = current;
                        mazeObject.setCellState(element, EMPTY);
                    }
                } else if (element.heuristics.state === OPEN) {
                    if (element.heuristics.g > current.heuristics.g + 1) {
                        element.heuristics.g = current.heuristics.g + 1;
                        element.heuristics.f = element.heuristics.g + element.heuristics.h;
                        element.heuristics.parent = current;
                    }
                }

                if (mazeObject.isDestinationCell(element) === true) {   // path found
                    mazeObject.setIsSearching(false);
                    element.heuristics.state = CLOSED;
                    self.closedSet.add(element);
                    return true;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    getAllNeighbours(cell, mazeObject) { // return neighbours with mentioned state.
        let neighbours = [];
        let curRow = cell.row;
        let curCol = cell.col;
        for (let row = -1; row <= 1; row += 1) {
            for (let col = -1; col <= 1; col += 1) {
                if (row !== 0 && col === 0 || row === 0 && col !== 0) { // top, bottom, left, right
                    let nRow = curRow + row; // neighbour row
                    let nCol = curCol + col; // neighbour col
                    if (nRow < 0 || nRow >= mazeObject.rows || nCol < 0 || nCol >= mazeObject.cols) continue; // validate cell index
                    if (mazeObject.maze[nRow][nCol].state === EMPTY || mazeObject.maze[nRow][nCol].state === DESTINATION ||
                        mazeObject.maze[nRow][nCol].state === VISITED) {
                        neighbours.push(mazeObject.maze[nRow][nCol]);
                    }
                }
            }
        }
        return neighbours;
    }

    minCostCell() {
        let minCost = Number.MAX_SAFE_INTEGER;
        let minCell = null;
        let array = Array.from(this.openSet);
        array.forEach((element) => {
            if (element.heuristics.f < minCost) {
                minCell = element;
                minCost = element.heuristics.f;
            }
        });
        return minCell;
    }
}

// Heuristic distance
class Euclidean {
    hScore(cell) {
        let array = Array.from(userConfig.destinationList);
        let minH = Number.MAX_SAFE_INTEGER;

        array.forEach((i) => {
            let h = Math.sqrt(Math.pow(i.row - cell.row, 2) + Math.pow(i.col - cell.col, 2));
            if (h < minH) {
                minH = h;
            }
        });
        return minH;
    }
}

class Manhattan {
    hScore(cell) {
        let array = Array.from(userConfig.destinationList);
        let minH = Number.MAX_SAFE_INTEGER;

        array.forEach((i) => {
            let h = Math.abs(i.row - cell.row) + Math.abs(i.col - cell.col);
            if (h < minH) {
                minH = h;
            }
        });
        return minH;
    }
}
class Diagonal {
    hScore(cell) {
        let array = Array.from(userConfig.destinationList);
        let minH = Number.MAX_SAFE_INTEGER;

        array.forEach((i) => {
            let h = Math.max(Math.abs(i.row - cell.row), Math.abs(i.col - cell.col));
            if (h < minH) {
                minH = h;
            }
        });
        return minH;
    }
}