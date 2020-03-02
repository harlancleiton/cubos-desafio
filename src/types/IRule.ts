import { IBaseModel } from './IBaseModel';
import { RuleType } from './RuleType';

export interface IRule extends IBaseModel {
  day?: string;
  type: RuleType;
  daysOfWeek: number[];
  start: string;
  end: string;
}
