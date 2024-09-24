import { Controller, HttpCode } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { TodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @TypedRoute.Post()
  @HttpCode(204)
  create(@TypedBody() body: TodoCreateDto) {
    return this.todosService.create(body);
  }

  @TypedRoute.Get()
  list(): TodoDto[] {
    return this.todosService.list();
  }

  @TypedRoute.Get(':id')
  detail(@TypedParam('id') id: string) {
    return this.todosService.detail(+id);
  }

  @TypedRoute.Patch(':id')
  @HttpCode(204)
  update(@TypedParam('id') id: string, @TypedBody() body: TodoUpdateDto) {
    return this.todosService.update(+id, body);
  }

  @TypedRoute.Delete(':id')
  @HttpCode(204)
  remove(@TypedParam('id') id: string) {
    return this.todosService.remove(+id);
  }
}
