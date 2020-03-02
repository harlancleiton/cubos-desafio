import {
  isWithinInterval,
  parse,
  isSameDay,
  getDay,
  differenceInCalendarDays,
  eachDayOfInterval,
} from 'date-fns';

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
        case RuleType.WEEKLY:
          return this.isWeekly(rule, start, end);
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
    const dayParsed = this.parseDate(String(day));

    const startParsed = this.parseDate(start);
    const endParsed = this.parseDate(end);

    return isWithinInterval(dayParsed, {
      start: startParsed,
      end: endParsed,
    });
  }

  private static isWeekly(rule: Rule, start: string, end: string): boolean {
    if (rule.type !== RuleType.WEEKLY) {
      return false;
    }

    const { daysOfWeek } = rule;
    const startParsed = this.parseDate(start);
    const endParsed = this.parseDate(end);

    const startDay = getDay(startParsed);

    if (isSameDay(startParsed, endParsed)) {
      return daysOfWeek.includes(startDay);
    }

    const diff = differenceInCalendarDays(endParsed, startParsed);
    if (diff >= 7) {
      return true;
    }

    const daysOfInterval = eachDayOfInterval({
      start: startParsed,
      end: endParsed,
    });

    const result = daysOfInterval.map(day => daysOfWeek.includes(getDay(day)));

    return result.length > 0;
  }

  private static parseDate(s: string, formatString = 'dd-MM-yyyy'): Date {
    return parse(s, formatString, new Date());
  }
}
