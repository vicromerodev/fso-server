const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status - :response-time ms :body"));

const generateId = () => {
  const id = Math.round(Math.random() * 10000);
  return id;
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

const info = () => {
  return `<p>PhoneBook has info for ${persons.length} people</p>
          <p>${new Date()}</p>`;
};

app.get("/info", (req, res) => {
  res.send(info());
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const isRepeated = persons.filter((p) => p.name === body.name).length > 0;

  if (!body.name || !body.number)
    return res.status(400).json({ error: "content missing" });

  if (isRepeated) return res.status(400).json({ error: "name must be unique" });

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
