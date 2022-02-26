process.on('exit', () => {
    // eslint-disable-next-line no-console
    console.log('Shutting Shutdown');
});

process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.error('Unhandled rejection in process occurred');
    // eslint-disable-next-line no-console
    console.error(err);
});

process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    console.error('Uncaught exception in process occurred');
    // eslint-disable-next-line no-console
    console.error(err);
});

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'express' or its corresponding ... Remove this comment to see the full error message
import express from 'express'
const app = express();
import path from 'path'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'body... Remove this comment to see the full error message
import bodyParser from 'body-parser'
import http from 'http'

const { NODE_ENV } = process.env;

if (NODE_ENV === 'local' || NODE_ENV === 'development')
    require('custom-env').env(process.env.NODE_ENV);

// @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
global.httpServerResponse = {
    statusCode: 200,
    responseType: { values: ['json', 'html'], currentType: 'json' },
    responseTime: 0,
    header: {},
    body: { status: 'ok' },
};

app.use('*', function(req: $TSFixMe, res: $TSFixMe, next: $TSFixMe) {
    if (process.env && process.env.PRODUCTION) {
        res.set('Cache-Control', 'public, max-age=86400');
    } else res.set('Cache-Control', 'no-cache');
    return next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./backend/api/settings'));

app.get('/status', function(req: $TSFixMe, res: $TSFixMe) {
    res.setHeader('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            status: 200,
            message: 'Service Status - OK',
            serviceType: 'oneuptime-http-test-server',
        })
    );
});

app.get('/', function(req: $TSFixMe, res: $TSFixMe) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
    if (http.STATUS_CODES[global.httpServerResponse.statusCode]) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
        res.status(global.httpServerResponse.statusCode);
    } else {
        res.status(422);
    }
    setTimeout(function() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
        if (global.httpServerResponse.responseType.currentType === 'html') {
            res.setHeader('Content-Type', 'text/html');
            try {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
                const header = JSON.parse(global.httpServerResponse.header);
                if (typeof header === 'object') {
                    for (const key in header) {
                        res.setHeader(String(key), String(header[key]));
                    }
                }
            } catch (e) {
                //
            }
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
            return res.send(global.httpServerResponse.body);
        } else {
            res.setHeader('Content-Type', 'application/json');
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
            return res.send(global.httpServerResponse.body);
        }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'httpServerResponse' does not exist on ty... Remove this comment to see the full error message
    }, global.httpServerResponse.responseTime);
});

const hook = {};

app.post('/api/webhooks/:id', function(req: $TSFixMe, res: $TSFixMe) {
    const { id } = req.params;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    hook[id] = req.body;
    return res.status(200).json(req.body);
});

app.get('/api/webhooks/:id', function(req: $TSFixMe, res: $TSFixMe) {
    const { id } = req.params;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (hook[id] === undefined) return res.status(404).json({});
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return res.status(200).json(hook[id]);
});

app.use('/*', function(req: $TSFixMe, res: $TSFixMe) {
    res.status(404).render('notFound.ejs', {});
});

app.set('port', process.env.PORT || 3010);

app.listen(app.get('port'), function() {
    //eslint-disable-next-line
    console.log('Server running on port : ' + app.get('port'));
});
