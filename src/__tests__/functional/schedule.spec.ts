import request from 'supertest';

import app from '../../App';
import { Rule } from '../../models/Rule';
import { RuleType } from '../../types/RuleType';

describe('Schedule', () => {
  it('it should return a list of schedules', async () => {
    Rule.create<Rule>({
      type: RuleType.SPECIFIC,
      start: '15:00',
      end: '16:00',
      day: '10-01-2020',
    });

    const response = await request(app)
      .get('/api/v1/schedules')
      .query({ start: '10-01-2020', end: '10-01-2020' })
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.length > 0).toBe(true);
  });
});
