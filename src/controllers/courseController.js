import {Course} from "../models/course.js";
import Joi from "joi";

export const course_index = (req, res) =>
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("courses/index", { courses: result });
    })
    .catch((err) => console.log(err));

export const course_create_get = (req, res) => res.render("courses/create");

export const course_create_post = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newCourse = new Course({
    name: req.body.name,
  });

  newCourse
    .save()
    .then((result) => res.redirect("/courses"))
    .catch((err) => console.log(err));
};

export const course_delete = (req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).send();
    })
    .catch((err) => res.status(500).send());
};