import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import gql from 'graphql-tag'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

new Vue ({
    el: '#app',
    apolloProvider,
    data: {
        msg: 123,
        ranks: []
    },
    apollo: { // apollo
        ranks: gql`query{
            ranks {
                nickname
            }
        }`
    },
    methods: {
        getApolloList () {
            // this.$apollo
        },
        addUser () {
            var user = {
                id: Math.random() * 100000 >> 0,
                nickname: Array(((Math.random()*10) >> 0) + 5).fill(0).map(i => ('abcdefghijklmnopqrstuvwxyz'[Math.random()*25 >> 0])).join(''),
                headPic: "headPicUrl_" + ((Math.random() * 1000) >> 0)
            }
            this.$apollo.mutate({
                mutation: gql`mutation addUser ($user: inputUser) {
                    addUser (user: $user) {
                        id,
                        success
                    }
                }`,
                variables: {
                    user: user
                },
                update (proxy, mutationResult) {
                    const query = gql`query{
                        ranks {
                            nickname
                        }
                    }`
                    const data = proxy.readQuery({
                        query
                    })
                    data.ranks.push(user)
                    proxy.writeQuery({
                        query,
                        data
                    })
                }
            }).then(res => {
                let id = res.data.addUser.id
                let ok = res.data.addUser.success
            }).catch(err => {
                console.log(err)
            })
        }
    }
})

// if (module.hot) {
//     module.hot.dispose(() => {
//         console.log('[module hot dispose]')
//     })

//     module.hot.accept(() => {
//         console.log('[module hot accept]')
//     })
// }