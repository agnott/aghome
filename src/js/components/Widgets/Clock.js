const React = require('react');
const Widget = require('../shared/Widget');
const Toggle = require('../shared/Toggle');
const moment = require('moment');

class ClockWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: Date.now(),
      bits: false
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
      bits: type === 'Bits'
    });
  }

  render() {
    const time = moment(this.state.time);

    const displayTime = time.format('MMM Do YYYY - h:mm:ss A');

    const pad = (value, nbits) => {
      if (value.length < nbits) {
        const p = '0'.repeat(nbits - value.length).split('');
        value.unshift(...p);
      }
      return value.map((v) => parseInt(v));
    };

    const bits = {
      day: pad((time.date() - 1).toString(2).split(''), 5),
      month: pad(time.month().toString(2).split(''), 4),
      year: pad(time.year().toString(2).slice(-2).split(''), 5),
      hour: pad(time.hour().toString(2).split(''), 5),
      minute: pad(time.minute().toString(2).split(''), 6),
      second: pad(time.second().toString(2).split(''), 6)
    };

    return (
      <Widget>
        <Toggle
          labels={['Standard', 'Bits']}
          default="Standard"
          onChange={this.onTypeChange}
        />
        {
          (this.state.bits) ?
            <div className="clock-bits">
              <div className={`cell ${bits.month[0] && 'active'}`}></div>
              <div className={`cell ${bits.month[1] && 'active'}`}></div>
              <div className={`cell ${bits.month[2] && 'active'}`}></div>
              <div className={`cell ${bits.month[3] && 'active'}`}></div>
              <div></div>
              <div></div>

              <div className={`cell ${bits.day[0] && 'active'}`}></div>
              <div className={`cell ${bits.day[1] && 'active'}`}></div>
              <div className={`cell ${bits.day[2] && 'active'}`}></div>
              <div className={`cell ${bits.day[3] && 'active'}`}></div>
              <div className={`cell ${bits.day[4] && 'active'}`}></div>
              <div></div>

              <div className={`cell ${bits.hour[0] && 'active'}`}></div>
              <div className={`cell ${bits.hour[1] && 'active'}`}></div>
              <div className={`cell ${bits.hour[2] && 'active'}`}></div>
              <div className={`cell ${bits.hour[3] && 'active'}`}></div>
              <div className={`cell ${bits.hour[4] && 'active'}`}></div>
              <div></div>

              <div className={`cell ${bits.minute[0] && 'active'}`}></div>
              <div className={`cell ${bits.minute[1] && 'active'}`}></div>
              <div className={`cell ${bits.minute[2] && 'active'}`}></div>
              <div className={`cell ${bits.minute[3] && 'active'}`}></div>
              <div className={`cell ${bits.minute[4] && 'active'}`}></div>
              <div className={`cell ${bits.minute[5] && 'active'}`}></div>

              <div className={`cell ${bits.second[0] && 'active'}`}></div>
              <div className={`cell ${bits.second[1] && 'active'}`}></div>
              <div className={`cell ${bits.second[2] && 'active'}`}></div>
              <div className={`cell ${bits.second[3] && 'active'}`}></div>
              <div className={`cell ${bits.second[4] && 'active'}`}></div>
              <div className={`cell ${bits.second[5] && 'active'}`}></div>
            </div>
            :
            <div className="clock">
              {displayTime}
            </div>
        }
      </Widget>
    );
  }
}

module.exports = ClockWidget;
