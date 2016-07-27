export default function fieldProps(props) {
  return props.error && props.touched ?
    { ...props, ...props.input, errorText: props.intl.formatMessage(props.error) } :
    { ...props, ...props.input };
}
