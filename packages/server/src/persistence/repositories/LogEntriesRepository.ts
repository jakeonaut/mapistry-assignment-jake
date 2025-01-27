import { LogEntry } from '../../domain/entities/LogEntry';
import { Database } from '../../shared/database';
import { RecordNotFoundError } from '../../shared/errors';
import { LogEntriesPersistenceMapper } from '../mappers/LogEntriesPersistenceMapper';

export class LogEntriesRepository {
  constructor(protected logId: string) {}

  async createLogEntry(logEntry: LogEntry): Promise<LogEntry> {
    const dto = LogEntriesPersistenceMapper.toPersistence(logEntry);
    await Database.createLogEntry(dto);
    return logEntry;
  }

  async findById(logEntryId: string): Promise<LogEntry> {
    const record = await Database.findById(logEntryId);
    if (!record) {
      throw new RecordNotFoundError(
        `log entry not found for id: ${logEntryId}`,
      );
    }
    return LogEntriesPersistenceMapper.fromPersistence(record);
  }

  async destroyLogEntry(logEntry: LogEntry): Promise<string> {
    await Database.deleteLogEntry(logEntry.id.value);
    return logEntry.id.value;
  }
}
