import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.once('connected', () => {
            console.log("Connected to MongoDB");
        })

        connection.on('error', (err) => {

            console.log('Error in connecting to MongoDB: ' + err);
            process.exit();

        })



    } catch (error) {

        console.log('error: ' + error)


    }

}