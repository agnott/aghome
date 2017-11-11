const React = require('react');

module.exports = (props) => {
  return (
    <div className="modal-container">
      {
        props.children
      }
    </div>
  );
};
