import request from 'supertest';

import app from '../../App';
import { Rule } from '../../models/Rule';
import { RuleType } from '../../types/RuleType';

describe('Rule', () => {
  it('should create a new rule', async () => {
    const response = await request(app)
      .post('/api/v1/rules')
      .send({
        type: 'daily',
        start: '12:00',
        end: '13:00',
      });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should return a single rule', async () => {
    const rule = Rule.create<Rule>({
      type: RuleType.DAILY,
      start: '12:00',
      end: '13:00',
    });

    const response = await request(app)
      .get(`/api/v1/rules/${rule.id}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toEqual(rule.type);
  });
});
