(function(){
  var TestComponent = React.createClass({
    render: function(){
      return React.DOM.p(null, this.props.message);
    }
  });

  if('undefined' !== typeof(module)) {
    module.exports = TestComponent;
  } else if('undefined' !== typeof(window)) {
    window.TestComponent = TestComponent;
  }
})();
