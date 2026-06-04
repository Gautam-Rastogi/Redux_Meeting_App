import {Link} from "react-router-dom"
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import ImportantMeetings from "./pages/ImportantMeeting"
import AddMeeting from "./pages/AddMeeting"
import { Toaster } from "sonner";
import {useSelector} from "react-redux";


function App() {

 const meetings  = useSelector((state) => state.importantMeet.meetings);
 const importantMeetingsCount = meetings.filter(meeting => meeting.important).length;
  

  return (
    <>
      <div className="navbar flex items-center justify-between p-4 bg-gray-800 text-white">
        <h2><Link to="/">Meeting App</Link></h2>
        <div className="nav-links flex space-x-4">
          <h3><Link to="/important-meetings">Important Meetings ({importantMeetingsCount})</Link></h3>
          <h3><Link to="/add-meeting">Add New Meeting</Link></h3>
        </div>
      </div>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/important-meetings" element={<ImportantMeetings />} />
        <Route path="/add-meeting" element={<AddMeeting />} />
      </Routes>
    </>  
  )
}

export default App
