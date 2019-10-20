<template>
  <div id="page-margin">
    <h2>
      Ex2.Please use “Place search|Place API(by Google)” for finding all restaurants in Bangsue
      area and show result by JSON
    </h2>

    <div v-if="loading">
      <div class="spinner-border text-primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <li v-for="restaurant in restaurants">
        <b>{{ restaurant.name }}</b>
        <br />
        {{ restaurant }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      loading: true,
      restaurants: [],
      endpointAPI : "https://assignment-web-api.herokuapp.com/",//"http://localhost:3000/"
    };
  },
  created() {
    this.GetRestaurants();
  },
  methods: {
    GetRestaurants: async function() {
      let response = await fetch(`${this.endpointAPI}SCG` , {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await response.json();
      let data = await result.Data;
      if (data) {
        this.restaurants = data;
        this.loading = false;
        console.log(this.restaurants);
      }
    }
  }
};
</script>