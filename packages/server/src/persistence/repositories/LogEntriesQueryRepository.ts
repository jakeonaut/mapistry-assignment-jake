import { Database, LogEntriesRecord } from '../../shared/database';

export class LogEntriesQueryRepository {
  async findLogEntries(logId: string): Promise<LogEntriesRecord[]> {
    return Database.getAllLogEntries(logId);
  }
}
