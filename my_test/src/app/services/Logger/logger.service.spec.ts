import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    service = new LoggerService();
  });
  it('should not have any messages at started', () => {
    let count = service.messages.length;
    expect(count).toBe(0);
  });
  it('should messages when log is called', () => {
    service.log('message');
    expect(service.messages.length).toBe(1);
  });
  it('should clear all teh messaged when clear is call', () => {
    service.log('messages');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
