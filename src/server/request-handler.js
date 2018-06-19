const url = require('url');

const util = require('./utilities');
const calculateBananaBudget = require('../services/banana-budget-calculator.service');

function handleApiRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    switch (parsedUrl.pathname) {
        case '/api/banana-budget':
            const query = parsedUrl.query;
            validateQuery(query);

            const budget = calculateBananaBudget(query['start-date'], query['days']);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ totalCost: `$${budget}`}));

            break;
        default:
            res.writeHead(404);
            res.end();
    }
}

function validateQuery(query) {
    if (!Object.prototype.hasOwnProperty.call(query, 'start-date') || !util.validateDateString(query['start-date'])) {
        res.writeHead(400);
        res.end('Missing or invalid [start-date]');
    }

    if (!Object.prototype.hasOwnProperty.call(query, 'days')) {
        res.writeHead(400);
        res.end('Missing required paramerter [days]');
    }

    if (query['days'] > 500) {
        res.writeHead(400);
        res.end('Parameter [days] exceeds limit (500)');
    }
}

module.exports = handleApiRequest;