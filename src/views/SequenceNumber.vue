<template>
  <div id="page-margin">
    <h2>Ex1. X, 5, 9, 15, 23, Y, Z - Please create a new function for finding X, Y, Z value</h2>
    <center>
    <img alt="Vue logo" src="../assets/flowdiagram.png"  />
    </center>
    <div class="row">
      <div class="col-sm-3">
        <b>Forward And Back Propagation: </b>
      </div>
      <div class="col-sm-4">
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', 'X,5,9,15,23,Y,Z')" checked> X, 5, 9, 15, 23, Y, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', 'X,Y,9,15,23,33,Z')"> X, Y, 9, 15, 23, 33, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', 'X,Y,Z,15,23,33,45')"> X, Y, Z, 15, 23, 33, 45<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', '3,5,9,15,X,Y,Z')"> 3, 5, 9, 15, X, Y, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', 'X,3,9,18,30,Y,Z')"> <b>X, 3, 9, 18, 30, Y, Z</b><br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Propagation', 'X,Y,27,40,55,72,Z')"> <b>X, Y, 27, 40, 55, 72, Z</b><br/>
      </div>
      <div class="col-sm-5">
        <img alt="Vue logo" src="../assets/propagation.png"  />
      </div> 
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-3">
        <b>Linear Regression: </b>
      </div>
      <div class="col-sm-4">
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', 'X,5,9,15,23,Y,Z')"> X, 5, 9, 15, 23, Y, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', 'X,Y,9,15,23,33,Z')"> X, Y, 9, 15, 23, 33, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', 'X,Y,Z,15,23,33,45')"> X, Y, Z, 15, 23, 33, 45<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', '3,5,9,15,X,Y,Z')"> 3, 5, 9, 15, X, Y, Z<br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', 'X,5,9,Y,23,33,Z')"> <b>X, 5, 9, Y, 23, 33, Z</b><br/>
        <input type="radio" name="ex1" id="ex1" v-on:change="SetValue('Regression', 'W,5,X,15,Y,33,Z')"> <b>W, 5, X, 15, Y, 33, Z</b><br/>
      </div>
      <div class="col-sm-5">
        <img alt="Vue logo" src="../assets/linearregression.png"  />
      </div> 
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-7">
        <div v-if="loading">
          <button class="btn btn-primary float-right" type="button" disabled>
            Loading...
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>
        </div>
        <div v-else>
          <button v-on:click="GetAnswer()" class="btn btn-primary float-right">Answer</button>
        </div>
        
      </div>
    </div>
    <hr/>

    <div v-if="loading">
      <div class="spinner-border text-primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <b>{{message}}</b>
      <li v-for="variable in variables">
          <b>{{ variable.key }}</b> = <b>{{ variable.value }}</b><br/>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      type: "",
      parameters:[],
      loading: false,
      message: "",
      variables: [],
      endpointAPI : "https://assignment-web-api.herokuapp.com/",//"http://localhost:3000/"
    }
  },
  mounted: function () { 
    //init Parameters
    this.type = "Regression";
    this.parameters = this.StringToArray("X,5,9,15,23,Y,Z");
  },
  methods: {
    GetAnswer: async function() {
      this.loading = true;
      const parameters = "";
      let response = await fetch(`${this.endpointAPI}sequences`,{
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'charset': 'UTF-8'
          },
          body:JSON.stringify({
            'type':this.type,
            'parameters':this.parameters
          })
      });
      let result = await response.json();
      if(result){
        this.message = result.Message;
        this.variables = result.Data.resultvariables;
        this.loading= false;
        console.log(this.message);
      }
    },
    SetValue: function(type, parameters) {
      this.type = type;
      this.parameters = this.StringToArray(parameters);
    },
    StringToArray: function (string) {   
      return string.split(",");
    }
  }
};
</script>