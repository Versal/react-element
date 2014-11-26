(function(){
  function registerReactElement(elementName, ReactComponent){
    document.registerElement(elementName, { prototype: customElement(ReactComponent) });
  };

  function customElement(ReactComponent) {
    var prototype = Object.create(HTMLElement.prototype, {
      props: {
        get: function(){
          return propTypedDataset(this.dataset, ReactComponent.propTypes);
        }
      }
    });

    prototype.attachedCallback = function(){
      this._render();
    }

    prototype.attributeChangedCallback = function(name, old, current) {
      if(name.match(/^data\-/)) {
        this._render();
      }
    };

    prototype._render = function(){
      React.renderComponent(ReactComponent(this.props), this);
    };

    return prototype;
  };

  function propTypedDataset(dataset, propTypes) {
    if(!propTypes) return dataset;

    var props = {};
    Object.keys(dataset).forEach(function(key){
      var stringifiedValue = dataset[key];
      var propType = propTypes[key];

      if(propType) {
        switch(propType) {

          // No need to parse strings
          case React.PropTypes.string:
            props[key] = stringifiedValue;
            break;

          default:
            // Assert, that JSON.parse does the job.
            try{
              props[key] = JSON.parse(stringifiedValue);
            } catch(err) {
              console.warn('Error parsing prop type', key, propType, stringifiedValue);
            }
        }
      } else {
        props[key] = stringifiedValue;
      }
    }.bind(this));
    return props;
  };

  if('undefined' !== typeof module) {
    module.exports = registerReactElement;
  } else if('undefined' !== typeof document) {
    document.registerReactElement = registerReactElement;
  }
})();
