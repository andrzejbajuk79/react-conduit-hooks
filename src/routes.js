import React, {Suspense} from 'react'
import {Switch, Route} from 'react-router-dom'
import asyncComponent from './HOC/asyncComponent'

import GlobalFeed from './pages/globalFeed'
import Article from './pages/article'
import Authentication from './pages/authentication'
import TagFeed from './pages/TagFeed/TagFeed'
import YourFeed from './pages/YourFeed/YourFeed'
import CreateArticle from './pages/CreateArticle/CreateArticle'
import EditArticle from './pages/EditArticle/EditArticle'
import Settings from './pages/Settings/Settings'
import UserProfile from './pages/UserProfile'

let AsyncArticle
//perwszy sposob LAZY COMP poprzez HOC
AsyncArticle = asyncComponent(() => {
 return import('./pages/article')
})
//drugisposob LAZY
AsyncArticle = React.lazy(() => import('./pages/article'))

const Routes = () => {
 return (
  <Switch>
   <Route path="/" component={GlobalFeed} exact />
   <Route path="/profiles/:slug" component={UserProfile} />
   <Route path="/profiles/:slug/favourites" component={UserProfile} />
   <Route path="/settings" component={Settings} exact />
   <Route path="/article/new" component={CreateArticle} />
   <Route path="/article/:slug/edit" component={EditArticle} />
   <Route path="/feed" component={YourFeed} exact />
   <Route path="/tags/:slug" component={TagFeed} exact />

   {/* <Route path="/article/:slug" component={Article} /> */}
   {/* <Route path="/article/:slug" component={asyncArticle} /> */}
   <Route
    path="/article/:slug"
    render={(props) => (
     <Suspense fallback={<div>loading...</div>}>
      <AsyncArticle {...props} />
     </Suspense>
    )}
   />
   <Route path="/login" component={Authentication} />
   <Route path="/register" component={Authentication} />
  </Switch>
 )
}

export default Routes
