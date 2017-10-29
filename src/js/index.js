const React = require('react');
const ReactDOM = require('react-dom');

const Styles = require('../css/index.less');

const RootComponent = require('./components/RootComponent');

ReactDOM.render(
  <RootComponent/>,
  document.getElementById('viewport')
);
