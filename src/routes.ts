import { Router } from 'express';
import RulesController from './controllers/RulesController';

const routes = Router();

routes.get('/rules', RulesController.index);
routes.get('/rules/:id', RulesController.show);
routes.post('/rules', RulesController.store);
routes.delete('/rules/:id', RulesController.destroy);

export default routes;
