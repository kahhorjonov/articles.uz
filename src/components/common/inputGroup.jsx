import React from "react";
import { InputGroupText, Input, InputGroup } from "reactstrap";

const InputGroupField = (props) => {
  const { name, label, error, ...rest } = props;

  return (
    <div>
      <InputGroup>
        <InputGroupText style={{ fontSize: "1.5rem" }}>+998</InputGroupText>
        <Input {...rest} id={name} name={name} className="form-control" />
      </InputGroup>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputGroupField;
