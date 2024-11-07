import PropTypes from "prop-types";
import "./InputText.css";

export default function InputText({
  label,
  placeholder,
  textarea,
  required,
  onChange = () => {},
  defaultValue = "",
}) {
  return (
    <div className="input-wrapper">
      {textarea ? (
        <>
          <label htmlFor="input-textarea">{label}</label>
          <textarea
            id="input-textarea"
            name="input-textarea"
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </>
      ) : (
        <>
          <label htmlFor="input-text">{label}</label>
          <input
            onChange={onChange}
            type="text"
            id="input-text"
            name="input-text"
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
          />
        </>
      )}
    </div>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};