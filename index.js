require("dotenv").config();
require("./mongo");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");
const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");

const app = express();
app.use(express.json());

app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status - :response-time ms :body"));

const info = () => {
  return `<p>PhoneBook has info for ${persons.length} people</p>
          <p>${new Date()}</p>`;
};

app.get("/info", (req, res) => {
  res.send(info());
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) return res.json(person);
      return res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const isRepeated = persons.filter((p) => p.name === body.name).length > 0;

  if (!body.name || !body.number)
    return res.status(400).json({ error: "content missing" });

  if (isRepeated) return res.status(400).json({ error: "name must be unique" });

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
