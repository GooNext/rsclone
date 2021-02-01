import BoardsStore from '../../stores/BoardsStore';
import TasksStore from '../../stores/TasksStore';

interface BoardItemType {
  id: string;
  title: string;
  label: string;
  cards: Array<any>;
}

interface DataLanesType {
  lanes: Array<any>;
}

const BoardsData = (categoryId) => {
  const data: DataLanesType = {
    lanes: [],
  };

  BoardsStore.boards.forEach((board: any) => {
    if (board.categoryId === categoryId) {
      const boardType: BoardItemType = {
        id: board._id,
        title: board.title,
        label: '',
        cards: [],
      };
      TasksStore.tasks.forEach((task: any) => {
        const taskType = {
          id: task._id,
          title: task.title,
          label: Date.parse(task.time),
          description: task.description,
          isCompleted: task.isCompleted,
        };
        if (task.boardId === board._id) {
          boardType.cards.push(taskType);
          boardType.label = ` | Tasks: ${boardType.cards.length.toString()}`;
        }
      });
      data.lanes.push(boardType);
    }
  });

  return data;
};

export default BoardsData;
