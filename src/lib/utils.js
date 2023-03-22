const textToArrayStudents = (text) => {
  const splitData = text.split(/\r\n|\r|\n/);
  const studentsWithGroup = splitData.map((item) => {
    return { name: item.split(/\t/)[0], group: item.split(/\t/)[1] };
  });
  return studentsWithGroup;
};

const findRepeatedStudent = (students) => {
  //Esta invertido porque se asume que de encontrar una estudiante repetida su último registro es el correcto
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

const findLeastPopulatedRoom = (rooms) => {
  const lowestIndex = rooms.reduce((lowest, current, index) => {
    if (current.students.length < rooms[lowest].students.length) {
      return index;
    } else {
      return lowest;
    }
  }, 0);
  return lowestIndex;
};

const buildRooms = (groups) => {
  const numRooms = 4;

  const sortedGroups = [...groups].sort(
    (a, b) => a.students.length - b.students.length
  );

  const rooms = [];

  for (let i = 1; i <= numRooms; i++) {
    let room = { room: `Demo ${i}`, students: [] };
    rooms.push(room);
  }

  for (let i = 0; i < sortedGroups.length; i++) {
    let index = findLeastPopulatedRoom(rooms);
    rooms[index].students = [
      ...rooms[index].students,
      ...sortedGroups[i].students,
    ];
  }

  console.log({ rooms });

  return rooms;
};

export { textToArrayStudents, findRepeatedStudent, buildGroups, buildRooms };
