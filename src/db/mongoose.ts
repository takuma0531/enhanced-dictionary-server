import { connect } from "mongoose";
import { DbConstants } from "../config/constants";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    await connect(DbConstants.DB_CONNECTION_STRING, connectOptions);
    console.log("db connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB };
