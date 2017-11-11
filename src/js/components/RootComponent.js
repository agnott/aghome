const React = require('react');

const Menu = require('./Menu/Menu');

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inMenu: true
    };
  }

  render() {
    if (this.state.inMenu) {
      return <Menu />;
    } else {
      return <div>Hello World!</div>;
    }
  }
}

module.exports = RootComponent;
