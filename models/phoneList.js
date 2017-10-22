const express = require("express");
const mongoose = require("mongoose");
const db = require("../config/database");
let Schema = mongoose.Schema;

let PhoneSchema = new Schema(
  {
    phone: {
      type: String,
      required: true
    },
    classIDs: {
      type: [String],
      required: true
    }
  },
  {
    collection: "kmpPhoneList"
  }
);

const Phone = module.exports = mongoose.model("Phone", PhoneSchema);
