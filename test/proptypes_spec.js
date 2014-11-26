var TypedElement = React.createClass({
  propTypes: {
    number: React.PropTypes.number,
    boolean: React.PropTypes.bool,
    string: React.PropTypes.string,
    object: React.PropTypes.object,
    array: React.PropTypes.array
  },

  render: function(){ return null; }
});

describe('react-element', function(){
  var testElement = null;

  before(function(){
    document.registerReactElement('typed-element', TypedElement);
  });

  beforeEach(function(done){
    testElement = document.createElement('typed-element');

    testElement.setAttribute('data-number', '73');
    testElement.setAttribute('data-boolean', 'true');
    testElement.setAttribute('data-string', 'string');
    testElement.setAttribute('data-object', '{ "key": "value" }');
    testElement.setAttribute('data-array', '[0,1,2]');
    testElement.setAttribute('data-foo', 'bar');

    document.body.appendChild(testElement);
    setTimeout(done, 1);
  });

  afterEach(function(){
    document.body.removeChild(testElement);
  });

  it('number', function(){
    expect(testElement.props.number).to.equal(73);
  });

  it('boolean', function(){
    expect(testElement.props.boolean).to.equal(true);
  });

  it('string', function(){
    expect(testElement.props.string).to.equal('string');
  });

  it('unspecified', function(){
    expect(testElement.props.foo).to.equal('bar');
  });

  it('boolean', function(){
    expect(testElement.props.object.key).to.equal('value');
  });

  it('array', function(){
    expect(testElement.props.array).to.deep.equal([0,1,2]);
  });

});
