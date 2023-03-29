import { useState, useRef } from "react";
import {
  textToArrayStudents,
  findRepeatedStudent,
  buildGroups,
  buildRooms,
} from "./lib/utils";
import TableResult from "./TableResult";

export default function App() {

  const [rooms, setRooms] = useState([])
  const refTextArea = useRef();
  const refQtyRooms = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = refTextArea.current.value;
    const qtyRooms = refQtyRooms.current.value;
    const students = textToArrayStudents(text);
    const studentsCleaned = findRepeatedStudent(students);
    const groups = buildGroups(studentsCleaned);
    const roomsBuilded = buildRooms(groups, qtyRooms);
    setRooms(roomsBuilded)
  };

  return (
    <div className="container">
      <header>
        <h1>👷‍♀️ Rooms Builder!</h1>
      </header>
      <main className="columns">
        <section className="column">
          <form onSubmit={handleSubmit} className="form-students">
            <div className="form-input">
              <label htmlFor="input-quantity">Cantidad de salas:</label>
              <input
                id="input-quantity"
                type="text"
                inputMode="numeric"
                placeholder="Ingrese una cantidad entera de salas del 1 al 9 Ej.: 5"
                ref={refQtyRooms}
                defaultValue="3"
                pattern="[1-9]*"
                autoFocus
              />
            </div>
            <div className="form-input">
              <label htmlFor="textarea-data">Info estudiantes:</label>
              <textarea
                id="textarea-data"
                className="textarea-students"
                ref={refTextArea}
                placeholder="Copia y pega los nombres de las estudiantes con sus respectivos grupos"
              ></textarea>
            </div>
            <button type="submit">Crear grupos</button>
          </form>
        </section>
        <section className="column">
          <TableResult rooms={rooms} />
        </section>
      </main>
    </div>
  );
}
