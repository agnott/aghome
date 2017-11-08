const React = require('react');

const ModalContainer = require('../shared/ModalContainer');
const Modal = require('../shared/Modal');
const Title = require('../shared/Title');

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ModalContainer>
        <Modal>
          <Title size="m">Main Menu</Title>
          <div className="menu-content">
            <input type="password" placeholder="hello"/>
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
              <div className="inactive"></div>
              <div>0</div>
              <div className="inactive"></div>
            </div>
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

module.exports = Menu;
