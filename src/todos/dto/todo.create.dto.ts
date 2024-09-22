import { TodoDto } from './todo.dto';
import { PickType } from '@nestjs/mapped-types';

export class TodoCreateDto extends PickType(TodoDto, ['content', 'title']) {}
