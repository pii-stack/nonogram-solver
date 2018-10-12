class Input {
  constructor(tubes) {
    this.tubes = tubes;
    this.length = tubes.length;
    this._GAP = 1;
  }

  get_overlapArea(output) {
    let overlap = [];

    this.tubes.forEach((tube, tubeIndex) => {
      let sumTube = tube.reduce((sum, val) => sum + val + this._GAP);

      tube.forEach((input, inputIndex) => {
        if (sumTube + input > output[tubeIndex].length)
          overlap.push({
            tubeIndex,
            overlapEndIndex: this.get_overlapIndex(tube, inputIndex),
            length: output[tubeIndex].length - (sumTube + input)
          });
      });
    });

    console.log("overlap", overlap);
    return overlap;
  }

  get_overlapIndex(tube, inputIndex) {
    return (
      tube.reduce(
        (sum, val, i) => sum + (i <= inputIndex ? val + this._GAP : 0)
      ) - 1
    );
  }
}
export default Input;
