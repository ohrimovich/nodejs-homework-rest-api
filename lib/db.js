import pkg from 'mongoose';
const {connect, connection} = pkg

const uri = process.env.URI_DB

const db = connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection.on('connected', () => {
    console.log('Mongoose conected to DB');
})
connection.on('err', (err) => {
    console.log(`Mongoose conection error: ${err.message}`);
})

connection.on('disconnected', () => {
    console.log('Mongoose disconected from DB');
})

process.on('SIGINT', async () => {
   
    connection.close()
    console.log('Connection DB closed');
    process.exit(1)
    
})

export default db;