const React = require('react');
const config = require('./../config/config');

const Menu = require('./Menu/Menu');
const ComponentRegistry = require('./ComponentRegistry/ComponentRegistry');

class RootComponent extends React.Component {
  constructor(props) {
    super(props);

    if (config.dev) {
      this.state = {
        inMenu: false,
        user: config.mockUser
      };
    } else {
      this.state = {
        inMenu: true,
        user: {
          userId: '',
          username: '',
          config: {}
        }
      };
    }

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
      return <Menu onLoginSuccess={this.onLoginSuccess} />;
    } else {
      return <ComponentRegistry user={this.state.user} />;
    }
  }
}

module.exports = RootComponent;
