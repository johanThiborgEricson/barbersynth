describe("addAccidentals", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  it("returns the tone if no accidentals are given", function() {
    expect(readerStub.addAccidentals(2, "")).toBe(2);
  });
  
  it("returns 1 less, 2 less, 1 more or 2 more for es, eses, is, isis, respective", function() {
    expect(readerStub.addAccidentals(0, "es")).toBe(-1);
    expect(readerStub.addAccidentals(0, "eses")).toBe(-2);
    expect(readerStub.addAccidentals(0, "is")).toBe(1);
    expect(readerStub.addAccidentals(0, "isis")).toBe(2);
  });
  
});
