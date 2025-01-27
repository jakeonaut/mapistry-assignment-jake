import {
  DateLike,
  LogEntryResponse,
} from '@mapistry/take-home-challenge-shared';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useLogEntries } from '../../hooks/useLogEntries';
import { deleteLogEntry } from '../../shared/apiClient/logsApi';

interface ViewLogEntriesTableProps {
  logId: string;
  onClickEditLog: (logEntry: LogEntryResponse) => Promise<void>;
}

const StyledTable = styled.table`
  width: 100%;
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  td {
    padding: 1rem;
    text-align: center;
  }
  th {
    font-weight: 700;
    border-bottom: 1px solid;
    padding: 0 1rem;
    text-align: center;
  }
  .sortButton {
    cursor: pointer;
    padding: 1rem 0;
    display: inline-block;
  }
  /* https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting */
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
`;

enum SortType {
  NONE, // Didn't add support for this in the UI
  DATE_DESC,
  DATE_ASC,
  VALUE_DESC,
  VALUE_ASC,
}

function toDate(dateLike: DateLike): Date {
  // Would have performance issues running in a loop for large datasets.
  // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  return typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
}

export function ViewLogEntriesTable({
  logId,
  onClickEditLog,
}: ViewLogEntriesTableProps) {
  const { logEntries, refreshLogEntries } = useLogEntries({ logId });
  const [sortType, setSortType] = useState<SortType>(SortType.DATE_DESC);

  // I'd rather this not be a callback since we're just calling it once on render.
  const getSortingFunc = useCallback(() => {
    switch (sortType) {
      case SortType.DATE_DESC:
        return (a: LogEntryResponse, b: LogEntryResponse) =>
          toDate(b.logDate).valueOf() - toDate(a.logDate).valueOf();
      case SortType.DATE_ASC:
        return (a: LogEntryResponse, b: LogEntryResponse) =>
          toDate(a.logDate).valueOf() - toDate(b.logDate).valueOf();
      case SortType.VALUE_DESC:
        return (a: LogEntryResponse, b: LogEntryResponse) =>
          b.logValue - a.logValue;
      case SortType.VALUE_ASC:
        return (a: LogEntryResponse, b: LogEntryResponse) =>
          a.logValue - b.logValue;
      case SortType.NONE:
      default:
        return undefined;
    }
  }, [sortType]);

  const handleLogDateSortClick = useCallback(() => {
    setSortType((sortType) => {
      switch (sortType) {
        case SortType.DATE_DESC:
          return SortType.DATE_ASC;
        case SortType.DATE_ASC:
        default:
          return SortType.DATE_DESC;
      }
    });
  }, [setSortType]);
  const handleLogValueSortClick = useCallback(() => {
    setSortType((sortType) => {
      switch (sortType) {
        case SortType.VALUE_DESC:
          return SortType.VALUE_ASC;
        case SortType.VALUE_ASC:
        default:
          return SortType.VALUE_DESC;
      }
    });
  }, [setSortType]);

  const handleDelete = useCallback(
    async (logEntry: LogEntryResponse) => {
      // eslint-disable-next-line no-restricted-globals, no-alert
      // Would be better to also reuse a renderer modal and build a proper confirm rather than just use confirm. but I didn't change it!!
      if (confirm('Are you sure? :))))))')) {
        await deleteLogEntry(logEntry);
        // This refreshLogEntries doesn't seem to actually show any loading state (isLoading is immediately cleared? or at least not rendered)
        // Maybe we're not properly invalidating the persistence in the server,
        // Or maybe there's a FE issue with not properly rendering "Loading" for deletion. I didn't get to it.
        refreshLogEntries();
      }
    },
    [refreshLogEntries],
  );

  const handleEdit = useCallback(
    async (logEntry: LogEntryResponse) => {
      onClickEditLog(logEntry);
    },
    [refreshLogEntries],
  );

  function columns() {
    return (
      <thead>
        <tr>
          <th className="noselect">
            <div className="sortButton" onClick={handleLogDateSortClick}>
              Log Date{' '}
              {sortType === SortType.DATE_DESC
                ? '▼'
                : sortType === SortType.DATE_ASC
                ? '▲'
                : '▾'}
            </div>
          </th>
          <th className="noselect">
            <div className="sortButton" onClick={handleLogValueSortClick}>
              Log Value{' '}
              {sortType === SortType.VALUE_DESC
                ? '▼'
                : sortType === SortType.VALUE_ASC
                ? '▲'
                : '▾'}
            </div>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  function actions(logEntry: LogEntryResponse) {
    return (
      <div>
        <button
          type="button"
          onClick={() => handleEdit(logEntry)}
          style={{ marginRight: '0.5rem' }}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(logEntry)}>
          Delete
        </button>
      </div>
    );
  }

  function logEntryRow(logEntry: LogEntryResponse) {
    return (
      <tr key={logEntry.id}>
        <td>{new Date(logEntry.logDate).toLocaleDateString()}</td>
        <td>{logEntry.logValue}</td>
        <td>{actions(logEntry)}</td>
      </tr>
    );
  }

  function rows() {
    return (
      <tbody>
        {sortType === SortType.NONE
          ? logEntries.map((logEntry) => logEntryRow(logEntry))
          : logEntries
              .sort(getSortingFunc())
              .map((logEntry) => logEntryRow(logEntry))}
      </tbody>
    );
  }

  return (
    <div>
      <StyledTable>
        {columns()}
        {rows()}
      </StyledTable>
      <img
        src="/wordart.png"
        style={{ width: '25%', position: 'relative', top: 64, left: '25%' }}
      />
    </div>
  );
}
