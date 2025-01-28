import {
  CreateLogEntryRequest,
  EditLogEntryRequest,
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
    req: CreateLogEntryRequest | EditLogEntryRequest,
  ): LogEntry {
    switch (req.type) {
      case 'create':
        return LogEntry.create({
          logId,
          logDate: new Date(req.logDate),
          logValue: req.logValue,
        });
      case 'edit':
        // In production code, we'd probably have to do a fetch from persistence here,
        // maybe relying on the persistence mapper some how?
        // Actually, I may be a little confusing "cache" and "persistence", as it looks like the database directly uses persistence mapper functions?

        // But anyway, at this point we should be able to rely on the logEntryId as the persistence LogEntry(Entity).id.
        // If we weren't using logEntryId as the Entity id, we couldn't do that here.
        return LogEntry.createFromPersistence(
          {
            logId,
            logDate: new Date(req.logDate),
            logValue: req.logValue,
          },
          req.logEntryId,
        );
      default:
        // req satisfies never; // TODO(jaketrower): getting an error when I try to do this. Problem with yarn or node version?
        throw new Error('unreachable');
    }
  }
}
