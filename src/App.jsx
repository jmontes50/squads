import { useRef } from "react";
import {
  textToArrayStudents,
  findRepeatedStudent,
  buildGroups,
  buildRooms,
} from "./lib/utils";

export default function App() {
  const refTextArea = useRef();
  const handleClick = () => {
    const text = refTextArea.current.value;
    const students = textToArrayStudents(text);
    const studentsCleaned = findRepeatedStudent(students);
    const groups = buildGroups(studentsCleaned);
    const rooms = buildRooms(Object.values(groups));
  };

  return (
    <div>
      <textarea ref={refTextArea}></textarea>

      <button onClick={handleClick}>Crear grupos</button>
    </div>
  );
}
