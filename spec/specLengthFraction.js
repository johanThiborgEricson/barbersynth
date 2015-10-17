describe("lengthFraction", function() {
  var readerStub;
  beforeEach(function() {
    readerStub = LilyPondReader();
  });
  
  it("defaults to a quater note", function() {
    var length = readerStub.lengthFraction();
    expect(length("", "")).toEqual([1, 4]);
  });
  
  it("adds supplied value as denominator", function() {
    var length = readerStub.lengthFraction();
    expect(length("1", "")).toEqual([1, 1]);
  });
  
  it("remembers the last supplied value", function() {
    var length = readerStub.lengthFraction();
    length("1", "");
    expect(length("", "")).toEqual([1, 1]);
  });
  
  it("multiplies the length by 3/2 for one dot", function() {
    var length = readerStub.lengthFraction();
    expect(length("2", ".")).toEqual([3, 4]);
  });
  
});
