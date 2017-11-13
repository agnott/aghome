const React = require('react');
const Widget = require('../shared/Widget');
const Toggle = require('../shared/Toggle');
const moment = require('moment');

class ClockWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      artful: false
    };

    this.onTypeChange = this.onTypeChange.bind(this);
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

  onTypeChange(type) {
    this.setState({
      artful: type === 'Artful'
    });
  }

  render() {
    const current = moment(this.state.time).format('hh mm ss');

    return (
      <Widget>
        <Toggle
          labels={['Standard', 'Artful']}
          default="Standard"
          onChange={this.onTypeChange}
        />
        {
          (this.state.artful) ?
            <div>ARTFUL CLOCK</div>
            :
            current
        }
      </Widget>
    );
  }
}

module.exports = ClockWidget;
