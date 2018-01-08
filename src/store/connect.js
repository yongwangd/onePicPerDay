import React, { Component } from 'react';
import { store$ } from './store';

const connect = selector => Cmp => {
  console.log('selector', selector);
  return class Connected extends Component {
    state = {};
    componentWillMount() {
      store$.subscribe(store => {
        console.log('current sotre', store);
        console.log(selector(store));
        this.setState({ ...selector(store) });
      });
    }
    render() {
      return <Cmp {...this.props} {...this.state} />;
    }
  };
};

export default connect;
