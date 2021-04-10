import styles from './Input.module.scss';

const Input = ({
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  onKeyPress,
  placeholder,
  disabled,
  multiple,
  className,
}) => (
  <div className={`${styles.inputWrap} ${className ? className : ''}`}>
    <input
      type='text'
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus
    />
  </div>
)

export default Input;