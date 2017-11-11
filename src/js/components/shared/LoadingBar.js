const React = require('react');

module.exports = (props) => {
  return (
    <div className={`loading-bar ${(props.active) ? 'active' : ''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
