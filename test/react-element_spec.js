var TestReactComponent = require('./fixture-react-component.js');
var registerReactElement = require('../index.js');

describe('react-element', function(){
  var subject = null;

  before(function(){
    registerReactElement('test-element', TestReactComponent);
  });

  describe('rendering', function(){
    beforeEach(function(){
      subject = document.createElement('test-component');
      subject.setAttribute('data-message', 'hello world');
      document.body.appendChild(subject);
    });

    afterEach(function(){
      document.body.removeChild(subject);
    });

    it('renders fixture component', function(){
      setTimeout(function(){
        expect(subject.textContent).to.equal('hello world');
      }, 1);
    });
  })
});
