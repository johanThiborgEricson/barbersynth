describe("(new Note()).getJustFrequency(concertPitch)", function() {
  it("returns concertPitch*this.partial*2^(this.fundamental/12)", function() {
    var note = new Note();
    note.fundamental = 6;
    note.partial = 3;
    
    var justFrequency = note.getJustFrequency(440);
    
    expect(justFrequency).toBe(440*3*Math.sqrt(2));
  });
});