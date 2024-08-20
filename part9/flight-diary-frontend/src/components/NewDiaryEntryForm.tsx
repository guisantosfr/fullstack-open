// src/components/NewDiaryEntryForm.tsx
import { FC, FormEvent, useState } from 'react';
import axios from 'axios';

import { DiaryEntry, Weather, Visibility, NewDiaryEntry } from '../types';

interface NewDiaryEntryFormProps {
  onAddEntry: (newEntry: NewDiaryEntry) => void;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const NewDiaryEntryForm: FC<NewDiaryEntryFormProps> = ({ onAddEntry }) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry);
      onAddEntry(response.data);
      
      setNewDate('');
      setNewWeather(Weather.Sunny);
      setNewVisibility(Visibility.Great);
      setNewComment('');
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        if (error.response) {
          alert(`Failed to add diary entry: ${error.response.data}`);
        } else {
          alert('Network error. Please try again later.');
        }
      }else{
        alert('An unexpected error occurred.');
      }

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={newDate} onChange={e => setNewDate(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="visibility">Visibility:</label>

        {
          Object.values(Visibility).map((visibility) => (
            <label key={visibility}>
              <input 
              type='radio'
              value={visibility}
              checked={newVisibility === visibility}
              onChange={() => setNewVisibility(visibility)}
              />
              {visibility}
            </label>
          ))
        }
      </div>

      <div>
        <label htmlFor="weather">Weather:</label>

        {
          Object.values(Weather).map((weather) => (
            <label key={weather}>
              <input 
              type='radio'
              value={weather}
              checked={newWeather === weather}
              onChange={() => setNewWeather(weather)}
              />
              {weather}
            </label>
          ))
        }  
      </div>

      <div>
        <label htmlFor="comment">Comment:</label>
        <input type='text' id="comment" value={newComment} onChange={e => setNewComment(e.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewDiaryEntryForm;