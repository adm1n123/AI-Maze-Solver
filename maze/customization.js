function mazeClick(e) {
    let row = e.target.parentElement.rowIndex;
    let col = e.target.cellIndex;
    if (Number.isInteger(row) === false || Number.isInteger(col) === false) return;

    if (userConfig.isRunning === true) {    // user can only change cell if algorithm is not running.
        alert("!!! Algorithm is running Reset maze before customizing !!!");
        return;
    }
    if (userConfig.maze1 !== null) {
        let cell = userConfig.maze1.maze[row][col];
        if (userConfig.maze1.isSourceCell(cell) === true || userConfig.maze1.isDestinationCell(cell) === true) {
            return; // don't change cell on click if it is source or destination.
        }
        userConfig.maze1.flipCellState(cell);
    }
    if (userConfig.maze2 !== null) {
        let cell = userConfig.maze2.maze[row][col];
        if (userConfig.maze2.isSourceCell(cell) === true || userConfig.maze2.isDestinationCell(cell) === true) {
            return; // don't change cell on click if it is source or destination.
        }
        userConfig.maze2.flipCellState(cell);
    }
}


// ######################################### Context menu ##################################



document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function rightClick(e) {

    let row = e.target.parentElement.rowIndex;
    let col = e.target.cellIndex;
    if (Number.isInteger(row) === false || Number.isInteger(col) === false) {
        return;
    }

    e.preventDefault();
    if (userConfig.isRunning === true) {    // user can only change cell if algorithm is not running.
        e.preventDefault();
        alert("!!! Algorithm is running Reset maze before customizing !!!");
        return;
    }

    userConfig.clickRow = row;
    userConfig.clickCol = col;

    if (document.getElementById(
        "contextMenu").style.display === "block")
        hideMenu();
    else {
        var menu = document
            .getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}

function setSource() {
    let row = userConfig.clickRow;
    let col = userConfig.clickCol;
    if (userConfig.maze1 !== null) {
        let source = userConfig.maze1.getSourceCell();
        userConfig.maze1.setCellState(source, EMPTY);
        let newSourceCell = userConfig.maze1.maze[row][col];
        userConfig.maze1.setSourceCell(newSourceCell);
        userConfig.initAlgoObject(userConfig.maze1);
    }
    if (userConfig.maze2 !== null) {
        let source = userConfig.maze2.getSourceCell();
        userConfig.maze2.setCellState(source, EMPTY);
        let newSourceCell = userConfig.maze2.maze[row][col];
        userConfig.maze2.setSourceCell(newSourceCell);
        userConfig.initAlgoObject(userConfig.maze2);
    }
    userConfig.source = {       // setting the source so that it is saved when maze is generated again.
        row: row,
        col: col
    }
}

function setDestination() {
    let row = userConfig.clickRow;
    let col = userConfig.clickCol;

    if (userConfig.maze1 !== null) {
        let cell = userConfig.maze1.maze[row][col];
        userConfig.maze1.setCellState(cell, DESTINATION);
        userConfig.initAlgoObject(userConfig.maze1);
    }
    if (userConfig.maze2 !== null) {
        let cell = userConfig.maze2.maze[row][col];
        userConfig.maze2.setCellState(cell, DESTINATION);
        userConfig.initAlgoObject(userConfig.maze2);
    }
    // setting the destination in userConfig so that it remains when maze is generated.
    userConfig.destinationList = [];
    let destinations = userConfig.maze1.getDestinationCells();
    let array = Array.from(destinations);
    array.forEach((destination) => {
        userConfig.destinationList.push({
            row: destination.row,
            col: destination.col
        });
    });
}

function setEmpty() {
    let row = userConfig.clickRow;
    let col = userConfig.clickCol;
    if (userConfig.maze1 !== null) {
        let cell = userConfig.maze1.maze[row][col];
        userConfig.maze1.setCellState(cell, EMPTY);
        userConfig.initAlgoObject(userConfig.maze1);
    }
    if (userConfig.maze2 !== null) {
        let cell = userConfig.maze2.maze[row][col];
        userConfig.maze2.setCellState(cell, EMPTY);
        userConfig.initAlgoObject(userConfig.maze2);
    }
}

function setWall() {
    let row = userConfig.clickRow;
    let col = userConfig.clickCol;
    if (userConfig.maze1 !== null) {
        let cell = userConfig.maze1.maze[row][col];
        userConfig.maze1.setCellState(cell, WALL);
        userConfig.initAlgoObject(userConfig.maze1);
    }
    if (userConfig.maze2 !== null) {
        let cell = userConfig.maze2.maze[row][col];
        userConfig.maze2.setCellState(cell, WALL);
        userConfig.initAlgoObject(userConfig.maze2);
    }
}