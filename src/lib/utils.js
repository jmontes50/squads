const textToArrayStudents = (text) => {
  const splitData = text.split(/\r\n|\r|\n/);
  const studentsWithGroup = splitData.map((item) => {
    return { name: item.split(/\t/)[0], group: item.split(/\t/)[1] };
  });
  return studentsWithGroup;
};

const findRepeatedStudent = (students) => {
  //Esta invertido porque se asume que de encontrar una estudiante repetida su ultimo registro es el correcto
  const reversedStudents = students.reverse();

  const uniqueStudents = reversedStudents.filter((item, index) => {
    return (
      index ===
      reversedStudents.findIndex((obj) => {
        return obj.name === item.name;
      })
    );
  });
  return uniqueStudents;
};

const buildGroups = (students) => {
  const groups = students.reduce((acc, student) => {
    const { name, group } = student;
    if (!acc[group]) {
      acc[group] = { group, students: [] };
    }
    acc[group].students.push(name);
    return acc;
  }, {});

  return groups;
};

const buildRooms = (groups) => {
  // Número de rooms que quieres crear
  const numRooms = 3;

  // Obtener el número total de estudiantes
  const numStudents = groups.reduce(
    (acc, group) => acc + group.students.length,
    0
  );

  // Calcular el número promedio de estudiantes por room
  const avgStudentsPerRoom = Math.floor(numStudents / numRooms);

  // Ordenar los grupos por cantidad de estudiantes, de menor a mayor
  const sortedGroups = [...groups].sort(
    (a, b) => a.students.length - b.students.length
  );

  // Arreglo de rooms
  const rooms = [];

  // Iterar por cada grupo y asignarlo al room con menos estudiantes
  for (const group of sortedGroups) {
    // Encontrar el room con menos estudiantes
    const leastPopulatedRoom = rooms.reduce(
      (acc, room) => {
        if (room.students.length < acc.students.length) {
          return room;
        }
        return acc;
      },
      { students: [] }
    );

    // Si el room menos poblado tiene menos estudiantes que el promedio, asignar el grupo a ese room
    if (leastPopulatedRoom.students.length < avgStudentsPerRoom) {
      leastPopulatedRoom.students.push(...group.students);
    } else {
      // Si todos los rooms tienen igual o más estudiantes que el promedio, asignar el grupo al room menos poblado
      leastPopulatedRoom.students.push(...group.students);
    }
  }
  return rooms;
};

export { textToArrayStudents, findRepeatedStudent, buildGroups, buildRooms };
