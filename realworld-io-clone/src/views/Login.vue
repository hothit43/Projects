<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign In</h1>
                <p class="text-xs-center">
                <router-link to="/register">
                    Need an account?
                </router-link>
                </p>

                <ul v-if="loginError" class="error-messages">
                <li>{{loginError}}</li>
                </ul>

                <form @submit.prevent="login()">
                <fieldset class="form-group">
                    <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                    <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                    Log In
                </button>
                </form>
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import users from '@/store/modules/users'
@Component
export default class Login extends Vue {
    email = ''
    password = ''

    get isAuthenticated(){
        return users.isAuthenticated
    }

    get loginError(){
        return users.errors
    }

    async login(){
        await users.login({email: this.email, password: this.password})
        return !this.isAuthenticated || this.$router.push({name: "Home"})
    }
}
</script>