import orderActionTypes from './order.types'

const INITIAL_STATE = {
  currentOrder: {},
  orders: [],
  error: null
}

const orderReducer = (state = INITIAL_STATE, action) {
  switch(action.type) {
    case orderActionTypes.PROCESS_PAYMENT_SUCCESS:
      return {...state, currentOrder: action.payload, error: null}
    case orderActionTypes.PROCESS_PAYMENT_FAILURE:
      return {...state, currentOrder: {}, orders: [], error:action.payload}
    default:
      return state
  }
}

export default orderReducers