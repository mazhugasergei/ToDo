import Task from "../models/Task.js"

export const completeTask = async (req, res) => {
	await Task.findByIdAndUpdate(req.body._id, { complete: req.body.complete })
	res.json({ ok: true })
}
