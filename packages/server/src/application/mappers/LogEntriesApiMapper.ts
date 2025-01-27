import {
  CreateLogEntryRequest,
  LogEntryResponse,
} from '@mapistry/take-home-challenge-shared';
import { LogEntry } from '../../domain/entities/LogEntry';

export class LogEntriesApiMapper {
  public toResponse(logEntry: LogEntry): LogEntryResponse {
    return {
      id: logEntry.id.toString(),
      logId: logEntry.logId,
      logDate: logEntry.logDate,
      logValue: logEntry.logValue,
    };
  }

  public fromRequest(
    logId: string,
    createLogEntry: CreateLogEntryRequest,
  ): LogEntry {
    return LogEntry.create({
      logId,
      logDate: new Date(createLogEntry.logDate),
      logValue: createLogEntry.logValue,
    });
  }
}
