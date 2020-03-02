import { Request, Response } from 'express';
import { parse, eachDayOfInterval, isSameDay, format, getDay } from 'date-fns';

import { ISchedule } from '../types/ISchedule';
import { Rule } from '../models/Rule';
import { RuleType } from '../types/RuleType';

export class SchedulesController {
  public index(req: Request, res: Response): any {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json();
    }

    const rules = Rule.findByPeriod(start, end);

    const startParsed = SchedulesController.parseDate(start);
    const endParsed = SchedulesController.parseDate(end);

    const interval = eachDayOfInterval({ start: startParsed, end: endParsed });

    const schedules: ISchedule[] = [];

    interval.forEach(day => {
      const schedule: ISchedule = {
        day: format(day, 'dd-MM-yyyy'),
        intervals: [],
      };

      const dayWeek = getDay(day);

      rules.forEach(rule => {
        function addRuleToInterval(): void {
          schedule.intervals.push({ start: rule.start, end: rule.end });
        }

        switch (rule.type) {
          case RuleType.DAILY:
            addRuleToInterval();
            break;
          case RuleType.SPECIFIC:
            if (
              isSameDay(SchedulesController.parseDate(String(rule.day)), day)
            ) {
              addRuleToInterval();
            }
            break;
          case RuleType.WEEKLY:
            if (rule.daysOfWeek.includes(dayWeek)) {
              addRuleToInterval();
            }
            break;
          default:
        }
      });

      if (schedule.intervals.length > 0) {
        schedules.push(schedule);
      }
    });

    return res.json(schedules);
  }

  private static parseDate(s: string, formatString = 'dd-MM-yyyy'): Date {
    return parse(s, formatString, new Date());
  }
}

export default new SchedulesController();
