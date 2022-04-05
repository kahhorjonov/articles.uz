import { Component } from "react";

class LanguageSelect extends Component {
  handleChange = (option) => {
    localStorage.setItem("lang", option.target.value);
    window.location.reload();
  };

  render() {
    const lang = localStorage.getItem("lang") || "uz";

    return (
      <select
        style={{
          fontSize: "1.4rem",
          width: "12%",
        }}
        className="custom-select"
        onChange={this.handleChange}
        value={lang}
      >
        <option value="uz">O'z</option>
        <option value="ru">Ру</option>
        {/* <option value="en">En</option> */}
      </select>
    );
  }
}

export default LanguageSelect;
