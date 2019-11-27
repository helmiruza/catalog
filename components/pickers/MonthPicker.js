import React, { Fragment, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = theme => ({

})

class YearMonthPicker extends React.Component {
  render () {
    const {selectedDate, handleDateChange} = this.props

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("2018-01-01")}
          value={selectedDate}
          onChange={handleDateChange}
          inputProps={{ 'disabled': true }}
        />
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(useStyles)(YearMonthPicker)
