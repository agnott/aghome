const React = require('react');

module.exports = (props) => {
  return (
    <div className="modal">
      {
        props.children
      }
    </div>
  );
};
