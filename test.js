import { describe, it } from "mocha"
import { expect } from "chai"

describe("Tasks test", () => {
	describe("Get tasks", () => {
		it("Should be able to create a task", async () => {
			const { task } = await fetch("http://localhost:3001", {
				method: "post",
				body: JSON.stringify({ body: "test task" }),
				headers: { "Content-Type": "application/json" }
			}).then((res) => res.json())
			expect(task).to.have.a.property("_id")
		})

		it("Should be able to complete a task", async () => {
			// create a task and get its _id
			const { task } = await fetch("http://localhost:3001", {
				method: "post",
				body: JSON.stringify({ body: "completed task" }),
				headers: { "Content-Type": "application/json" }
			}).then((res) => res.json())
			// complete the task
			await fetch("http://localhost:3001", {
				method: "put",
				body: JSON.stringify({ _id: task._id, complete: true }),
				headers: { "Content-Type": "application/json" }
			}).then((res) => res.json())
			// fetch the task again and check if `completed` is true
			const { tasks } = await fetch("http://localhost:3001").then((res) => res.json())
			const { complete } = tasks.find((item) => item._id === task._id)
			expect(complete).to.be.true
		})

		it("Should get tasks", async () => {
			const { tasks } = await fetch("http://localhost:3001").then((res) => res.json())
			expect(tasks).to.be.an("array")
			expect(tasks).to.have.lengthOf.at.least(2)
		})
	})
})
