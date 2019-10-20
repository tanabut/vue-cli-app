<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img alt="Vue logo" src="../assets/logo.png" style="width:40px;" />
      </router-link>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">CV</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'seqnum'}">Ex1.SequenceNumber</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'searchplace'}">Ex2.Search Place API</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'linemessaging'}">Ex3.Line Messaging</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>
