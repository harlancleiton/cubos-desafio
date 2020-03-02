import { isWithinInterval, parse } from 'date-fns';

import { IRule } from '../types/IRule';
import { RuleType } from '../types/RuleType';
import { BaseModel } from './BaseModel';

export class Rule extends BaseModel implements IRule {
  day?: string | undefined;

  type: RuleType;

  daysOfWeek: number[];

  start: string;

  end: string;

  public static findByPeriod(start: string, end: string): Rule[] {
    const rules = this.findAll<Rule>();

    const rulesFiltered = rules.filter(rule => {
      switch (rule.type) {
        case RuleType.DAILY:
          return this.isDaily(rule);
        case RuleType.SPECIFIC:
          return this.isSpecific(rule, start, end);
        // TODO weekly
        default:
          return false;
      }
    });

    return rulesFiltered;
  }

  private static isDaily(rule: Rule): boolean {
    if (rule.type !== RuleType.DAILY) {
      return false;
    }

    return true;
  }

  private static isSpecific(rule: Rule, start: string, end: string): boolean {
    if (rule.type !== RuleType.SPECIFIC) {
      return false;
    }

    const { day } = rule;
    const dayParsed = parse(String(day), 'dd-MM-yyyy', new Date());

    const startParsed = parse(start, 'dd-MM-yyyy', new Date());
    const endParsed = parse(end, 'dd-MM-yyyy', new Date());

    return isWithinInterval(dayParsed, {
      start: startParsed,
      end: endParsed,
    });
  }
}
