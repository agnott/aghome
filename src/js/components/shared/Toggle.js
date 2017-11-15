const React = require('react');

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.labels.indexOf(props.default),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      active: (this.state.active + 1) % this.props.labels.length
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.labels[this.state.active]);
      }
    });
  }

  render() {
    const optionWidth = `${100 / this.props.labels.length}%`;

    return (
      <div
        className="toggle-container"
        onClick={this.toggle}
      >
        <div className="label">
          {this.props.labels[this.state.active]}
        </div>
        <div className="toggle">
          <div
            className="selected"
            style={{
              left: `${this.state.active * 100 / this.props.labels.length}%`,
              width: optionWidth
            }}
          >
          </div>
          {
            this.props.labels.map((label, i) => {
              return (
                <div
                  key={i}
                  className="option"
                  style={{
                    width: optionWidth
                  }}
                >
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

module.exports = Toggle;
