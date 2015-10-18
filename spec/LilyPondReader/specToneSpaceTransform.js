describe("toneSpaceTransform", function() {
  it("maps 0 to 0 in the 0:th toneSpace", function() {
    var readerStub = LilyPondReader();
    var tone = 0;
    var transformBase = 0;
    expect(readerStub.toneSpaceTransform(tone, transformBase)).toBe(0);
  });
  
  it("maps 7 to 1 in the 0:th toneSpace", function() {
    var readerStub = LilyPondReader();
    var tone = 7;
    var transformBase = 0;
    expect(readerStub.toneSpaceTransform(tone, transformBase)).toBe(1);
  });
  
  it("maps 4 to 0 in the 4:th toneSpace", function() {
    var readerStub = LilyPondReader();
    var tone = 4;
    var transformBase = 4;
    expect(readerStub.toneSpaceTransform(tone, transformBase)).toBe(0);
  });
  
  it("maps 3 to 3/7 in the 0:th toneSpace", function() {
    var readerStub = LilyPondReader();
    var tone = 3;
    var transformBase = 0;
    expect(readerStub.toneSpaceTransform(tone, transformBase)).toBe(3/7);
  });
  
  it("maps -4 to -4/7 in the 0:th toneSpace", function() {
    var readerStub = LilyPondReader();
    var tone = -4;
    var transformBase = 0;
    expect(readerStub.toneSpaceTransform(tone, transformBase)).toBe(-4/7);
  });
  
});
