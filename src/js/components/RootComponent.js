const React = require('react');

const Menu = require('./Menu/Menu');

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inMenu: true,
      user: {
        userId: '',
        username: '',
        config: {}
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  onLoginSuccess(user) {
    this.setState({
      inMenu: false,
      user: {
        userId: user.userId,
        username: user.username,
        config: user.config
      }
    });
  }

  render() {
    if (this.state.inMenu) {
      return <Menu onLoginSuccess={this.onLoginSuccess}/>;
    } else {
      return <div>Hello World!</div>;
    }
  }
}

module.exports = RootComponent;
