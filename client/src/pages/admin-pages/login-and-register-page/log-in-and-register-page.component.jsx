import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Register from "../../../components/register/register.component";
import LogIn from "../../../components/log-in/log-in.component";

import {
  selectAdminLoginErrors,
  selectAdminRegisterErrors
} from "../../../redux/admin/admin.selectors";
import {
  adminEmailSignInStart,
  adminRegisterStart
} from "../../../redux/admin/admin.actions";

const AdminLogInAndRegisterPage = ({
  adminEmailSignInStart,
  adminRegisterStart,
  adminRegisterErrors,
  adminLoginErrors
}) => {
  return (
    <div className="log-in-and-register">
      <h1>Admin</h1>
      <LogIn
        emailSignInStart={adminEmailSignInStart}
        errors={adminLoginErrors}
      />
      <Register
        register={adminRegisterStart}
        errors={adminRegisterErrors}
        admin
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  adminLoginErrors: selectAdminLoginErrors,
  adminRegisterErrors: selectAdminRegisterErrors
});

const mapDispatchToProps = dispatch => ({
  adminEmailSignInStart: (email, password) =>
    dispatch(adminEmailSignInStart({ email, password })),
  adminRegisterStart: credentials => dispatch(adminRegisterStart(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogInAndRegisterPage);
