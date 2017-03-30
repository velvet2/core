import { version } from '../../package.json';
import { Router } from 'express';
import './rooms';
import './users';
import '../middleware/authentication';

import { App } from './app';

export default () => {

	App.get('/', (req, res) => {
		res.json({ version });
	});

	return App;
}
