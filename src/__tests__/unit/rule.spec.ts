import { Rule } from '../../models/Rule';
import { RuleType } from '../../types/RuleType';

describe('Rule', () => {
  it('check if a daily rule is part of filter', () => {
    const rule = Rule.create<Rule>({
      type: RuleType.DAILY,
      start: '12:00',
      end: '13:00',
    });

    const rules = Rule.findByPeriod('03-02-2020', '06-02-2020');

    expect(rules).toContain(rule);
  });

  it('check if a specific rule is part of filter', () => {
    const rule = Rule.create<Rule>({
      type: RuleType.SPECIFIC,
      start: '12:00',
      end: '13:00',
      day: '04-02-2020',
    });

    const rules = Rule.findByPeriod('03-02-2020', '06-02-2020');

    expect(rules).toContain(rule);
  });

  it('check if a weekly rule is part of filter', () => {
    const rule = Rule.create<Rule>({
      type: RuleType.WEEKLY,
      start: '12:00',
      end: '13:00',
      daysOfWeek: [1, 3],
    });

    const rules = Rule.findByPeriod('03-02-2020', '06-02-2020');

    expect(rules).toContain(rule);
  });
});
