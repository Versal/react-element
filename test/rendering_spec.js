var HelloWorld = React.createClass({
  render: function(){
    return React.DOM.p(null, this.props.message);
  }
});

describe('react-element', function(){
  var testElement = null;

  before(function(){
    document.registerReactElement('test-element', HelloWorld);
  });

  beforeEach(function(done){
    testElement = document.createElement('test-element');
    testElement.setAttribute('data-message', 'hello world');
    document.body.appendChild(testElement);
    setTimeout(done, 1);
  });

  afterEach(function(){
    document.body.removeChild(testElement);
  });

  it('renders fixture component', function(){
    expect(testElement.textContent).to.equal('hello world');
  });
});
