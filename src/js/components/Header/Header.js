const React = require('react');

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        {this.props.user.username}
      </header>
    );
  }
}

module.exports = Header;
