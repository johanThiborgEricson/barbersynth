describe("scheduleToneChange", function(){
  it("calls the computation-methods", function(){
    var bsStub = new Barbersynth();
    bsStub.computeBaseToneAndPartials = jasmine
    .createSpy("computeBaseToneAndPartials").and.returnValue({
      partials: "partials",
    });
    bsStub.computeA440Frequencies = jasmine.createSpy("computeA440Frequencies");
    bsStub.computeStartTime = jasmine.createSpy("computeStartTime");
    
    bsStub.scheduleToneChange({
      tones: "tones",
      noteTime: "fraction",
    });
    
    expect(bsStub.computeBaseToneAndPartials).toHaveBeenCalledWith("tones");
    expect(bsStub.computeA440Frequencies).toHaveBeenCalledWith("partials");
    expect(bsStub.computeStartTime).toHaveBeenCalledWith("fraction");
  });
  
  xit("doesn't make heavy computations between computeStartTime and schedulilńg", function(){
    
  });
});
