require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const serverless = require("serverless-http");
const { error404, errorHandler } = require("../middlewares");

const app = express();
require("../db");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router
	.route("/")
	.post(async (req, res, next) => {
		res.status(200).json({
			error: false,
			data: "post",
		});
	})
	.get(async (req, res, next) => {
		res.status(200).json({
			error: false,
			data: "get",
		});
	});

router
	.route("/:id")
	.get(async (req, res, next) => {
		res.status(200).json({
			error: false,
			data: "get " + id,
		});
	})
	.put(async (req, res, next) => {
		res.status(200).json({
			error: false,
			data: "put " + id,
		});
	})
	.delete(async (req, res, next) => {
		res.status(200).json({
			error: false,
			data: "delete " + id,
		});
	});

app.use("/.netlify/functions/app/users", router);

app.use(history());

// catch 404 and forward to error handler
app.use(error404);
// error handler
app.use(errorHandler);

module.exports.handler = serverless(app);
