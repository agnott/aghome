const React = require('react');
const Header = require('./../Header/Header');

const Widgets = {
  Clock: require('../Widgets/Clock')
};

class ComponentRegistry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-container">
        <Header user={this.props.user}/>
        <div className="home-content">
          <div className="home-column">
            <Widgets.Clock />
          </div>
          <div className="home-column">
            <Widgets.Clock />
          </div>
          <div className="home-column">
            <Widgets.Clock />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ComponentRegistry;
