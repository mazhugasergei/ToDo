import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { addTask } from "./controllers/addTask.js"
import { getTasks } from "./controllers/getTasks.js"
import { completeTask } from "./controllers/completeTask.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", getTasks)
app.post("/", addTask)
app.put("/", completeTask)

mongoose.connect("mongodb://localhost:27017/TODO").then(() => {
	app.listen(3001, () => {
		console.log("listening on 3001")
	})
})
