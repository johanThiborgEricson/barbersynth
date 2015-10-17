describe("lib/values", function() {
  it("returns done true for empty array", function() {
    expect(values([]).next().done).toBe(true);
  });
  
  it("firstly returns the first element", function() {
    expect(values(["first element"]).next().value).toEqual("first element");
  });
  
  it("firstly returns done false if array is non-empty", function() {
    expect(values(["non-empty"]).next().done).toEqual(false);
  });
  
  it("returns done true after accessing the first and only element", function() {
    var iterator = values(["first and only element"]);
    iterator.next();
    expect(iterator.next().done).toBe(true);
  });
  
});
