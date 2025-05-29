import Todo from "../models/Todo.js";



//add todo task

export const createTodo = async (req, res) => {
  console.log("inside create todo ");
  const {
    task,
    priority,
    time,
    date,
  } = req.body;
  console.log(task, priority, date, time,);
  const {userid} = req.params
  console.log("user iddd", userid)


  try {
    const toDo = new Todo({
      task,
      priority,
      time,
      date,
      userId:userid
    })
    await toDo.save();
    res.status(200).json("TODO added successfully")
    console.log("ToDo added successfully");
  } catch (error) {
    console.error("Error in creating new Event:", error);
    res.status(500).json({ error: error.message });
  }
};


//display to do

export const fecthToDo = async (req, res) => {
  console.log('inside fetchToDo');
    const {userid} = req.params
  console.log("user iddd", userid)
  try {
    const todos = await Todo.find({userId:userid});
    console.log(todos);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete to do
export const deleteToDo = async (req, res) => {
  console.log("Inside delete ToDo");
  const { id } = req.params;
  try {
    const deletedToDo = await Todo.findByIdAndDelete(id);
    if (!deletedToDo) {return res.status(404).json({ error: "ToDo not found" });}
    res.status(200).json({ message: "ToDo deleted successfully" });
    console.log("ToDo deleted successfully");
  } catch (error) {
    console.error("Error deleting ToDo:", error);
    res.status(500).json({ error: error.message });
  }
};


//update task status
export const updateToDoStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,{ status },{ new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Status updated", updatedTodo });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: error.message });
  }
};


//edit todo task

export const editTodo = async (req, res) => {
  console.log("Inside edit todo");
  const { id, userid } = req.params; // Task ID and user ID
  const { task, priority, time, date, status } = req.body;
  console.log("Edit fields:", { task, priority, time, date, status });
  console.log("Task ID:", id, "User ID:", userid);
  try {
    const updatedToDo = await Todo.findOneAndUpdate(
      { _id: id, userId: userid }, // Ensure only user's own task is updated
      { task, priority, time, date, status },
      { new: true }
    );
    if (!updatedToDo) {
      return res.status(404).json({ message: "ToDo not found or unauthorized" });
    }
    console.log("ToDo updated successfully");
    res.status(200).json({ message: "ToDo updated successfully", updatedToDo });
  } catch (error) {
    console.error("Error updating ToDo:", error);
    res.status(500).json({ error: error.message });
  }
};



