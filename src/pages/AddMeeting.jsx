import * as React from "react";
import axios from "axios";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { CalendarIcon, Clock2Icon } from "lucide-react";
import { toast } from "sonner";

function AddMeeting() {
  const [date, setDate] = React.useState(null);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showTimeFields, setShowTimeFields] = React.useState(false);
  const API_URL =
    "https://meetings-6a030-default-rtdb.asia-southeast1.firebasedatabase.app/";

  const handleDateSelect = (selectedDate) => {
    if (!selectedDate) return;

    setDate(selectedDate);
    setShowCalendar(false);
    setShowTimeFields(true);
  };
  let descRef = useRef();
  let recipientRef = useRef();
  let dateRef = useRef();
  let startTimeRef = useRef();
  let endTimeRef = useRef();

  function handleScheduleMeeting() {
    const description = descRef.current.value;
    const recipient = recipientRef.current.value;
    const meetingDate = dateRef.current.value;
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;
    const important = false;
    axios
      .post(`${API_URL}/meetings.json`, {
        description,
        recipient,
        meetingDate,
        startTime,
        endTime,
        important
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Meeting scheduled successfully!");
        descRef.current.value = "";
        recipientRef.current.value = "";
        dateRef.current.value = "";
        startTimeRef.current.value = "";
        endTimeRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error scheduling meeting:", error);
      });
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-16 overflow-visible">
      <CardHeader className="text-center">
        <CardTitle>Schedule a Meeting</CardTitle>
        <CardDescription>
          Enter the details of your meeting
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            {/* Meeting Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Meeting Description</Label>
              <Input
                id="description"
                placeholder="Enter meeting description"
                ref={descRef}
              />
            </div>

            {/* Recipient */}
            <div className="grid gap-2">
              <Label htmlFor="recipient">Add Recipient</Label>
              <Input
                id="recipient"
                type="email"
                placeholder="Enter recipient email"
                ref={recipientRef}
              />
            </div>

            {/* Date Picker */}
            <div className="grid gap-2 relative">
              <Label>Meeting Date</Label>

              <InputGroup>
                <InputGroupInput
                  type="text"
                  readOnly
                  value={
                    date ? date.toLocaleDateString() : "Click to select a date"
                  }
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="cursor-pointer"
                  ref={dateRef}
                />

                <InputGroupAddon
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>

              {/* Calendar */}
              {showCalendar && (
                <div className="absolute top-full mt-2 z-50 rounded-lg border bg-background shadow-lg">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>

            {/* Time Fields - Visible after date selection */}
            {showTimeFields && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-time">Start Time</Label>

                  <InputGroup>
                    <InputGroupInput
                      id="start-time"
                      type="time"
                      ref={startTimeRef}
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="h-4 w-4 text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="end-time">End Time</Label>

                  <InputGroup>
                    <InputGroupInput
                      id="end-time"
                      type="time"
                      ref={endTimeRef}
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="h-4 w-4 text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button onClick={handleScheduleMeeting} className="w-full">
          Schedule Meeting
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddMeeting;
