const React = require('react');
const axios = require('axios');

const ModalContainer = require('../shared/ModalContainer');
const Modal = require('../shared/Modal');
const Title = require('../shared/Title');
const HighlightText = require('../shared/HighlightText');
const LoadingBar = require('../shared/LoadingBar');

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      username: {
        value: '',
        submitted: false,
        confirmed: false,
      },
      password: {
        value: '',
        submitted: false,
        confirmed: false
      },
      loading: false
    };

    this.newUser = this.newUser.bind(this);
    this.resetUser = this.resetUser.bind(this);

    this.handleUsernameKeyPress = this.handleUsernameKeyPress.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);

    this.handlePasswordKeyPress = this.handlePasswordKeyPress.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  setLoading(bool) {
    this.setState({
      loading: bool
    });
  }

  loginUser() {
    this.setLoading(true);

    axios.post('/api/users/login', {
      username: this.state.username.value,
      password: this.state.password.value
    }).then(() => {
      this.setLoading(false);
    }).catch(() => {
      this.setLoading(false);
    });
  }

  createUser() {
    this.setLoading(true);

    axios.post('/api/users/create', {
      username: this.state.username.value,
      password: this.state.password.value
    }).then(() => {
      this.setLoading(false);
    }).catch(() => {
      this.setLoading(false);
    });
  }

  checkUserExistence() {
    this.setLoading(true);

    axios.get('/api/users', {
      params: {
        username: this.state.username.value
      }
    }).then((res) => {
      this.setLoading(false);

      // If the user exists, continue to password
      if (res.data.exists) {
        this.setState({
          username: {
            ...this.state.username,
            submitted: true,
            confirmed: true
          }
        });

      // If the user doesn't exist, confirm actions
      } else {
        this.setState({
          username: {
            ...this.state.username,
            submitted: true
          }
        });
      }
    }).catch(() => {
      this.setLoading(false);
    });
  }

  newUser() {
    this.setState({
      create: true,
      username: {
        ...this.state.username,
        confirmed: true
      }
    });
  }

  resetUser() {
    this.setState({
      username: {
        ...this.state.username,
        submitted: false
      }
    });
  }

  handleUsernameKeyPress(e) {
    if (e.key === 'Enter') {
      this.checkUserExistence();
    }
  }

  handleUsernameChange(e) {
    this.setState({
      username: {
        ...this.state.username,
        value: e.target.value
      }
    });
  }

  handlePasswordKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.create) {
        this.createUser();
      } else {
        this.loginUser();
      }
    }
  }

  handlePasswordChange(e) {
    this.setState({
      password: {
        ...this.state.password,
        value: e.target.value
      }
    });
  }

  renderInputs() {
    // Initial state, user inputs name
    if (!this.state.username.submitted) {
      return (
        <input
          type="text"
          placeholder="username"
          autoFocus={true}
          value={this.state.username.value}
          onChange={this.handleUsernameChange}
          onKeyPress={this.handleUsernameKeyPress}
        />
      );

    // If the user doesn't exist, ask for creation
    } else if (this.state.username.submitted && !this.state.username.confirmed) {
      return (
        <div>
          <HighlightText>Oops, this user does not exist!</HighlightText>
          <div className="menu-options">
            <div onClick={this.resetUser}>Back</div>
            <div onClick={this.newUser}>New User</div>
          </div>
        </div>
      );

    } else {
      return (
        <input
          type="password"
          placeholder="password"
          autoFocus={true}
          value={this.state.password.value}
          onChange={this.handlePasswordChange}
          onKeyPress={this.handlePasswordKeyPress}
        />
      );
    }
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
