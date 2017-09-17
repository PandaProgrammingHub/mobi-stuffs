'use strict';

describe('Component: UserpublicComponent', function() {
  // load the controller's module
  beforeEach(module('salesdoorApp.userpublic'));

  var UserpublicComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UserpublicComponent = $componentController('userpublic', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
