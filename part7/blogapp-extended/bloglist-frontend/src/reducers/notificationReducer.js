import { createSlice } from '@reduxjs/toolkit';
const initialState = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
let timeOut = null;

export const handleNotification = (content, second) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => dispatch(setNotification(null)), second * 1000);
  };
};
export default notificationSlice.reducer;
