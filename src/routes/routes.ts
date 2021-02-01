// Task
import Task from '../components/Task/Task';

// All categories
import AllCategories from '../pages/AllCategories/AllCategories';
import Category from '../pages/Category/Category';

const routes: Array<RouteObj> = [];

routes.push({ path: '/', exact: true, name: 'Categories', component: AllCategories });

type RouteObj = {
  path: string;
  exact: boolean;
  name: string;
  component: any;
};

routes.push({ path: '/task/:id', exact: true, name: 'Task', component: Task });
routes.push({ path: '/categories/:id', exact: true, name: 'Category', component: Category });

export default routes;
