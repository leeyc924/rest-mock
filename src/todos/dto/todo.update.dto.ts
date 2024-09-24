import { TodoDto } from './todo.dto';

export interface TodoUpdateDto extends Pick<TodoDto, 'content' | 'title'> {}
