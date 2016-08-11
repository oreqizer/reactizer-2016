import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { TextField as NativeTextField } from 'material-ui';

import fieldProps from './tools/fieldProps';

const TextField = props =>
  <NativeTextField {...fieldProps(props)} />;

TextField.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default injectIntl(TextField);
