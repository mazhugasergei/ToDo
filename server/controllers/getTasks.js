import Task from "../models/Task.js"

export const getTasks = async (req, res) => {
	const tasks_1 = await Task.find({ complete: false }).sort({ updatedAt: -1 })
	const tasks_2 = await Task.find({ complete: true }).sort({ updatedAt: 1 })
	res.json({ tasks: tasks_1.concat(tasks_2) })
}
