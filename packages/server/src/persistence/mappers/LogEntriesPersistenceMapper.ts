import { LogEntry } from '../../domain/entities/LogEntry';
import { LogEntriesRecord } from '../../shared/database';

// TODO(jaketrower): what the heck?!?
// Looks like this persistence is more of a pseudo cache rather than a proper functioning cache, from what I understand?
// But I'll treat it as if it would work in production and try to silo some stuff
export class LogEntriesPersistenceMapper {
  static toPersistence(logEntry: LogEntry): LogEntriesRecord {
    return {
      id: logEntry.id.toString(),
      logId: logEntry.logId,
      logDate: logEntry.logDate,
      logValue: logEntry.logValue,
    };
  }

  static fromPersistence(logEntriesRecord: LogEntriesRecord): LogEntry {
    return LogEntry.createFromPersistence(
      logEntriesRecord,
      logEntriesRecord.id,
    );
  }
}
