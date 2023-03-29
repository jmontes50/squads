import { useRef , Fragment } from "react";

export default function TableResult({ rooms }) {
  const tableRef = useRef();

  const handleClick = async () => {
    const table = tableRef.current;
    try {
      await navigator.clipboard.writeText(table.innerText);
    } catch (err) {
      console.error("Error al copiar al portapapeles: ", err);
    }
  };

  if (rooms.length === 0) {
    return <p>Aquí se mostrarán tus resultados</p>;
  }

  return (
    <div className="result">
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Sala</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map(({ room, students }, i) => (
                <Fragment key={i}>
                  {students.length &&
                    students.map((student, j) => (
                      <tr key={j}>
                        <td>{student}</td>
                        {j === 0 ? (
                          <td rowSpan={students.length}>{room}</td>
                        ) : null}
                      </tr>
                    ))}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <button className="btn-secondary" onClick={handleClick}>
        Copiar al portapapeles
      </button>
    </div>
  );
}
