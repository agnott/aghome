const React = require('react');
const axios = require('axios');

const ModalContainer = require('../shared/ModalContainer');
const Modal = require('../shared/Modal');
const Title = require('../shared/Title');
const LoadingBar = require('../shared/LoadingBar');

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: {
        value: '',
        submitted: false,
        confirmed: false
      },
      pin: {
        value: '',
        submitted: false,
        confirmed: false
      },
      loading: false
    };

    this.handleUsernameKeyPress = this.handleUsernameKeyPress.bind(this);
  }

  checkUserExistence() {
    axios.get('/api/users', {
      params: {
        username: this.state.username.value
      }
    }).then((res) => {
      // If the user exists, continue to password
      if (res.data.exists) {
        this.setState({
          loading: false,
          username: {
            ...this.state.username,
            submitted: true,
            confirmed: true
          }
        });

      // If the user doesn't exist, confirm actions
      } else {
        this.setState({
          loading: false,
          username: {
            ...this.state.username,
            submitted: true
          }
        });
      }
    }).catch((err) => {
      this.setState({
        loading: false
      });
    });
  }

  handleUsernameKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        loading: true,
        username: {
          ...this.state.username,
          value: e.target.value
        }
      }, this.checkUserExistence);
    }
  }

  renderInputs() {
    // Initial state, user inputs name
    if (!this.state.username.submitted) {
      return (
        <input
          type="text"
          placeholder="username"
          autoFocus={true}
          onKeyPress={this.handleUsernameKeyPress}
        />
      );

    // If the user doesn't exist, ask for creation
    } else if (this.state.username.submitted && !this.state.username.confirmed) {
      return (
        <div className="menu-options">
          <div>Back</div>
          <div>New User</div>
        </div>
      );

    } else {
      return (
        <div>
          <input type="password" placeholder="pin" />
          { this.renderKeyboard() }
        </div>
      );
    }
  }

  renderKeyboard() {
    return (
      <div className="menu-inputs">
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>del</div>
        <div>0</div>
        <div>ent</div>
      </div>
    );
  }

  render() {
    return (
      <ModalContainer>
        <Modal>
          <Title size="m">Login</Title>
          <div className="menu-content">
            { this.renderInputs() }
          </div>
          <LoadingBar active={this.state.loading} />
        </Modal>
      </ModalContainer>
    );
  }
}

module.exports = Menu;
