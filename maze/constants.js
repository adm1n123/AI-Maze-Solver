// Maze cell states
const EMPTY = 0;      // Indicates that cell is empty
const WALL = 1;       // Indicates that cell is wall
const SOURCE = 2;     // Indicates that cell is source
const DESTINATION = 3;// Indicates that cell is destination
const VISITED = 4;    // Indicates that cell is visited
const BORDER = 5;     // Indicates that cell is maze border
const PATH = 6;       // Indicates that cell is part of final path

// Algorithms heuristics states
const NEW = 7        // cell is not reached
const OPEN = 8;      // cell is reached but not closed
const CLOSED = 9;    // cell is processed

// CSS classes
const EMPTY_CLASS = 'empty';
const WALL_CLASS = 'wall';
const SOURCE_CLASS = 'source';
const DESTINATION_CLASS = 'destination';
const VISITED_CLASS = 'visited';
const BORDER_CLASS = 'border';
const PATH_CLASS = 'path';
