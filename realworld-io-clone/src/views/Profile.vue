<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
            <div class="row">

                <div v-if="profile" class="col-xs-12 col-md-10 offset-md-1">
                    <img :src="profile.image" class="user-img" />
                    <h4>{{profile.username}}</h4>
                    <p v-if="profile.bio">
                        {{profile.bio}}
                    </p>
                    <button class="btn btn-sm btn-outline-secondary action-btn">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Follow {{profile.username}}
                    </button>
                </div>

            </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                    <li class="nav-item">
                    <a @click.prevent="favorites = !favorites" :class="['nav-link', {'active': !favorites}]">My Articles</a>
                    </li>
                    <li class="nav-item">
                    <a @click.prevent="favoriteArticles()" :class="['nav-link', {'active': favorites}]">Favorited Articles</a>
                    </li>
                </ul>
                </div>

                

                <ArticlePreview v-show="!favorites" v-for="article in feed" :article="article" :key="article.slug" />

                <ArticlePreview v-show="favorites" v-for="article in favoriteFeed" :article="article" :key="article.slug" />
                
            </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator";
import users from '@/store/modules/users'


import articles from '@/store/modules/articles'
import { Article } from "@/store/models"

import ArticlePreview from '@/components/article/ArticlePreview.vue'
@Component({
    components: {
        ArticlePreview
    }
})

export default class Profile extends Vue {
    @Prop({required: true})
    
    username!: string
    favorites = false
    feed: Article[] = []
    favoriteFeed: Article[] = []

    get profile(){
        return users.profile
    }

    favoriteArticles(){
        if(!this.favoriteFeed[0]) articles.refreshGlobalFeed({feedType: 'favorite', username: this.username}).then(() => this.favoriteFeed = articles.feed)
        this.favorites = !this.favorites
    }

    created(){
        users.loadProfile(this.username)
        articles.refreshGlobalFeed({feedType: 'user', username: this.username})
        .then(() => this.feed = articles.feed)
    }

}
</script>