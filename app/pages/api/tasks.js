let tasks = [
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'in-progress' },
    { id: 3, title: 'Task 3', status: 'done' },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json(tasks);
    } else if (req.method === 'POST') {
      const { title, status } = req.body;
      const newTask = {
        id: tasks.length + 1,
        title,
        status,
      };
      tasks.push(newTask);
      res.status(201).json(newTask);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }