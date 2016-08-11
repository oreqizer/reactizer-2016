export default function fieldProps(props) {
  return props.meta.error && props.meta.touched ?
    { ...props, ...props.input, ...props.meta, errorText: props.intl.formatMessage(props.error) } :
    { ...props, ...props.input, ...props.meta };
}
