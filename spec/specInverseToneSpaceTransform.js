describe("inverseToneSpaceTransform", function() {
  it("maps 0 to 0 in the 0:th tone-space", function() {
    var readerStub = LilyPondReader();
    var transformedTone = 0;
    var transformBase = 0;
    expect(readerStub.inverseToneSpaceTransform(transformedTone, transformBase)).toBe(0);
  });
  
  it("maps 1 to 7 in the 0:th tone-space", function() {
    var readerStub = LilyPondReader();
    var transformedTone = 1;
    var transformBase = 0;
    expect(readerStub.inverseToneSpaceTransform(transformedTone, transformBase)).toBe(7);
  });
  
  it("maps 1 to 11 in the 4:th tone-space", function() {
    var readerStub = LilyPondReader();
    var transformedTone = 1;
    var transformBase = 4;
    expect(readerStub.inverseToneSpaceTransform(transformedTone, transformBase)).toBe(11);
  });
  
});
