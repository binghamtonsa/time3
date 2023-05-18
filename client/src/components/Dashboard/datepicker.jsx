import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ onSave }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Handle save button click
  const handleSave = () => {
    onSave(startDate, endDate);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default DateRangePicker;