// src/validations/studentsValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.base": "Title must be a string",
      "string.min": "Title should have at least {#limit} characters",
      "string.max": "Title should have at most {#limit} characters",
      "any.required": "Title is required",
    }),
    content: Joi.string().allow("").messages({
      "string.base": "Content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).default("Todo").messages({
      "any.only": `Tag must be one of: ${TAGS.join(", ")}`,
    }),
  }),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(""),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().allow(""),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const NoteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const getNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};