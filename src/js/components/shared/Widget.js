const React = require('react');

module.exports = (props) => {
  return (
    <div className="widget">
      {
        props.children
      }
    </div>
  );
};
