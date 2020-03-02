import { Router } from 'express';
import RulesController from './controllers/RulesController';
import SchedulesController from './controllers/SchedulesController';

const routes = Router();

routes.get('/rules', RulesController.index);
routes.get('/rules/:id', RulesController.show);
routes.post('/rules', RulesController.store);
routes.delete('/rules/:id', RulesController.destroy);

routes.get('/schedules', SchedulesController.index);

export default routes;
