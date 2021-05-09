const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-origin requests
app.use(cors());

// connect to db
mongoose.connect(
    'mongodb+srv://benlee88:Benlee1988&3@cluster0.nvv1q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
);

mongoose.connection
    .once('open', () => {
        console.log('Connected to library database');
    })
    .on('error', (error) => {
        console.log(error.message);
    });

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(5000, () => {
    console.log('Server is running...');
});
