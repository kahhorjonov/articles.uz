import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShare, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import "../styles/userPageStyles.css";

class UserInformations extends React.Component {
  render() {
    return (
      <div className="col-md-8">
        <div className="user__informations ">
          <div className="user__informations--heading">
            <h1>Mening ma'lumotlarim</h1>
          </div>
          <div className="user__informations--info">
            <h4>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "2rem" }} />
              &nbsp; FIO:
            </h4>
            <h4 className="user__informations--name">Abdullayev Sodiq</h4>
          </div>
          <div className="user__informations--info">
            <h4>
              <FontAwesomeIcon icon={faShare} style={{ fontSize: "2rem" }} />
              &nbsp; Email:
            </h4>
            <h4 className="user__informations--name">
              sodiqabdullayev@gmail.com
            </h4>
          </div>
          <div className="user__informations--info">
            <h4>
              <FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: "2rem" }} />
              &nbsp; Telefon:
            </h4>
            <h4 className="user__informations--name">+998900444410</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInformations;
