import React from 'react';
import { Room } from '../types/Room';

interface TableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
  }[];
  onSelect?: (item: T) => void;
}

const Table: <T extends Room>(props: TableProps<T>) => React.ReactElement = ({
  data,
  columns,
  onSelect,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => onSelect && onSelect(row)}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row.name}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;