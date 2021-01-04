import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { Article } from '../models'
import * as api from '@/store/api'
//Filter by author - ?author=jake
//filter by favorited - ?favorited=jake
//Filter by tag - ?tag=AngularJS
//limit articles - ?limit=20
//offset articles - ?offset=0

type FeedType = 'global' | 'user' | 'favorite'

interface TypeFeed {
    feedType: FeedType;
    username?: string;
}


@Module({
    dynamic: true,
    namespaced: true,
    name: 'articles',
    store
})

class ArticlesModule extends VuexModule {
    //state
    feed: Article[] = []
    

    //context.commit('mutation', 'return val as payload')
    @Action({commit: 'setFeed'})
    async refreshGlobalFeed( {feedType, username}: TypeFeed) {
        console.log('feedtype: ', feedType, 'username: ', username)
        const globalFeed = await api.getGlobalFeed(feedType, username)
        return globalFeed.articles
    }

    @Mutation
    setFeed(articles: Article[]){
        this.feed = articles
    }
}

//modules are exported using getModule(module class name)
export default getModule(ArticlesModule)