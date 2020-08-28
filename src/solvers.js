/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  // access 0th index of our matrix, and within that acces the 0th index of the array and togglePiece
  var rows = solution.rows();
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      // toggle a piece
      solution.togglePiece(i, j);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return rows;
};







// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  let glory = [];
  for (let i = 0; i < n; i++) {
    glory.push(i);
  }
  let rookChoices = decisionTree(glory);
  solutionCount = countDecisions(rookChoices);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, currentRow = 0, board) {
  // if board undefined, new board
  board = board || new Board({n: n});
  let rows = board.rows();
  // if currentRow === n
  if (currentRow === n) {
    if (board.hasAnyQueensConflicts()) {
      return false;
    }
    return rows;
  }
  // iterate over current row
  for (let i = 0; i < rows[currentRow].length; i++) {
    debugger;
    board.togglePiece(currentRow, i);
    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(currentRow, i);
    } else {
      var validResult = findNQueensSolution(n, currentRow + 1, board);
      if (!!validResult) {
        return validResult;
      }
      board.togglePiece(currentRow, i);
    }
  }
  return false;
};

// if we do not have a counter showing n, scrap the board and make a new one
//

// input: n

// key pieces: consider any conflicts, build a board, iterate over the rows, togglePieces,

//output: a matrix

// justification: purpose of this function is to create an n x n board and return a single instance of a board, with n queens placed with no conflict.

// explanation: Create a new board of n x n size, access the rows of that board, iterate over our rows, create a second layer of iteration to access columns, we will toggle the piece at that index, and check to see if that toggledpiece has any conflicts. If it does, we'll toggle that piece off, when this finishes we return the board.

// visualized : woo!

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};






var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];

  newTree.addChild = function(value) {
    // push to the trees children array a new tree with value as parameter to new tree
    this.children.push(Tree(value));
  };

  newTree.contains = function(target) {
    // check if value of tree currently in is target
    if (this.value === target) {
      return true;
    }
    // iterate over this.children array
    for (let i = 0; i < this.children.length; i++) {
      // if the child node .contains of target
      if (this.children[i].contains(target)) {
        return true;
      }
    }

  return false;
};



  return newTree;
};

/*
 * Complexity: What is the time complexity of the above functions?
addChild: O(1)
contains: O(n)
 */


 // inputs: n

 // outputs: decision tree where each child is a valid rook option

 // justification: this function will take any number n and output a tree data structure for an n x n chess board where all children of a given row i and col j represent the total valid options for placing the next rook on a chess board where no rooks attack eachother.

 // explanation:outer loop reps each decision point, for second there will be one less
 // iterate over all, options - 1, skip j
 //


// recursion(arr, n, node)
// if node is undefined
  // set equal to new tree with value 'start here'
// iterate through array
  // if element is not node
    // make element into new tree
    // set var equal to splice element out of array
    // node.children.push(recursion(new arr, element))
// return node



let decisionTree = function(arr, node) {
  node = node || new Tree('start here');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== node.value) {
      var element = new Tree(arr[i]);
      let newArr = [...arr];
      newArr.splice(i, 1);
      if (newArr.length) {
        node.children.push(decisionTree(newArr, element));
      }
    }
  }
  return node;
};


let test = decisionTree([0, 1, 2, 3]);
for (let i = 0; i < test.children.length; i++) {
  console.log(test.children[i]);
  for (let j = 0; j < test.children[i].length; j++) {
    console.log(test.children[i][j]);
  }
}


let countDecisions = function(tree) {
  let counter = 0;
  for (let i = 0; i < tree.children.length; i++) {
    counter += countDecisions(tree.children[i]);
  }
  if (!tree.children.length) {
    return 1
  } else {
    return counter;
  }
}
