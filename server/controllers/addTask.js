import Task from "../models/Task.js"

export const addTask = async (req, res) => {
	const task = await Task.create({
		body: req.body.body
	})
	res.json({ task })
}
