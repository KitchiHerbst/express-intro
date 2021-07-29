const Joi = require("joi");
const { json } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: "bingo" },
  { id: 2, name: "bongo" },
  { id: 3, name: "bango" },
];

app.get("/", (req, res) => {
  res.send("Yummy bingo");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((obj) => obj.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`Course with the id of ${req.params.id} does not exist`);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body.name);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((obj) => obj.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(`Course with the id of ${req.params.id} does not exist`);
  }

  const { error } = validateCourse(req.body.name);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //update course name
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((obj) => obj.id === parseInt(req.params.id));
  if (!course) {
    return res
      .status(404)
      .send(`Course with the id of ${req.params.id} does not exist`);
      
  }
  courses = courses.filter((c) => c.id !== course.id);
  res.send(courses)

//   const index = courses.indexOf(course)
//   courses.splice(index, 1)
//   res.send(courses)
});

//Environment variable PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Yummy ${port}`);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ name: course });
};
