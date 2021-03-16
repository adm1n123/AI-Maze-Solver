// write js code to run different algorithms call methods of algorithms and maze class.
// write js methods to take input from user about size of maze etc. and generate maze by calling maze class methods
let userConfig = null;

$( document ).ready(function () {
    userConfig = new UserConfig();   // initialized the userConfig.
    generateMaze();     // make sure at least one maze is already generated when page loads.
});

class UserConfig {
    constructor() {
        this.maze1 = null;
        this.maze2 = null;
        this.maze1ID = 'maze1';
        this.maze2ID = 'maze2';
        this.maze1Algo = {
            name: DIJKSTRA_ALGO,
            object: null
        }
        this.maze2Algo = {
            name: DIJKSTRA_ALGO,
            object: null
        }

        this.mazeRows = 20; // default
        this.mazeCols = 20; // default
        this.source = {     // default source
            row: 0,
            col: 0
        }
        this.destinationList = [{ // default destination
            row: this.mazeRows - 1,
            col: this.mazeCols - 1
        }]

        this.isMazeGenerated = false; // set true when maze is generated and never set to false.
    }

    generateMaze1() {
        let maze1Div = document.getElementById(this.maze1ID);
        if (maze1Div !== null)
            maze1Div.innerHTML = '';
        this.maze1 = new Maze(this.maze1ID, this.mazeRows, this.mazeCols);
        this.maze1.createMaze();
        this.maze1.generateWalls();

        this.maze1.setSourceCell(this.source);
        this.maze1.setDestinationCells(this.destinationList);

        this.isMazeGenerated = true;    // maze generated for the first time.

        this.initAlgoObject(this.maze1);  // initialize algo object for generated maze
        // Remove the maze2 if present.
        this.maze2 = null;
        let maze2Div = document.getElementById(this.maze2ID);
        if (maze2Div !== null)
            maze2Div.innerHTML = '';
        // use slide up if possible don't make innerHTML = '' now it is done when createTwoMaze is called.
    }

    generateMaze2() {
        // maze1 is by default created so just copy the maze1.
        this.maze1.resetMaze(); // clear all visited and path cells.
        this.removeMaze2(); // remove and create new maze2 object.

        this.maze2 = new Maze(this.maze2ID, this.mazeRows, this.mazeCols);
        this.maze1.copyMaze(this.maze2);   // copy all the maze1 states to maze2. make sure maze1 is clean.
        this.initAlgoObject(this.maze2);
    }

    removeMaze2() {
        this.maze2 = null;
        let maze2Div = document.getElementById(this.maze2ID);
        if (maze2Div !== null)
            maze2Div.innerHTML = '';
    }

    getAlgoObject(algoName, mazeObject) {
        let algoObject = null;
        if (algoName === ASTAR_ALGO) {
            algoObject = new AStar(mazeObject);
        } else if (algoName === BFS_ALGO) {
            algoObject = new BFS(mazeObject);
        } else if (algoName === DFS_ALGO) {
            algoObject = new DFS(mazeObject);
        } else if (algoName === BIDIRECTIONAL_ALGO) {
            algoObject = new Bidirectional(mazeObject);
        } else if (algoName === DIJKSTRA_ALGO) {
            algoObject = new Dijkstra(mazeObject);
        }
        return algoObject;
    }

    initAlgoObject(mazeObject) {
        if (mazeObject.mazeID === this.maze1ID) {
            this.maze1Algo.object = this.getAlgoObject(this.maze1Algo.name, mazeObject);
        } else {
            this.maze2Algo.object = this.getAlgoObject(this.maze2Algo.name, mazeObject);
        }
    }
}

function sleep (milliSeconds) {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
}

function createMaze(count) {
    if (count === 'one') {
        userConfig.removeMaze2();
        userConfig.maze1.resetMaze();
        userConfig.initAlgoObject(userConfig.maze1);
    } else {
        userConfig.maze1.resetMaze();
        userConfig.initAlgoObject(userConfig.maze1);
        userConfig.generateMaze2();
        userConfig.initAlgoObject(userConfig.maze2);
    }
}

function generateMaze() {

    if (userConfig.maze2 !== null) {    // maze2 is present.
        userConfig.generateMaze1();
        userConfig.generateMaze2();
    } else {
        userConfig.generateMaze1();
    }
}
// userConfig = new UserConfig();
async function visualize() {
    // get the name of algorithms from drop down
    // initialize algorithm
    if (userConfig.maze2 === null) {    // only maze1 is present.
        userConfig.maze1.setIsSearching(true);
        // run algorithms
        let reachable = true;
        while (userConfig.maze1.getIsSearching() === true && reachable === true) {
            reachable = userConfig.maze1Algo.object.runStep(userConfig.maze1);
            await sleep(50);
        }
        if (reachable === true) {
            let path = userConfig.maze1.getPath();
            for (const element of path) {
                userConfig.maze1.setCellState(element, PATH);
                await sleep(50);
            }
        } else {
            alert("Destination Unreachable !!!");
        }
        userConfig.maze1.setIsSearching(false);
    } else {    // both maze are present.
        userConfig.maze1.setIsSearching(true);
        userConfig.maze2.setIsSearching(true);
        // run algorithms
        let maze1Reachable = true;
        let maze2Reachable = true;
        while (userConfig.maze1.getIsSearching() === true && maze1Reachable === true &&
        userConfig.maze2.getIsSearching() === true && maze2Reachable === true ) {
            maze1Reachable = userConfig.maze1Algo.object.runStep(userConfig.maze1);
            maze2Reachable = userConfig.maze2Algo.object.runStep(userConfig.maze2);
            await sleep(50);
        }
        if (maze1Reachable === true) {
            let path = userConfig.maze1.getPath();
            for (const element of path) {
                userConfig.maze1.setCellState(element, PATH);
                await sleep(50);
            }
        }
        if (maze2Reachable === true) {
            let path = userConfig.maze1.getPath();
            for (const element of path) {
                userConfig.maze2.setCellState(element, PATH);
                await sleep(50);
            }
        }
        if (maze1Reachable === false && maze2Reachable === false) { // if destination unreachable both algo must have visited same number of cells.
            alert("Destination Unreachable !!!");
        }
        userConfig.maze1.setIsSearching(true);
        userConfig.maze2.setIsSearching(true);
    }
}




















//#############################################################################  TESTING METHODS DON'T REMOVE  #######################################################################
function test(bool) {
    if(bool === true) {
        alert(WALL);
        let obj = new Dijkstra();
        alert(obj);
        let node = obj.getNode()
    } else {
        alert("Empty value" + EMPTY);
    }
}

function testingMaze() {
    let maze1 = new Maze('maze1', 7, 15);
    maze1.createMaze();
    maze1.maze[0][0].state = SOURCE;
    maze1.maze[maze1.rows-1][maze1.cols-1].state = DESTINATION;
    maze1.generateWalls();
    // console.log(maze1.maze);
    return maze1;
}

function mazeToString(maze) {
    let mazeStr = '';
    for (let i = 0; i < maze.rows; i += 1) {
        for (let j = 0; j < maze.cols; j += 1) {
            mazeStr += '    '+maze.maze[i][j].state;
        }
        mazeStr += '\n';
    }
    return mazeStr;
}

function Test() {


    // check source / destinations are set properly

    // check maze is ready or not (previous state is clear or not)
    // read maze size if not use default size
    alert("testing called");
    let maze1 = testingMaze();

    let mazeStr = mazeToString(maze1);

    // get the name of algorithms from drop down

    // initialize algorithm
    let dijkstra = new Dijkstra(maze1);
    maze1.setIsSearching(true);
    // run algorithms
    while (maze1.getIsSearching() === true) {
        dijkstra.runStep(maze1);
    }
    maze1.drawPath();
    console.info(maze1.maze);

    let solution = mazeToString(maze1);
    alert('Maze\n'+mazeStr+'\nSolution\n'+solution);
}