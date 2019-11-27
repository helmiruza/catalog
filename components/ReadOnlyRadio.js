import React from 'react';
import Radio from '@material-ui/core/Radio';

class ReadOnlyRadio extends React.Component {
  render () {
    const { checked } = this.props

    return (
      <Radio
        checked={checked}
        value="a"
        disableRipple={true}
        name="radio-button"
        style={{padding: 3}}
      />
    )
  }
}
export default ReadOnlyRadio
