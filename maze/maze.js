class Maze {
    constructor(mazeID, rows, cols) {
        this.mazeID = mazeID;
        this.rows = rows;
        this.cols = cols;

        this.maze = [[]];
        this.isSearching = false;

    }
    getMazeID() {

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

    isVisited(cell) {
        // return true false
    }



    getSourceCell() {
        // return source cell.
    }
    clearSourceCell() {
        // remove the source class from cell
    }

    getDestinationCells() {
        // return list of destination cells
    }
    clearDestinationCells() {
        // clear all the destination cells
    }

    cellState(cell) {
        // return cell value from grid
    }

    setCellWall(cell) {
        // make cell a wall by changing grid value to WALL
    }

    generateWalls() {
        // generate walls randomly at any cell used when user click to generate maze.
    }

    clearMaze() {
        // clear entire maze set each cell to EMPTY except source destination.
    }

    clearPath() {
        // clear the final path generated.
    }

    createTable() {

    }

    createMaze() {

    }


}
