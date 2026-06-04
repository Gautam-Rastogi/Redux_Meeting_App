import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMeetingsData,
  toggleImportant,
  deleteMeeting,
} from "../redux/importantMeetSlice";



function ImportantMeeting() {
  let [meetings, setMeetings] = React.useState([]);
  const API_URL = "https://meetings-6a030-default-rtdb.asia-southeast1.firebasedatabase.app/";
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${API_URL}/meetings.json`)
      .then((response) => {
        const meetingsData = Object.entries(response.data).map(
          ([id, meeting]) => ({
            id,
            ...meeting,
          }),
        );
        setMeetings(meetingsData);
        dispatch(setMeetingsData(meetingsData));
        console.log(meetingsData);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });
  }, []);
  function importantMeetingsHandler(id, currentValue) {
    axios.patch(`${API_URL}/meetings/${id}.json`, { important: !currentValue }).then(() => {
      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting.id === id
            ? { ...meeting, important: !currentValue }
            : meeting
        )
      );
      dispatch(toggleImportant(id));
    }).catch((error) => {
      console.error("Error updating meeting:", error);
    });
  }

  function DeleteMeeting(id) {
    axios.delete(`${API_URL}/meetings/${id}.json`).then(() => {
      setMeetings((prev) =>
        prev.filter((meeting) => meeting.id !== id)
      );
      dispatch(deleteMeeting(id));
    }).catch((error) => {
      console.error("Error deleting meeting:", error);
    });
  }


  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center mt-6">Important Meeting</h1>
      {meetings.map((meeting, index) => (
        <div
          key={index}
          className="w-150 mx-auto mt-4 border p-6 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h2 className="font-bold text-lg">
              {meeting.description}
            </h2>
            <p>Recipient: {meeting.recipient}</p>
          </div>

          <div>
            <p>Date: {meeting.meetingDate}</p>
            <p>
              Time: {meeting.startTime} - {meeting.endTime}
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-green-500 hover:bg-green-700 text-xs text-white font-bold py-1 px-2 rounded" onClick={() => importantMeetingsHandler(meeting.id, meeting.important)}>
              {meeting.important ? 'Unmark as Important' : 'Mark as Important'}
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-xs text-white font-bold py-1 px-2 rounded" onClick={() => {DeleteMeeting(meeting.id)}}>
              Delete
            </button>
          </div>    
        </div>
      ))}
    </>
  );
}


export default ImportantMeeting