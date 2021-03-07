const mongoose = require("mongoose");

const connectionString = process.env.MONGO_DB_URI;

//conexion a mongodb
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Person.find({}).then((res) => {
//   console.log(res);
//   mongoose.connection.close();
// });
