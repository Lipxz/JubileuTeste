const { Router, response } = require('express');

const plans = require('../models/plans.json');
const originsAndDestinations = require('../models/origins-destinations.json');

const router = Router();
const apiUrl = '/api';

function getChargePerMinute(origin, destination) {
    const originDestination = `${origin}-${destination}`;
    
    if (!originsAndDestinations[originDestination]) return undefined;

    return originsAndDestinations[originDestination];
}

function getMaxNonChargeTime(plan) {
    return plans[plan];
}

router.get(`${apiUrl}/plans`, () => {
    response.send(plans);
});

router.get(`${apiUrl}/origins-destinations`, () => {
    response.send(originsAndDestinations);    
});

router.post(`${apiUrl}/calculate-price-with-plan`, (request, response) => {
    const body = request.body;
    
    //
    //  Request body
    //      plan: 'FaleMais 30'
    //      minutes: '90'
    //      origin: '011'
    //      destination: '018'
    //

    let price;

    const origin = body.origin;
    const destination = body.destination;

    const plan = body.plan;
    const minutes = body.minutes;

    const chargePerMinute = getChargePerMinute(origin, destination);
    const maxNonChargePlanTime = getMaxNonChargeTime(plan);

    const exceededMinutes = minutes - maxNonChargePlanTime;

    console.log(body);

    if (exceededMinutes < 0 || exceededMinutes === 0) {
        price = 0;
    } else {
        price = exceededMinutes * chargePerMinute;
    } 
    
    console.log(`${exceededMinutes} ${price} Minutes: ${minutes}`);
    console.log('JORGE PORRA')

    return response.send({ calculatedPrice: price });
});

router.post(`${apiUrl}/calculate-price-without-plan`, (request, response) => {
    const body = request.body;

    //
    //  Request body
    //      minutes: '90'
    //      origin: '011'
    //      destination: '018'
    //

    const origin = body.origin;
    const destination = body.destination;
    
    const minutes = body.minutes;

    const chargePerMinute = getChargePerMinute(origin, destination);
    
    let price = chargePerMinute * minutes;

    console.log(price);
    console.log('JORGE PORRA')

    console.log(`${chargePerMinute} ${price} Minutes: ${minutes}`);

    return response.send({ calculatedPrice: price });
});

module.exports = router;