import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import InputGroupField from "./inputGroup";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  // handleChange = ({ currentTarget: input }) => {
  //   const errors = { ...this.state.errors };
  //   const errorMessage = this.validateProperty(input);
  //   if (errorMessage) errors[input.name] = errorMessage;
  //   else delete errors[input.name];

  //   const data = { ...this.state.data };
  //   data[input.name] = input.value;
  //   console.log(input);

  //   data[input.name] = data.file ? data.file : input.value;
  //   console.log(data);
  //   this.setState({ data, errors });
  // };

  handleChange = (e) => {
    e.preventDefault();
    const data = { ...this.state.data };
    const input = e.currentTarget;
    const type = input.type;

    if (type !== "file") {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];
      data[input.name] = input.value;
      this.setState({ data, errors });

      // console.log((data[input.name] = input.value));
    }
    if (type === "file") {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty(input);
      // if (errorMessage) errors[input.name] = errorMessage;
      // else delete errors[input.name];
      data[input.name] = e.target.files[0];
      this.setState({ data, errors });
    }
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="butonss m-2">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        style={{ height: "unset" }}
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={(e) => this.handleChange(e)}
        error={errors[name]}
        autoComplete="on"
      />
    );
  }

  renderLoginInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      // <InputGroupField
      //   type={type}
      //   name={name}
      //   value={data[name]}
      //   label={label}
      //   onChange={(e) => this.handleChange(e)}
      //   error={errors[name]}
      //   autoComplete="on"
      // />
      <PhoneInput
        // type={type}
        // name={name}
        // label={label}
        country={"uz"}
        value={data[name]}
        // error={errors[name]}
        onChange={(e) => this.handleChange(e)}
      />
    );
  }

  renderFileInput(name, label, type = "file") {
    const { data, errors } = this.state;

    return (
      <Input
        label={label}
        type={type}
        name={name}
        value={data.file[0]}
        onChange={(e) => this.handleChange(e)}
        error={errors[name]}
        autoComplete="on"
      />
    );
  }

  renderPassportInput(name, label, type = "file") {
    const { data, errors } = this.state;

    return (
      <Input
        accept="image/*"
        label={label}
        type={type}
        name={name}
        value={data.passport[0]}
        onChange={(e) => this.handleChange(e)}
        error={errors[name]}
        autoComplete="on"
      />
    );
  }

  renderWorksInput(name, label, type = "file") {
    const { data, errors } = this.state;

    return (
      <Input
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        label={label}
        type={type}
        name={name}
        value={data.scientificWork[0]}
        onChange={(e) => this.handleChange(e)}
        error={errors[name]}
        autoComplete="on"
      />
    );
  }
}

export default Form;
