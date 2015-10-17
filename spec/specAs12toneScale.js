describe("as12toneScale", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  it("returns 0 for 0", function() {
    expect(readerStub.as12toneScale(0)).toBe(0);
  });
  
  it("returns the intervals in the A minor scale for numbers 0-6", function() {
    var input = [0, 1, 2, 3, 4, 5, 6];
    var expected = [0, 2, 3, 5, 7, 8, 10];
    expect(input.map(readerStub.as12toneScale)).toEqual(expected);
  });
  
  it("returns 12 semitone steps for 7 scale steps", function() {
    expect(readerStub.as12toneScale(7)).toBe(12);
  });
  
  it("returns minus 12 semitone steps for minus 7 scale steps", function() {
    expect(readerStub.as12toneScale(-7)).toBe(-12);
  });
  
  it("returns minus 2 semitone steps for minus 1 scale steps", function() {
    expect(readerStub.as12toneScale(-1)).toBe(-2);
  });
  
});
