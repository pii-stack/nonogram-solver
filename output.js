class Output {
  constructor(rowLength, colLength) {
    this.board = [];
    this.rowLength = rowLength;
    this.colLength = colLength;
    for (let i = 0; i < rowLength; i++) {
      this.board[i] = [];
      for (let j = 0; j < colLength; j++) {
        this.board[i].push(null);
      }
    }
  }

  get_rowVal(row) {
    let rowVal = [],
      val = 0,
      outputRow = this.get_row(row);
    for (let i = 0; i < outputRow.length; i++) {
      if (outputRow[i] === true) val++;
      if (outputRow[i] === false && val) {
        rowVal.push(val);
        val = 0;
      }
    }
    return rowVal.length ? rowVal : [0];
  }

  get_colVal(col) {
    let colVal = [],
      val = 0,
      outputRow = this.get_col(col);
    for (let i = 0; i < outputRow.length; i++) {
      if (outputRow[i] === true) val++;
      if (outputRow[i] === false && val) {
        colVal.push(val);
        val = 0;
      }
    }
    return colVal.length ? colVal : [0];
  }

  get_allRow() {
    return this.board;
  }

  get_row(i) {
    return this.board[i];
  }

  get_allCol() {
    let cols = [];
    for (let i = 0; i < this.colLength; i++) {
      let col = [];
      for (let j = 0; j < this.rowLength; j++) {
        col.push(this.board[j][i]);
      }
      cols.push(col);
    }
    return cols;
  }

  get_col(i) {
    let col = [];
    for (let j = 0; j < this.rowLength; j++) {
      col.push(this.board[j][i]);
    }
    return col;
  }

  set_val(val, row, col) {
    if (this.board[row] === undefined) return;
    if (this.board[row][col] === null) {
      this.board[row][col] = val;
    }
  }

  set_rowVal(val, row) {
    for (let i = 0; i < this.colLength; i++)
      if (this.board[row][i] === null) this.board[row][i] = val;
  }

  set_rowValByLength(val, row, col, length) {
    console.log("set row", val, row, col, length);
    while (length) {
      this.set_val(val, row, col);
      if (length > 0) {
        col++;
        length--;
      }
      if (length < 0) {
        col--;
        length++;
      }
    }
  }

  set_colValByLength(val, row, col, length) {
    console.log("set col", val, row, col, length);
    while (length) {
      this.set_val(val, row, col);
      if (length > 0) {
        row++;
        length--;
      }
      if (length < 0) {
        row--;
        length++;
      }
    }
  }

  set_colVal(val, col) {
    for (let i = 0; i < this.rowLength; i++)
      if (this.board[i][col] === null) this.board[i][col] = val;
  }

  draw() {
    return this.board
      .map(
        inputRow =>
          "    " +
          inputRow.map(x => (x ? "x" : x === false ? "." : " ")).join("")
      )
      .join("    \n");
  }
}

export default Output;
