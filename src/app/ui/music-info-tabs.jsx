
import './music-info-tabs.scss'

import React  from 'react'
import c      from 'classnames'

import MusicInfoTabStats        from './music-info-tab-stats.jsx'
import MusicInfoTabInformation  from './music-info-tab-information.jsx'

export default React.createClass({

  render() {
    const song  = this.props.song
    const chart = this.props.chart
    return <section className="music-info-tabs">
      <ul className="music-info-tabs--tabs">
        {this.renderTab(0, 'Stats')}
        {this.renderTab(1, 'Ranking')}
        {this.renderTab(2, 'Information')}
      </ul>
      <div className="music-info-tabs--panel">
        {this.renderCurrentTab()}
      </div>
    </section>
  },

  renderTab(index, title) {
    return <li
        className={c('music-info-tabs--tab',
            { 'is-active': index === this.state.selectedTab })}
        onClick={() => this.setState({ selectedTab: index })}>
      {title}
    </li>
  },
  renderCurrentTab() {
    switch (this.state.selectedTab) {
    case 0:
      return <MusicInfoTabStats
          song={this.props.song}
          chart={this.props.chart} />
    case 2:
      return <MusicInfoTabInformation
          song={this.props.song}
          chart={this.props.chart} />
    default:
      return '(Unimplemented)'
    }
  },

  getInitialState() {
    return {
      selectedTab: 0,
    }
  },

})