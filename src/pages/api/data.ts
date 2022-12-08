interface IUser {
  id: number;
  name: string;
  user: string;
  photo: string;
}

interface IData {
  user: IUser[];
}

export const data: IData = {
  user: [
    {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
    {
      id: 2,
      name: "Umbrella Software",
      user: "umbrella.software",
      photo: "/umbrellaicon.png",
    },
    {
      id: 3,
      name: "Pokemon App",
      user: "pokemon.app",
      photo: "/pokemonicon.png",
    },
  ],
};

interface IContent {
  id: number;
  url: string;
}

interface IStaticPosts {
  id: number;
  date: Date;
  description: string;
  content: IContent[];
  likes: number;
  comments?: string[];
  user: IUser;
}

export const static_posts: IStaticPosts[] = [
  {
    id: 1,
    date: new Date(),
    description: "Hi mane is Raphael",
    content: [
      {
        id: 1,
        url: "/raphael1.png",
      },
      {
        id: 2,
        url: "/raphael.png",
      },
      {
        id: 3,
        url: "/raphael2.png",
      },
    ],
    comments: [
      "raphael mesquita",
      "raphael mesquitadwqd wwqdwqd wqd wq",
      "raphael mesquita dqw qw dqwd wq wq",
      "raphael mesquita dqw dqwd  qwd wq dwq qwd qd wqd qd qwd qw",
      "raphael mesquita",
      "raphael mesquitadwqd wwqdwqd wqd wq",
      "raphael mesquita dqw qw dqwd wq wq",
      "raphael mesquita dqw dqwd  qwd wq dwq qwd qd wqd qd qwd qw",
      "raphael mesquita",
      "raphael mesquitadwqd wwqdwqd wqd wq",
      "raphael mesquita dqw qw dqwd wq wq",
      "raphael mesquita dqw dqwd  qwd wq dwq qwd qd wqd qd qwd qw",
      "raphael mesquita",
      "raphael mesquitadwqd wwqdwqd wqd wq",
      "raphael mesquita dqw qw dqwd wq wq",
      "raphael mesquita dqw dqwd  qwd wq dwq qwd qd wqd qd qwd qw",
    ],
    likes: 200,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 2,
    date: new Date(),
    description:
      "Before become a software engineer, I worked for over 10 yeas as a graphic designer, using softwares such as Corel Drawn and Photoshop, my job was to prived design sollutions for different companies and applications.",
    content: [
      {
        id: 1,
        url: "/skills.png",
      },
      {
        id: 2,
        url: "/skills1.png",
      },
    ],
    comments: [
      "raphael mesquita",
      "raphael mesquitadwqd wwqdwqd wqd wq",
      "raphael mesquita dqw qw dqwd wq wq",
      "raphael mesquita dqw dqwd  qwd wq dwq qwd qd wqd qd qwd qw",
    ],
    likes: 180,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 3,
    date: new Date(),
    description:
      "In 2020 I decided to improve my skills as a software engineer, my first choice was to start a small online course at Udemy, one of the largest online courses in the world, from there I finished 3 different courses, 50 Days 50 Projects, from Trevesy Media, using HTML, CSS and Java Script. The Complete Web Developer in 2021, from Zero to Mastery, using react as main framework. Complete Python Developer, from Zero to Mastery",
    content: [
      {
        id: 1,
        url: "/udemy.png",
      },
      {
        id: 2,
        url: "/udemy1.png",
      },
      {
        id: 3,
        url: "/udemy2.png",
      },
      {
        id: 4,
        url: "/udemy3.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 180,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 4,
    date: new Date(),
    description:
      "After Udemy I was able to finish my first project using ReactJs, react hooks and libaries such as axios, styled-components, learn more about react-router, you can see more here https://pokemon-shop.vercel.app/",
    content: [
      {
        id: 1,
        url: "/pokemon.png",
      },
      {
        id: 2,
        url: "/pokemon1.png",
      },
      {
        id: 3,
        url: "/pokemon2.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 180,
    user: {
      id: 3,
      name: "Pokemon App",
      user: "pokemon.app",
      photo: "/pokemonicon.png",
    },
  },
  {
    id: 5,
    date: new Date(),
    description:
      "IT guy can you help me to reset my password ? What about to organize those cables ?",
    content: [
      {
        id: 1,
        url: "/hero.png",
      },
      {
        id: 2,
        url: "/hero1.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 200,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 6,
    date: new Date(),
    description:
      "In 2021 I also started my degree at Unigran, my goal is to finish it at the end of 2023 and start a master's degree in Block Chain (but i am not 100% sure about it yet )",
    content: [
      {
        id: 1,
        url: "/unigran.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 200,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 7,
    date: new Date(),
    description:
      "Another certificate! Rocketseat is one of the most popular schools for colding from Brazil, form there I imporve my skills on React and NextJs.",
    content: [
      {
        id: 1,
        url: "/rocketseat.png",
      },
      {
        id: 2,
        url: "/rocketseat1.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 200,
    user: {
      id: 1,
      name: "Raphael Mesquita",
      user: "raphaelbmesquita",
      photo: "/raphael.png",
    },
  },
  {
    id: 8,
    date: new Date(),
    description:
      "Umbrella is a software developed by me to help small/large business to manager they company, build using NodeJs, NextJs, React-Native and MondoDB, build this aplication tought me to work with express, react-query, real time queries with socket.io, token authentication and more... you can have a look on our website at https://www.umbrellasoftware.com.br",
    content: [
      {
        id: 1,
        url: "/umbrella.png",
      },
      {
        id: 2,
        url: "/umbrella1.png",
      },
      {
        id: 3,
        url: "/umbrella2.png",
      },
      {
        id: 4,
        url: "/umbrella3.png",
      },
    ],
    comments: ["raphael mesquita"],
    likes: 200,
    user: {
      id: 2,
      name: "Umbrella Software",
      user: "umbrella.software",
      photo: "/umbrellaicon.png",
    },
  },
];
