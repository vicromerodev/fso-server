const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Person;

// const person = new Person({
//   name: "Vic Romero",
//   number: 600111222,
// });

// person
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => console.log(err));
