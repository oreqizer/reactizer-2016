export default function fieldProps(props) {
  return props.error && props.touched ?
    { ...props, errorText: props.intl.formatMessage(props.error) } :
    props;
}
