import { FC } from 'react';

import type { DiaryEntry } from '../types';


interface DiaryEntryProps {
  entry: DiaryEntry;
}

const DiaryEntry: FC<DiaryEntryProps> = ({ entry }) => {
  return (
    <li>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
      {entry.comment && <p>Comment: {entry.comment}</p>}
    </li>
  );
};

export default DiaryEntry;