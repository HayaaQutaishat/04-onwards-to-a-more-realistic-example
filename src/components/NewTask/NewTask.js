import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const applyData = (task) => {
      const generatedId = task.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };

    sendTaskRequest(
      {
        url: "https://react-http-489ae-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: { "Content-Type": "application/json" },
      },
      applyData
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
