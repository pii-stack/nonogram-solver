import Output from "./output";
import Input from "./input";

class Game {
  constructor(inputRows, inputCols) {
    this.inputRows = new Input(inputRows);
    this.inputCols = new Input(inputCols);
    this.output = [];
    this._GAP = 1;

    this.output = new Output(inputRows.length, inputCols.length);
    this.solve();
  }

  solve() {
    this.mark_overlapInRow();
    this.mark_overlapInCol();

    this.mark_fromFrame();
    // this.flag_rowDone();
    // this.flag_colDone();
    // this.flag_byCols();
  }

  mark_fromFrame() {
    // top frame
    let topRow = this.output.get_row(0);
    topRow.forEach((val, col) => {
      if (val)
        this.output.set_colValByLength(
          true,
          0,
          col,
          this.inputCols.tubes[col][0]
        );
    });
    // bottom frame
    let botRow = this.output.get_row(this.inputRows.length - 1);
    botRow.forEach((val, col) => {
      if (val)
        this.output.set_colValByLength(
          true,
          this.inputRows.length - 1,
          col,
          -this.inputCols.tubes[col][this.inputCols.tubes[col].length - 1]
        );
    });
    // left frame
    let leftCol = this.output.get_col(0);
    leftCol.forEach((val, row) => {
      if (val)
        this.output.set_rowValByLength(
          true,
          row,
          0,
          this.inputRows.tubes[row][0]
        );
    });
    // right frame
    let rightCol = this.output.get_col(this.inputCols.length - 1);
    rightCol.forEach((val, row) => {
      if (val)
        this.output.set_rowValByLength(
          true,
          row,
          this.inputCols.length - 1,
          -this.inputRows.tubes[row][this.inputRows.tubes[row].length - 1]
        );
    });
  }

  // flag_rowDone() {
  //   for (let rowNum = 0; rowNum < this.inputRows.length; rowNum++) {
  //     let inputRow = this.inputRows[rowNum],
  //       outputLine = this.get_outputRowLine(rowNum);
  //     if (this.have_sameSet(inputRow, outputLine))
  //       this.mark_toDirection(
  //         false,
  //         rowNum,
  //         0,
  //         "rightward",
  //         this.inputCols.length
  //       );
  //   }
  // }
  // flag_colDone() {
  //   for (let colNum = 0; colNum < this.inputCols.length; colNum++) {
  //     let inputCol = this.inputCols[colNum],
  //       outputLine = this.get_outputColLine(colNum);
  //     if (this.have_sameSet(inputCol, outputLine))
  //       this.mark_toDirection(
  //         false,
  //         0,
  //         colNum,
  //         "downward",
  //         this.inputRows.length
  //       );
  //   }
  // }

  // have_sameSet(a1, a2) {
  //   return a1.reduce((a, aa) => a + aa) === a2.reduce((a, aa) => a + aa);
  // }

  // flag_byRows() {
  //   for (let rowNum = 0; rowNum < this.inputRows.length; rowNum++) {
  //     let inputRow = this.inputRows[rowNum],
  //       outputRow = this.output[rowNum],
  //       sumRow = inputRow.reduce((sum, val) => sum + val + this._GAP),
  //       outputBatchIndex = 0;

  //     for (let inputIndex = 0; inputIndex < inputRow.length; inputIndex++) {
  //       if (inputRow[inputIndex] === 0)
  //         this.mark_toDirection(false, rowNum, 0, "rightward", inputRow.length);

  //       let batchLength = this.get_outputBatchLength(
  //         outputRow,
  //         outputBatchIndex
  //       );
  //       if (
  //         inputRow[inputIndex] ===
  //         this.count_toDirection(true, rowNum, batchLength, "rightward")
  //       ) {
  //         this.mark_toDirection(false, rowNum, 0, "rightward", 1);
  //         this.mark_toDirection(false, rowNum, 0, "rightward", 1);
  //       }
  //     }
  //   }
  // }
  // flag_byCols() {}

  mark_overlapInRow() {
    this.inputRows
      .get_overlapArea(this.output.get_allRow())
      .forEach(row =>
        this.output.set_rowValByLength(
          true,
          row.tubeIndex,
          row.overlapEndIndex,
          row.length
        )
      );
  }

  mark_overlapInCol() {
    this.inputCols
      .get_overlapArea(this.output.get_allCol())
      .forEach(col =>
        this.output.set_colValByLength(
          true,
          col.overlapEndIndex,
          col.tubeIndex,
          col.length
        )
      );
  }

  get_output() {
    return this.output.get_allRow();
  }

  draw_output() {
    return this.output.draw();
  }
}
export default Game;
