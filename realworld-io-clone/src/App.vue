<template>
  <div id="app">
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script lang="ts">
///////TODO/////////
//✅ Update Login Authentication
//✅ Sign in basic error handling
//✅ Logout Method
//   View - Article.vue/readmore
//✅ GET User Articles - load only once
//✅ GET Favorited Articles - load only once
//✅ Profile - Show/Hide Favorite or User Artilces
//✅ Follow User - POST /api/profiles/:username/follow
//✅ DELETE /api/profiles/:username/follow 

//✅ Home - Show/Hide User Feed/Global Feed - GET /api/articles/feed - auth required use jwt 
//POST Create Article - POST /api/articles - 
//POST Update Article if User - JWT Token set in users module login()
//Editor prefill info with article info, Redirect from /editor/articlename to /article/articlename
//POST Add comment to an article - POST /api/articles/:slug/comments
//DELETE Comment from article if  user
//DELETE - Article if User 

//POST for signup - create new user
//POST Create New Article

//Protected Routes for settings
//Pagination for fetched articles list - maybe infinite scroll instead
//Global Feed is complete - Need to add filtered feeds - author(my articles), favorited, tag, limit
//Favorite button - Article: increase favoritesCount - favorited true 

//Extra
//Add Tags list to article
//Popular Tags Sidebar - GET /api/tags - sort from highest to lowest - limit to first 5 - Route-link to global-articles-feed with filter of tagname
import {Vue, Component} from 'vue-property-decorator'
import AppFooter from '@/components/AppFooter.vue'
import AppNavbar from '@/components/AppNavbar.vue'

@Component({
  components: {
    AppFooter,
    AppNavbar
  }
})
export default class App extends Vue{
  
}
</script>
<style>

</style>
