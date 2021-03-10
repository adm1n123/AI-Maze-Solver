// write js code to run different algorithms call methods of algorithms and maze class.
// write js methods to take input from user about size of maze etc. and generate maze by calling maze class methods
function sleep (milliSeconds) {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
}

let maze1, maze2;
let dijkstra;
function generateMaze() {
    let mazeDiv = document.getElementById('maze1');
    if (mazeDiv !== null)
        mazeDiv.innerHTML = '';

    maze1 = new Maze('maze1', 10, 20);
    maze1.createMaze();
    maze1.generateWalls();

    maze1.setCellState(maze1.maze[0][0], SOURCE);
    maze1.setCellState(maze1.maze[maze1.rows-1][maze1.cols-1], DESTINATION);
}

async function visualize() {
    // get the name of algorithms from drop down

    // initialize algorithm
    dijkstra = new Dijkstra(maze1);
    maze1.setIsSearching(true);
    // run algorithms
    let reachable = true;
    while (maze1.getIsSearching() === true && reachable === true) {
        reachable = dijkstra.runStep(maze1);
        await sleep(50);
    }
    if (reachable === true) {
        let path = maze1.getPath();
        for (const element of path) {
            maze1.setCellState(element, PATH);
            await sleep(50);
        }
    } else {
        // inform that no path can be found.
        // alert("Destination unreachable");
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