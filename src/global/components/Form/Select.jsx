const Select = ({ value, options = [], ...props }) => {
  return (
    <select {...props}>
      {value === undefined && <option hidden>Не выбрано</option>}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export { Select };
