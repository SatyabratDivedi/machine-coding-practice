

const datas= [
  {
    name: "public",
    isFolder: true,
    children: [
      {
        name: "node",
        isFolder: true,
        children: [
          {
            name: "node child 1",
            isFolder: false,
          },
          {
            name: "node child 2",
            isFolder: false,
          },
        ],
      },
    ],
  },
  {
    name: "app",
    isFolder: true,
    children: [
      {
        name: "components",
        isFolder: true,
        children: [
          {
            name: "header.tsx",
            isFolder: false,
          },
          {
            name: "footer.tsx",
            isFolder: false,
          },
        ],
      },
      {
        name: "app.tsx",
        isFolder: false,
      },
      {
        name: "style.css",
        isFolder: false,
      },
      {
        name: "layout.tsx",
        isFolder: false,
      },
    ],
  },
  {
    name: "package.json",
    isFolder: false,
  },
  {
    name: "tsconfig.json",
    isFolder: false,
  },
];

export default datas;
