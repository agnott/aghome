const React = require('react');
const Widget = require('../shared/Widget');
const moment = require('moment');

class ClockWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      artful: false
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: Date.now()
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const display = moment(this.state.time).format('hh mm ss');

    return (
      <Widget>
        {display}
      </Widget>
    );
  }
}

module.exports = ClockWidget;
