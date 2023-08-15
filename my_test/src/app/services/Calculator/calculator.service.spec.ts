import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerServices: any;
  let calculator: CalculatorService;
  beforeEach(() => {
    console.log('calling before each');
    mockLoggerServices = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(mockLoggerServices);
  });
  it('should add two numbers', () => {
    console.log('calling add');
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerServices.log).toHaveBeenCalledTimes(1);
  });
  it('should subtrack two numbers', () => {
    console.log('calling substrack');
    let result = calculator.subtrack(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerServices.log).toHaveBeenCalledTimes(1);
  });
});
