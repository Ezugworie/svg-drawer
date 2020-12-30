import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const app = createApp(App)

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  // uri: 'http://localhost:3020/graphql',
  uri: 'https://graphqlzero.almansi.me/api',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

app.use(router)
// app.use(VueApollo)
app.use(apolloProvider)

app.mount('#app')
