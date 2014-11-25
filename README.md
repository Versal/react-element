# document.registerReactElement

Provides a convenience helper, that registers your react component as custom element, and transparently passes all `data-` attributes as props.

## Installation and usage

Install it with bower:
```
bower install react-element --save
```
Include it on your page and call `document.registerReactElement`:
```
<script src="bower_components/react-element/react-element.min.js"></script>
<script>
var ReactComponentClass = React.createClass({
  render: function(){
    return React.DOM.p(null, this.props.message);
  }
})
document.registerReactElement('test-react', ReactComponentClass);
</script>

<test-react data-message="Hello, world"></test-react>
```
