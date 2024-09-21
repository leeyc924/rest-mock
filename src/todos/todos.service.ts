import { Injectable } from '@nestjs/common';
import { TodoCreateDto, TodoUpdateDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  create(body: TodoCreateDto) {
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, body: TodoUpdateDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
