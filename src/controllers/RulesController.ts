import { Request, Response } from 'express';

import { Rule } from '../models/Rule';

class RulesController {
  public index(req: Request, res: Response): any {
    const { start, end } = req.query;

    if (start && end) {
      const rules = Rule.findByPeriod(start, end);

      return res.json(rules);
    }

    const rules = Rule.findAll();

    return res.json(rules);
  }

  public store(req: Request, res: Response): any {
    const data = req.body;

    const rule = Rule.create(data);

    return res.json(rule);
  }

  public show(req: Request, res: Response): any {
    const { id } = req.params;

    const rule = Rule.findById(id);

    if (rule) {
      res.send(rule);
    } else {
      res.status(404).json();
    }
  }

  public destroy(req: Request, res: Response): any {
    const { id } = req.params;

    const regra = Rule.deleteById(id);

    if (regra) {
      res.status(204).json();
    } else {
      res.status(404).json();
    }
  }
}

export default new RulesController();
