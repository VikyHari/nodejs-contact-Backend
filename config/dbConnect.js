const mongo =  require("mongoose")


const connectDb = async () => {
    try {
        const connect = await mongo.connect(process.env.MONGO_URL);
        console.log("DB Connected:" , connect.connection.host);
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;