import mongoose from "mongoose";
import { HttpError } from "../helpers/index.js";

function isValidId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    next(HttpError(404, `"${id}" is not valid id format.`));
  }
  next();
}

export default isValidId;
