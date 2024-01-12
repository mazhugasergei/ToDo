"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"

interface Task {
	_id: string
	body: string
	complete: boolean
	createdAt?: Date
}

export default () => {
	const [tasks, setTasks] = useState<Task[]>()
	const [newTask, setNewTask] = useState<string>("")

	useEffect(() => {
		fetch("http://localhost:3001")
			.then((res) => res.json())
			.then(({ tasks }) => setTasks(tasks))
	}, [])

	const onSubmit = async () => {
		const { task } = await fetch("http://localhost:3001", {
			method: "post",
			body: JSON.stringify({ body: newTask }),
			headers: { "Content-Type": "application/json" }
		}).then((res) => res.json())
		typeof tasks === "object" ? setTasks([task, ...tasks]) : setTasks([task])
		setNewTask("")
	}

	const onCheckedChange = async (task: Task) => {
		const { ok } = await fetch("http://localhost:3001", {
			method: "put",
			body: JSON.stringify({ _id: task._id, complete: !task.complete }),
			headers: { "Content-Type": "application/json" }
		})
		return ok && typeof tasks === "object"
			? !task.complete
				? setTasks([...tasks.filter((item) => item._id !== task._id), { ...task, complete: !task.complete }])
				: setTasks([{ ...task, complete: !task.complete }, ...tasks.filter((item) => item._id !== task._id)])
			: setTasks([{ ...task, complete: !task.complete }])
	}

	return (
		<div className="min-h-screen grid place-items-center">
			<div className="min-w-[20rem] space-y-2">
				<div className="grid gap-1">
					{typeof tasks === "object" ? (
						tasks.map((task) => (
							<div className="flex gap-2" key={task._id}>
								<Checkbox checked={task.complete} onCheckedChange={(checked) => onCheckedChange(task)} />
								<Label>
									<div>{task.complete ? <s>{task.body}</s> : task.body}</div>
									<div className="opacity-50 text-xs">
										{new Date(task.createdAt || "").toLocaleDateString("en-US", {
											day: "2-digit",
											month: "short",
											year: "numeric"
										})}
									</div>
								</Label>
							</div>
						))
					) : (
						<Label>Loading...</Label>
					)}
				</div>
				<div className="flex gap-2">
					<Input placeholder="New task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
					<Button onClick={onSubmit}>Create</Button>
				</div>
			</div>
		</div>
	)
}
