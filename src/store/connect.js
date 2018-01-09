import React, { Component } from 'react';
import { store$ } from './store';

export default selector => Cmp =>
  class Connected extends Component {
    state = {};
    componentWillMount() {
      store$.subscribe(store => this.setState({ ...selector(store) }));
    }
    render() {
      return <Cmp {...this.props} {...this.state} />;
    }
  };
