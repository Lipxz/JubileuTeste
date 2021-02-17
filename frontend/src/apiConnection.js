const axios = require('axios');
const apiUrl = 'http://localhost:3000/api';

export default {
    //
    //  Request body
    //      plan: 'FaleMais 30'
    //      minutes: '90'
    //      origin: '011'
    //      destination: '018'
    //
    async calculatePriceWithPlan(plan, minutes, origin, destination) {
        return await axios.post(`${apiUrl}/calculate-price-with-plan`, {
            plan: plan,
            minutes: minutes,
            origin: origin,
            destination                
        });
    },

    async calculatePriceWithoutPlan(minutes, origin, destination) {
        return await axios.post(`${apiUrl}/calculate-price-without-plan`, {
            minutes: minutes,
            origin: origin,
            destination                
        });
    }
};