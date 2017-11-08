const React = require('react');

module.exports = (props) => {
  return (
    <div className={`title ${props.size || 'm'}`}>
      <span>{props.children}</span>
    </div>
  );
};
