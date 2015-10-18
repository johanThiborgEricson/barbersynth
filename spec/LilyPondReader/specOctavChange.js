describe("octaveChange", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  it("returns the scale tone number if octav string is empty", function() {
    var scaleToneNumber = 1;
    var octaveString = "";
    expect(readerStub.octaveChange(scaleToneNumber, octaveString)).toBe(1);
  });
  
  it("decreases by 7 if octav string is ,", function() {
    expect(readerStub.octaveChange(0, ",")).toBe(-7);
  });
  
  it("increases by 7 if octav string is '", function() {
    expect(readerStub.octaveChange(0, "'")).toBe(7);
  });
  
  it("decreases by 14 if octav string is ,,", function() {
    expect(readerStub.octaveChange(0, ",,")).toBe(-14);
  });
  
  it("increases by 14 if octav string is ''", function() {
    expect(readerStub.octaveChange(0, "''")).toBe(14);
  });
  
  // FIXME: how should it react to bad strings? 
  
});
