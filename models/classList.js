const express = require("express")
const mongoose = require("mongoose")
const db = require("../config/database")
let Schema = mongoose.Schema

let ClassSchema = new Schema(
  {
    classIDs: {
      type: [String],
      required: true
    }
  },
  {
    collection: "kmpClassList"
  }
)

const ClassList = module.exports = mongoose.model("ClassList", ClassSchema)
