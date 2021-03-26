class Dijkstra {

    constructor(mazeObject) {
        this.openSet = new Set();
        this.closedSet = new Set();

        for (let row = 0; row < mazeObject.rows; row += 1) {
            for (let col = 0; col < mazeObject.cols; col += 1) {
                mazeObject.maze[row][col].heuristics = {
                    state: NEW,
                    cost: Number.MAX_SAFE_INTEGER,
                    parent: null    // cell is reached from parent with min cost.
                };
            }
        }

        let source = mazeObject.getSourceCell();
        source.heuristics.cost = 0;
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

            let neighbors = this.getUnvisitedNeighbours(current, mazeObject);
            let self = this;
            neighbors.some(function (element, index) { // some() stops if true is returned. forEach never stops
                if (mazeObject.isDestinationCell(element) === true) {   // path found
                    mazeObject.setIsSearching(false);
                    element.heuristics.state = CLOSED;
                    element.heuristics.parent = current;
                    element.heuristics.cost = current.heuristics.cost + 1;
                    self.closedSet.add(element);
                    let path = mazeObject.getPath(element);
                    mazeObject.addNewPath(path);
                    return true;
                }
                if (element.heuristics.state === NEW) {
                    element.heuristics.state = OPEN;
                    element.heuristics.parent = current;
                    self.openSet.add(element);
                    mazeObject.setCellState(element, OPEN);
                }
                if (element.heuristics.cost > current.heuristics.cost + 1) {
                    element.heuristics.cost = current.heuristics.cost + 1;
                    element.heuristics.parent = current;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    getUnvisitedNeighbours(cell, mazeObject) { // return neighbours with mentioned state.
        let neighbours = [];
        let curRow = cell.row;
        let curCol = cell.col;
        for (let row = -1; row <= 1; row += 1) {
            for (let col = -1; col <= 1; col += 1) {
                if (row !== 0 && col === 0 || row === 0 && col !== 0) { // top, bottom, left, right
                    let nRow = curRow + row; // neighbour row
                    let nCol = curCol + col; // neighbour col
                    if (nRow < 0 || nRow >= mazeObject.rows || nCol < 0 || nCol >= mazeObject.cols) continue; // validate cell index
                    if (mazeObject.maze[nRow][nCol].state === EMPTY || mazeObject.maze[nRow][nCol].state === DESTINATION) {
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
            if (element.heuristics.cost < minCost) {
                minCell = element;
                minCost = element.heuristics.cost;
            }
        });
        return minCell;
    }
}
