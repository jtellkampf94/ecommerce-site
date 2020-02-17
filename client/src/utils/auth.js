const getCurrentAdmin = () => {
  try {
    const token = localStorage.getItem("adminJwtToken");
    return token;
  } catch (error) {
    return null;
  }
};

const getCurrentCustomer = () => {
  try {
    const token = localStorage.getItem("jwtToken");
    return token;
  } catch (error) {
    return null;
  }
};

export default { getCurrentAdmin, getCurrentCustomer };
