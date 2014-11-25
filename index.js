(function(){
  function registerReactElement(elementName, ReactComponent){
    document.registerElement(elementName, { prototype: customElement(ReactComponent) });
  };

  function customElement(ReactComponent) {
    var prototype = Object.create(HTMLElement.prototype);

    prototype.attachedCallback = function(){
      this._render();
    };

    prototype.detachedCallbkack = function(){
      React.unmountComponentAtNode(this);
    };

    prototype.attributeChangedCallback = function(name, old, current) {
      if(name.match(/^data\-/)) {
        this._render();
      }
    };

    prototype._render = function(){
      React.renderComponent(ReactComponent(this.dataset), this);
    };

    return prototype;
  };

  if('undefined' !== typeof module) {
    module.exports = registerReactElement;
  } else if('undefined' !== typeof document) {
    document.registerReactElement = registerReactElement;
  }
})();
