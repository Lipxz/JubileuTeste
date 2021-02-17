<template>
  <div class="main">
    <div class="choose-plan">
      <select name="plan-selection" class="plan-selection" v-model='plan'>
        <option value="FaleMais 30">FaleMais 30</option>
        <option value="FaleMais 60">FaleMais 60</option>
        <option value="FaleMais 120">FaleMais 120</option>
        <option value="WithoutFaleMais">Sem FaleMais</option>
      </select>
    </div>

    <div class="origin-destination-minutes">
      <table>
        <th id="minutes">
          <input type="text" v-model='minutes'>
          <label for="">Minutos</label>
        </th>
        <th id="origin">
          <input type="text" v-model='origin'>
          <label for="">Origem</label>
        </th>
        <th id="destination">
          <input type="text" v-model='destination'>
          <label for="">Destino</label>
        </th>
      </table>
    </div>

    <div class="calculate">
      <button v-on:click="calculate">Calcular o preco</button>
    </div>

    <div class="price-result" >
      <label for="" v-bind="price"> Price: {{ String(price) }}</label>
    </div>
  </div>
</template>

<script>
  import apiConnection from '../apiConnection.js';

  export default {
    name: 'PlansComponent',

    async data() {
      return {
        plan: '',
        minutes: 0,
        origin: '',
        destination: '',
        price: 0  
      }
    },

    methods: {

      async calculate() {
        console.log(`${this.plan} ${this.minutes} ${this.origin} ${this.destination}`);

        let price;

        const minutes = this.minutes;
        const origin = this.origin;
        const destination = this.destination;
        const plan = this.plan;

        if (this.plan === 'WithoutFaleMais') {
          await apiConnection.calculatePriceWithoutPlan(minutes, origin, destination).then(response => {
            const data = response.data;
            price = data.calculatedPrice;

            console.log(`Data: ${data}`);
          });
        } else {
          await apiConnection.calculatePriceWithPlan(plan, minutes, origin, destination).then(response => {
            const data = response.data;
            price = data.calculatedPrice;

            console.log(`Data: ${data}`);
          });
        }
        
        this.price = price;
        console.log(this.price)

        return price;
      }

    }

  }
</script>

<style scoped>
.origin-destination-minutes table {
  margin: 0 auto;
} 
</style>
