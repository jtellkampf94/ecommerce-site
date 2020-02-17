const handleCheckboxChange = (e, stateArray, setState, state, name) => {
  const { value } = e.target;
  if (stateArray.includes(value)) {
    const newArray = [...stateArray];
    const index = newArray.indexOf(value);
    newArray.splice(index, 1);
    setState({ ...state, [name]: newArray });
  } else {
    setState({ ...state, [name]: [...stateArray, value] });
  }
};

export default handleCheckboxChange;
