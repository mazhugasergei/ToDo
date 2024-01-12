import mongoose, { Schema, model } from "mongoose"

const TaskSchema = new Schema(
	{
		body: String,
		complete: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

delete mongoose.models["task"]
export default model("task", TaskSchema)
