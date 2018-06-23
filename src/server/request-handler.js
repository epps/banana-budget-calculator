const url = require('url');

const util = require('./utilities');
const BananaBudgetService = require('../services/banana-budget.service');

function handleApiRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);

    switch (parsedUrl.pathname) {
        case '/api/banana-budget':
            const query = parsedUrl.query;

            if (validateQuery(res, query)) {
                const bananaBudgetService = new BananaBudgetService(query['start-date']);
                const budget = bananaBudgetService.getBudgetForDays(query['days']);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ totalCost: budget }));
            } 

            break;
        default:
            res.writeHead(404);
            res.end();
    }
}

function validateQuery(res, query) {
    let isInvalidQuery = false;
    let errorMessage = '';

    switch(true) {
        case !Object.prototype.hasOwnProperty.call(query, 'start-date') && !Object.prototype.hasOwnProperty.call(query, 'days'):
            isInvalidQuery = true;
            errorMessage = 'Missing or params [start-date, days]';
            break;
        case !Object.prototype.hasOwnProperty.call(query, 'start-date') || !util.validateDateString(query['start-date']):
            isInvalidQuery = true;
            errorMessage = 'Missing or invalid [start-date]';
            break;
        case !Object.prototype.hasOwnProperty.call(query, 'days'):
            isInvalidQuery = true;
            errorMessage = 'Missing required parameter [days]';
            break;
        case query['days'] > 500:
            isInvalidQuery = true;
            errorMessage = 'Parameter [days] exceeds limit (500)';
            break;
    }

    if (isInvalidQuery){
        res.writeHead(400);
        res.end(errorMessage);
        return false;
    } else {
        return true;
    }
}

module.exports = handleApiRequest;