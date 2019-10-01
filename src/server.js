import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import { json } from 'body-parser';
import * as sapper from '@sapper/server';
import useragent from 'useragent';

import contentful from './clients/contentful'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const content = locale => async (req, res, next) => {
	req.locale = locale
	req.navigation = await Promise.all([
		contentful.getEntries({ content_type: 'header', locale, include: 3 }),
  	contentful.getEntries({ content_type: 'footer', locale, include: 3 })
	]).then(async ([headers, footers])=> {
		return {
			header: headers.items[0],
			footer: footers.items[0]
		}
	})

	next()
}

const ua = (req, res, next) => {
	req.ua = useragent.is(req.headers['user-agent'])
	req.isMobile = req.ua.mobile_safari || req.ua.android
	next()
}

polka()
	.use(
		'/fr-CA',
		ua,
		content('fr-CA'),
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile
				}
			}
		})
	)
	.use(
		ua,
		content('en-US'),
		json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
