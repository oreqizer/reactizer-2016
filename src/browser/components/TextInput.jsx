import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { TextField } from 'material-ui';


function maybeError(props) {
  return props.meta.error && props.meta.touched
    ? props.intl.formatMessage(props.meta.error)
    : '';
}

const TextInput = props => (
  <TextField
    id={props.id}
    name={props.input.name}
    type={props.type}
    floatingLabelText={props.floatingLabelText}
    errorText={maybeError(props)}
    value={props.input.value}
    onChange={props.input.onChange}
    onFocus={props.input.onFocus}
    onBlur={props.input.onBlur}
  />
);

TextInput.propTypes = {
  input: PropTypes.object.isRequired,  // eslint-disable-line
  meta: PropTypes.object.isRequired,  // eslint-disable-line
  id: PropTypes.string,
  type: PropTypes.string,
  floatingLabelText: PropTypes.string,
  // connected
  intl: intlShape.isRequired,  // eslint-disable-line
};

export default injectIntl(TextInput);
