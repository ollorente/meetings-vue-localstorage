const db = {
  meetings: {},
  meetingTasks: {},
  meetingPeople: {},
  progress: {},
  projects: {},
  projectMeetings: {},
  projectPeople: {},
  projectTasks: {},
  people: {
    1616200580423: {
      id: 1616200580423,
      name: 'Oscar Antonio Llorente Quijano',
      email: 'oscar.llorente@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'Diseñador Digital y Multimedia',
      isActive: true,
      isLock: false,
      createdAt: 1616200580423,
      updatedAt: 1616200580423
    },
    1616201159389: {
      id: 1616201159389,
      name: 'Yina Marcela Romero Suancha',
      email: 'marcela.romero@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'Comunicadora',
      isActive: true,
      isLock: false,
      createdAt: 1616201159389,
      updatedAt: 1616201159389
    },
    1616201241289: {
      id: 1616201241289,
      name: 'Laura Andrea Niño Silva',
      email: 'landreanino@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'Líder SIETIC',
      isActive: true,
      isLock: false,
      createdAt: 1616201241289,
      updatedAt: 1616201241289
    },
    1616201314504: {
      id: 1616201314504,
      name: 'John Edisson Arévalo Zorro',
      email: 'johnarevalo@unicolmayor.edu.co',
      role: 'Diseñador Web',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      isActive: true,
      isLock: false,
      createdAt: 1616201314504,
      updatedAt: 1616201314504
    },
    1616201396852: {
      id: 1616201396852,
      name: 'Eder Guiovanny Ramírez Cely',
      email: 'eder.ramirez@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'Administrador Plataforma Moodle',
      isActive: true,
      isLock: false,
      createdAt: 1616201396852,
      updatedAt: 1616201396852
    },
    1616201472505: {
      id: 1616201472505,
      name: 'Cindy Johanna Cuellar Torres',
      email: 'cindy.cuellar@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'Diseñadora',
      isActive: true,
      isLock: false,
      createdAt: 1616201472505,
      updatedAt: 1616201472505
    },
    1616207411954: {
      id: 1616207411954,
      name: 'Jenny Patricia Ortiz Quevedo',
      email: 'jpatriciaortiz@unicolmayor.edu.co',
      photoURL: '',
      role: 'Docente',
      isActive: true,
      isLock: false,
      createdAt: 1616207411954,
      updatedAt: 1616214344766
    },
    1616207539980: {
      id: 1616207539980,
      name: 'Adalver Rivas Gómez',
      email: 'arivas@unicolmayor.edu.co',
      photoURL: '',
      role: 'Docente',
      isActive: true,
      isLock: false,
      createdAt: 1616207539980,
      updatedAt: 1616207539980
    },
    1616207606127: {
      id: 1616207606127,
      name: 'Luz Gabriela Montes García',
      email: 'lgmontes@unicolmayor.edu.co',
      photoURL: '',
      role: 'Estudiante',
      isActive: true,
      isLock: false,
      createdAt: 1616207606127,
      updatedAt: 1616207606127
    },
    1616207652328: {
      id: 1616207652328,
      name: 'Jenny Paola Moncada Diaz',
      email: 'jpmoncada@unicolmayor.edu.co',
      photoURL: '',
      role: 'Estudiante',
      isActive: true,
      isLock: false,
      createdAt: 1616207652328,
      updatedAt: 1616207652328
    },
    1616207700531: {
      id: 1616207700531,
      name: 'Susan Lorena Castro Molina',
      email: 'slcastro@unicolmayor.edu.co',
      photoURL: '',
      role: 'Docente',
      isActive: true,
      isLock: false,
      createdAt: 1616207700531,
      updatedAt: 1616207700531
    },
    1616207823494: {
      id: 1616207823494,
      name: 'Sistema de Innovación Educativa apoyada en TIC',
      email: 'sietic@unicolmayor.edu.co',
      photoURL: 'https://lh3.googleusercontent.com/-6kVDwNiAbNg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucleWBpJpWEjQVKFxjyr1Bg0XDPn1g/s128-c/photo.jpg',
      role: 'SIETIC',
      isActive: true,
      isLock: false,
      createdAt: 1616207823494,
      updatedAt: 1616219574119
    },
    1616266430189: {
      id: 1616266430189,
      name: 'Miguel Ángel Valencia Vega',
      email: 'mavalencia@unicolmayor.edu.co',
      photoURL: '',
      role: 'Docente',
      isActive: true,
      isLock: false,
      createdAt: 1616266430189,
      updatedAt: 1616266430189
    }
  },
  peopleMeetings: {},
  peopleProjects: {},
  peopleTasks: {},
  taskPeople: {},
  tasks: {}
}

module.exports = db
