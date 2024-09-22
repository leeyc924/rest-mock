import { PickType } from '@nestjs/swagger';
import { TodoDto } from './todo.dto';

export class TodoUpdateDto extends PickType(TodoDto, ['content', 'title']) {}
