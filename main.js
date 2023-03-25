
const Boats = {
    CARRIER: '1',
    BATTLESHIP: '2',
    CRUISER: '3',
    SUBMARINE: '4',
    DESTROYER: '5'
}

const SquareStates = {
    HIT: 'hit',
    MISS: 'miss',
    WATER: 'water',
    BOAT: 'boat'
}


class TopBoard {
  // each square exists in 4 states 
  // water, boat, hit, miss
  constructor() {
    this.board_matrix = [10][10];
  }

  shoot(x, y) {
    // check if shot
    if (board_matrix[x][y] == SquareStates.HIT) {
      alert("HEY YOU SHOT HERE ALREADY");
      return 0;
    }
    
    // check boat
    if (board_matrix[x][y] == SquareStates.BOAT) {
      board_matrix[x][y] = SquareStates.HIT
    } else {
      board_matrix[x][y] = SquareStates.MISS
    }
  }

}

class BottomBoard{
  constructor() {
    this.board_matrix = [10][10]
  }

  boat_place(x, y, boat_enum) {
      console.log(boat_enum);

      // assumption that board values are
      // 0 1 2 3 4 ...
      // 1
      // 2
      // 3
      // 4
      // ...

      // ex y = 2. boat len = 3
      // check up
      if ((y - boatlen) >= 0) {
         boat_matrix[x][y-boatlen] = "VALID" 
      }
      
      // check down
      if ((y + boatlen) <= 10) {
        boat_matrix[x][y+boatlen] = "VALID"
      }

      // check left
      if ((x - boatlen >= 0)) {
        boat_matrix[x-boatlen][y] = "VALID"
      }

      // check right
      if ((x + boatlen <= 10)) {
        boat_matrix[x+boatlen][y] = "VALID"
      }
    }
  
}

class Board {
    function constructor() {
        this.boat_matrix = [10][10];
        this.bomb_matrix = [10][10];
    }

    boat_length(boat_enum) {
        switch(boat_enum) {
            case Boats.CARRIER:
                return 5;
            case Boats.BATTLESHIP:
                return 4;
            case Boats.CRUISER:
                return 3;
            case Boats.SUBMARINE:
                return 3;
            case Boats.DESTROYER:
                return 2;
        }
    }

    boat_rotate(boat_enum) {
      
    }

    

}


function main() {
    // game_board = Board()
    console.log("yoooo")
    // document.getElementById("message_div").innerText = "Would you like to play?";
    // let yes_butt = document.createElement('button');
    // yes_butt.textContent = "yes"
    // let no_butt = document.createElement('button');
    // no_butt.textContent = "no"
    // refactor into loop
    document.getElementById("message_div").innerText = "place your carrier, click the cell to add.";
    let rotate_butt = document.createElement('button');
    rotate_butt.textContent = "rotate"
    rotate_butt.onclick = function(){};
    let done_butt = document.createElement('button');
    done_butt.textContent = "next"
    done_butt.onclick = function(){};   
}

main()