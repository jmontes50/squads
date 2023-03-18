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
    // console.log(groups);
    console.log(Object.values(groups));
    const rooms = buildRooms(Object.values(groups));
    console.log(rooms);
  };

  return (
    <div>
      <textarea ref={refTextArea}></textarea>

      <button onClick={handleClick}>Crear grupos</button>
    </div>
  );
}
