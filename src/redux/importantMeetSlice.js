import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meetings: [],
};

const importantMeetSlice = createSlice({
  name: "importantMeet",
  initialState,
  reducers: {
    setMeetingsData: (state, action) => {
      state.meetings = action.payload;
    },
    toggleImportant: (state, action) => {
      const meeting = state.meetings.find((m) => m.id === action.payload);

      if (meeting) {
        meeting.important = !meeting.important;
      }
    },
    deleteMeeting: (state, action) => {
      state.meetings = state.meetings.filter((m) => m.id !== action.payload);
    },
  },
});

export const { setMeetingsData, toggleImportant, deleteMeeting } = importantMeetSlice.actions;
export default importantMeetSlice.reducer;
