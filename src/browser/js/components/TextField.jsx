import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { TextField as NativeTextField } from 'material-ui';

import fieldProps from './tools/fieldProps';

const TextField = props => <NativeTextField {...fieldProps(props)} />;

TextField.propTypes = {
  error: PropTypes.object,
  touched: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(TextField);
