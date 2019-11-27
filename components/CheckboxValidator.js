import React from 'react';
import red from '@material-ui/core/colors/red';
import {FormControlLabel, Checkbox} from '@material-ui/core';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const red300 = red['500'];

const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    marginTop: '-6px',
};

class CheckboxValidator extends ValidatorComponent {

    render() {
        const { label, errorMessages, validators, requiredError, value, ...rest } = this.props;
        delete(rest.validatorListener)

        return (
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    {...rest}
                    ref={(r) => { this.input = r; }}
                  />
                }
                label={label}
              />
              {this.errorText()}
            </div>
        );
    }

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={style}>
                {this.getErrorMessage()}
            </div>
        );
    }
}

export default CheckboxValidator;
