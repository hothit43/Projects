<template>
    <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" :to="{name: 'Home'}">conduit</router-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link class="nav-link active" :to="{name: 'Home'}">Home</router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link class="nav-link" :to="{name: 'editor'}">
              <i class="ion-compose"></i>&nbsp;New Post
            </router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link class="nav-link" :to="{name: 'settings'}">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li v-if="currentUser" class="nav-item">
            <router-link class="nav-link" :to="'/@'+currentUser">
              {{currentUser}}
            </router-link>
          </li>
          <li v-if="!currentUser" class="nav-item">
            <router-link class="nav-link" :to="{name: 'register'}">Sign up</router-link>
          </li>
          <li v-if="!currentUser" class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}">Sign in</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import users from '@/store/modules/users'
@Component
export default class AppNavbar extends Vue {
  
  //computed
  get currentUser(){
    return users.username
  }
}
</script>