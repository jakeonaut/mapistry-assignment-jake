import {
  EditLogEntryRequest,
  LogEntryResponse,
} from '@mapistry/take-home-challenge-shared';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useLastVisitedLog } from '../../hooks/useLastVisitedLog';
import { useLogEntries } from '../../hooks/useLogEntries';
import { createLogEntry } from '../../shared/apiClient/logsApi';
import { Error } from '../shared/Error';
import { Loading } from '../shared/Loading';
import { CreateLogEntryModal } from './CreateLogEntryModal';
import { EditLogEntryModal } from './EditLogEntryModal';
import { ViewLogEntriesEmptyPage } from './ViewLogEntriesEmptyPage';
import { ViewLogEntriesHeader } from './ViewLogEntriesHeader';
import { ViewLogEntriesTable } from './ViewLogEntriesTable';

const Container = styled.div`
  height: 100vh;
`;

export function ViewLogEntries() {
  const { lastVisitedLog } = useLastVisitedLog();
  const { logEntries, error, isLoading, refreshLogEntries } = useLogEntries({
    logId: lastVisitedLog.id,
  });
  const [isCreateEntryOpen, setIsCreateEntryOpen] = useState(false);
  // TODO(jaketrower): as stated in EditLogEntryModal.tsx, could be a single modal render state rather than many
  // const [isEditEntryOpen, setIsEditEntryOpen] = useState(false);
  const [currentEditLogEntry, setCurrentEditLogEntry] = useState<
    LogEntryResponse | undefined
  >(undefined); // Relying on this modal open for now...

  const handleAddNew = useCallback(async () => {
    setIsCreateEntryOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateEntryOpen(false);
  }, [setIsCreateEntryOpen]);

  const handleCreateLogEntry = useCallback(
    async (logEntry) => {
      await createLogEntry({ logId: lastVisitedLog.id, logEntry });
      setIsCreateEntryOpen(false);
      refreshLogEntries();
    },
    [lastVisitedLog, refreshLogEntries, setIsCreateEntryOpen],
  );

  const handleClickEditLog = useCallback(
    async (logEntry: LogEntryResponse) => {
      setCurrentEditLogEntry(logEntry);
    },
    [setCurrentEditLogEntry],
  );

  const handleCloseEditModal = useCallback(() => {
    setCurrentEditLogEntry(undefined);
  }, [setCurrentEditLogEntry]);

  const handleEditLogEntry = useCallback(
    async (logEntry: EditLogEntryRequest) => {
      // await createLogEntry({ logId: lastVisitedLog.id, logEntry });
      alert(JSON.stringify(logEntry));
      setCurrentEditLogEntry(undefined);
      refreshLogEntries();
    },
    [lastVisitedLog, refreshLogEntries, setCurrentEditLogEntry],
  );

  function content() {
    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return (
        <Error message="Sorry, there was an error loading the log entries." />
      );
    }
    return logEntries.length ? (
      <ViewLogEntriesTable
        logId={lastVisitedLog.id}
        onClickEditLog={handleClickEditLog}
      />
    ) : (
      <ViewLogEntriesEmptyPage />
    );
  }

  return (
    <Container>
      {/** // TODO(jaketrower): Yeah I wanna reduce to one render modal since this could theoretically have both of them open at once, kinda messy */}
      {isCreateEntryOpen && (
        <CreateLogEntryModal
          handleClose={handleCloseCreateModal}
          handleCreate={handleCreateLogEntry}
        />
      )}
      {currentEditLogEntry && (
        <EditLogEntryModal
          logEntry={currentEditLogEntry}
          handleClose={handleCloseEditModal}
          handleEdit={handleEditLogEntry}
        />
      )}
      <ViewLogEntriesHeader
        onAddNew={handleAddNew}
        logName={lastVisitedLog.name}
      />
      {content()}
    </Container>
  );
}
