import { TodoDto } from './todo.dto';

export interface TodoCreateDto extends Pick<TodoDto, 'content' | 'title'> {}
