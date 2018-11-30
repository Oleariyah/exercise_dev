import React, { Component } from 'react';
import {AppBar, Tabs} from '@material-ui/core/';
import Tab from '@material-ui/core/Tab';
import withWidth from '@material-ui/core/withWidth';

class Footer extends Component {

  onIndexSelect = (e, index) => {
      const {onSelect, muscles} = this.props 
      onSelect( index === 0 ? '' : muscles[index - 1])
  }

  getIndex = () => { 
    const {category, muscles} = this.props
    return category
  ? muscles.findIndex(group => group === category) + 1
  : 0
  }

  render () {
    
    const {width, muscles } = this.props
    return (
      <AppBar position="static">
      <Tabs
        value={this.getIndex()}
        onChange={this.onIndexSelect}
        indicatorColor="secondary"
        textColor="secondary"
        centered = {width !=='xs'}
        scrollable = {width ==='xs'}
        scrollButtons = 'on'
      >
        <Tab label="All" />
        {muscles.map(group =>
        <Tab key={group} label={group} />
        )}
      </Tabs>
      </AppBar>
    )
  }
}


export default withWidth()(Footer)