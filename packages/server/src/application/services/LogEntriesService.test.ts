/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  LOG_2_ID,
  LogEntryResponse,
  CreateLogEntryRequest,
  EditLogEntryRequest,
} from '@mapistry/take-home-challenge-shared';
import { Database, LogEntriesRecord } from '../../shared/database';
import { LogEntriesService } from './LogEntriesService';

describe('LogEntriesService', () => {
  const subject = new LogEntriesService();

  describe('getLogEntries', () => {
    let result: LogEntryResponse[];

    beforeAll(async () => {
      result = await subject.getLogEntries(LOG_2_ID);
    });

    it('returns all of the log entries for the given log id', async () => {
      expect(result).toHaveLength(1);
    });

    it('only returns log entries for the given log id', async () => {
      expect(result.every((le) => le.logId === LOG_2_ID)).toBeTruthy();
    });
  });

  describe('createLogEntry', () => {
    const newEntry: CreateLogEntryRequest = {
      logDate: '2024-01-01',
      logValue: 23,
      type: 'create',
    };
    let result: LogEntryResponse;

    beforeAll(async () => {
      result = await subject.createLogEntry(LOG_2_ID, newEntry);
    });

    it('creates a new log entry', async () => {
      const allEntries = await subject.getLogEntries(LOG_2_ID);
      expect(allEntries).toHaveLength(2);
    });

    it('returns the new log entry with an id', async () => {
      expect(result.logDate).toEqual(new Date(newEntry.logDate));
      expect(result.logValue).toEqual(newEntry.logValue);
      expect(result.id).toBeDefined();
    });

    // Nesting this in the create so we ensured that we already created an entry.
    // this could be better but I'm doing it quick
    describe('editLogEntry', () => {
      const modifiedEntry: EditLogEntryRequest = {
        logEntryId: '',
        logDate: '2025-01-27',
        logValue: 12,
        type: 'edit',
      };
      let modifiedResult: LogEntryResponse;

      beforeAll(async () => {
        modifiedResult = await subject.editLogEntry(LOG_2_ID, {
          ...modifiedEntry,
          logEntryId: result.id, // sorry.
        });
      });

      it('modified the existing log entry', async () => {
        const allEntries = await subject.getLogEntries(LOG_2_ID);
        expect(allEntries).toHaveLength(2);
      });

      it('returns the modified log entry with an id', async () => {
        expect(modifiedResult.logDate).toEqual(new Date(modifiedEntry.logDate));
        expect(modifiedResult.logValue).toEqual(modifiedEntry.logValue);
        expect(modifiedResult.id).toBeDefined();
      });
    });
  });

  describe('deleteLogEntry', () => {
    let entryToDelete: LogEntriesRecord | undefined;
    let result: string;

    // Oh, are we not mocking the DB? Ideally would change that so we're not writing directly to the "db"
    // for these tests. Well, good for an integration test (on a non-public db shard or something?)
    // but bad for unit tests.

    // Oh wait, nevermind, seems we're using a LOG_2_ID that is not the same "Log" that we're using in the test client/server.
    beforeAll(async () => {
      [entryToDelete] = await Database.getAllLogEntries(LOG_2_ID);
      result = await subject.deleteLogEntry(LOG_2_ID, entryToDelete!.id);
    });

    it('deletes the log entry for the given id', async () => {
      const allEntries = await subject.getLogEntries(LOG_2_ID);
      expect(allEntries).toHaveLength(1);
      expect(allEntries.find((le) => le.id === entryToDelete!.id)).toBeFalsy();
    });

    it('returns the deleted log entry id', () => {
      expect(result).toBe(entryToDelete!.id);
    });
  });
});
