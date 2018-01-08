import React, { Component } from 'react';
import { store$ } from './store';

const connect = selector => Cmp =>
  class Connected extends Component {
    state = {};
    componentWillMount() {
      store$.subscribe(store => this.setState({ ...selector(store) }));
    }
    render() {
      return <Cmp {...this.props} {...this.state} />;
    }
  };

export default connect;
