import { useState } from "react";

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const valueChange = (event) => {
    setValue(event.target.value);
  };

  const valueSetter = (newValue) => {
    setValue(newValue);
  };
  return [value, valueChange, valueSetter];
};

export default useInput;
