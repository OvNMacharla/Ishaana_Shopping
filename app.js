const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyPraser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const graphQLSchema = require('./graphql/schema/index')
const graphQLResolver = require('./graphql/resolver/index')
const isAuth = require('./middleware/is-auth')
const app = express();
app.use(bodyPraser.json());

app.use(cors());
app.use(isAuth);
app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.USER}:EvxDF80V4FszfWoN@cluster0.arzsg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
    app.listen(8000);
}).catch(err => {
    console.log(err);
}
)