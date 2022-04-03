const { Schema, model } = require("mongoose");

const dbSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			max: 256,
			min: 3,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			max: 30,
			min: 3,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			max: 255,
			min: 3,
		},
		phone: {
			type: String,
			trim: true,
			max: 20,
			min: 6,
		},
		photoURL: {
			type: String,
			default: "",
		},
		gravatar: {
			type: String,
			default: "",
		},
		provider: {
			type: String,
			default: "local",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isLock: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

exports.User = model("User", dbSchema);
