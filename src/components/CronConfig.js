import React, { Component } from 'react';
import actions from '../store/actions';
import connect from '../store/connect';

const { createNewJob, deleteJob } = actions;

console.log(deleteJob, 'des');

class CronConfig extends Component {
  state = {
    input: ''
  };
  // componentDidMount() {
  //   store$.subscribe(st => {
  //     const arr = Object.entries(st.jobs).map(([id, value]) => ({
  //       id,
  //       ...value
  //     }));

  //     console.log('arr', arr);
  //     this.setState({ jobs: arr });
  //   });

  //   // store$.subscribe(st => this.setState({ jobs: st.jobs }));
  // }
  render() {
    const { input } = this.state;
    const { jobs } = this.props;
    console.log('props are ', this.props);
    return (
      <div className="cron-config">
        <input
          value={input}
          onChange={e => this.setState({ input: e.target.value })}
        />
        <button onClick={() => createNewJob(input)}>Add Job</button>
        <ul>
          {jobs.map(job => (
            <li className="job" key={job.id}>
              {job.pattern}
              <a onClick={() => deleteJob(job.id)}>Remove</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(st => {
  const jobs = Object.entries(st.jobs).map(([id, value]) => ({
    id,
    ...value
  }));
  return { jobs };
})(CronConfig);

// export default CronConfig;
