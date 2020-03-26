import { Router } from 'express';

import OngsController from './app/controllers/OngsController';
import IncidentsController from './app/controllers/IncidentsController';
import ProfilesController from './app/controllers/ProfilesController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.store);

routes.get('/incident', IncidentsController.index);
routes.post('/incident', IncidentsController.store);
routes.delete('/incident/:id', IncidentsController.delete);

routes.get('/profiles', ProfilesController.index);

export default routes;