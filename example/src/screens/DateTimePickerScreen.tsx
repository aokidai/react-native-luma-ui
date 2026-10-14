import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Card,
  DatePicker,
  DateTimePicker,
  Text,
  TimePicker,
} from 'react-native-luma-ui';

export const DateTimePickerScreen = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* DatePicker */}
      <Card title="Date Picker (Select Date)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Luma UI standard calendar picker presented via Bottom Sheet:
        </Text>
        <DatePicker
          label="Date of Birth / Appointment"
          value={selectedDate}
          onConfirm={setSelectedDate}
          modalTitle="Select date"
        />
      </Card>

      {/* TimePicker */}
      <Card title="Time Picker (Select Time)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Select time in 24h or 12h format with quick presets:
        </Text>
        <TimePicker
          label="Start Time"
          value={selectedTime}
          onConfirm={setSelectedTime}
          is24Hour={true}
          modalTitle="Select time"
        />
      </Card>

      {/* DateTimePicker */}
      <Card title="Date & Time Picker (Combined)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Flexibly switch between Day and Time selection in a single Bottom
          Sheet:
        </Text>
        <DateTimePicker
          label="Completion Deadline"
          value={selectedDateTime}
          onConfirm={setSelectedDateTime}
          mode="datetime"
          modalTitle="Select Date & Time"
        />
      </Card>

      {/* Inline DatePicker */}
      <Card title="Inline Calendar (Embedded)">
        <DatePicker inline value={selectedDate} onChange={setSelectedDate} />
      </Card>
    </ScrollView>
  );
};

export default DateTimePickerScreen;
