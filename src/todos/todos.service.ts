import { Injectable } from '@nestjs/common';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TodoDto } from './dto/todo.dto';
import TodoJSON from '../../db/todo.json';
@Injectable()
export class TodosService {
  create(body: TodoCreateDto) {
    return 'This action adds a new todo';
  }

  list(): TodoDto[] {
    return TodoJSON;
  }

  detail(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, body: TodoUpdateDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
