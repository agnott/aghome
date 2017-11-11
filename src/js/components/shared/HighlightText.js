const React = require('react');

module.exports = (props) => {
  return (
    <div className="highlight">
      <span>{props.children}</span>
    </div>
  );
};
