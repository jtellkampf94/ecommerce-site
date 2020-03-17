import React, { useState, useEffect } from "react";
import moment from "moment";

import ErrorMessage from "../error-message/error-message.component";
import EditPassword from "../edit-password/edit-password.component";

const EditAccountDetails = ({
  accountDetails,
  editAccount,
  errors,
  showModal,
  viewModal,
  closeModal,
  editPassword,
  successMessage
}) => {
  const [accountFields, setAccountFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: ""
  });

  useEffect(() => {
    const { firstName, lastName, email, gender, dateOfBirth } = accountDetails;

    setAccountFields({
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD")
    });
  }, [accountDetails]);

  const { firstName, lastName, email, gender, dateOfBirth } = accountFields;

  const handleChange = e => {
    const { name, value } = e.target;
    setAccountFields({ ...accountFields, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editAccount(accountDetails._id, { ...accountFields });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          {errors.firstName && <ErrorMessage message={errors.firstName} />}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          {errors.lastName && <ErrorMessage message={errors.lastName} />}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>
        <div>
          <h5>Gender</h5>
          <div>
            <input
              type="checkbox"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={gender === "male" ? true : false}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={gender === "female" ? true : false}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <ErrorMessage message={errors.gender} />}
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <ErrorMessage message={errors.dateOfBirth} />}
        </div>
        <div>
          <button type="button" onClick={() => showModal()}>
            EDIT PASSWORD
          </button>
          {viewModal && accountDetails ? (
            <EditPassword
              editPassword={editPassword}
              customerId={accountDetails._id}
              closeModal={closeModal}
              errors={errors}
              successMessage={successMessage}
            />
          ) : null}
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default EditAccountDetails;
