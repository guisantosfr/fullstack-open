import { useState, useEffect, FC } from 'react'
import axios from 'axios'
import DiaryEntry from './components/DiaryEntry';
import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import { NewDiaryEntry } from './types'

const App: FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
        setDiaryEntries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaries();
  }, []);

  const handleNewEntry = (newEntry: NewDiaryEntry) => {
    const updatedEntry = { ...newEntry, id: Date.now() }; 
    setDiaryEntries([...diaryEntries, updatedEntry]);
  };


  return (
    <div>
      <h1>Diary Entries</h1>
      <NewDiaryEntryForm onAddEntry={handleNewEntry} />
      <ul>
        {diaryEntries.map(entry => (
          <DiaryEntry key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
  )
}

export default App
