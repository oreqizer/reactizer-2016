import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { TextField as NativeTextField } from 'material-ui';

import fieldProps from './tools/fieldProps';

const TextField = props =>
  <NativeTextField {...fieldProps(props)} />;

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export default injectIntl(TextField);
