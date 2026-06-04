import {configureStore} from '@reduxjs/toolkit';
import importantMeetSlice from './importantMeetSlice';

export const store = configureStore({
    reducer: {
        importantMeet: importantMeetSlice
    },
});