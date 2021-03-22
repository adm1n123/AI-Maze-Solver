class DFS {
    constructor(mazeObject) {
        this.stack = [];
    }

    runStep(mazeObject) {
        let current = mazeObject.getSourceCell()
        if (current.state === DESTINATION) {    // unexpected event just return.
            mazeObject.setIsSearching(false);
            return true;
        }
        if (current.state !== SOURCE) {
            mazeObject.setCellState(current, VISITED); // cell is visited change colour

        }
        let next = this.getNextNeighbours(current, mazeObject);

        if (next) {
            mazeObject.setCellState(next, VISITED);
            //Adding current cell to stack for backtracking
            this.stack.push(current);
            current = next;
        } else if (this.stack.length > 0) {
            current = this.stack.pop();
        }
        if (this.stack.length === 0) {
            return false;
        }

    }

    getNextNeighbours(cell, mazeObject) {
        let neighbours = [];
        let curRow = cell.row;
        let curCol = cell.col;
        let top = curRow !== 0 ? mazeObject.maze[curRow - 1][curCol] : undefined;
        let right = curCol !== mazeObject.maze.length - 1 ? mazeObject.maze[curRow][curCol + 1] : undefined;
        let bottom = curRow !== mazeObject.maze.length - 1 ? mazeObject.maze[curRow + 1][curCol] : undefined;
        let left = curCol !== 0 ? grid[cuRow][curCol - 1] : undefined;

        // if the following are not 'undefined' then push them to the neighbours array
        if (top && top.state !== VISITED) neighbours.push(top);
        if (right && right.state !== VISITED) neighbours.push(right);
        if (bottom && bottom.state !== VISITED) neighbours.push(bottom);
        if (left && state !== VISITED) neighbours.push(left);

        //Choosing random neighbour from neighbours array
        if (neighbours.length !== 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }

}
