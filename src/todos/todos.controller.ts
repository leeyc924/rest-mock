import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoUpdateDto } from './dto/todo.update.dto';
import { TypedBody, TypedRoute } from '@nestia/core';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @TypedRoute.Post()
  @HttpCode(204)
  create(@TypedBody() body: TodoCreateDto) {
    return this.todosService.create(body);
  }

  @Get()
  list() {
    return this.todosService.list();
  }

  @Get(':id')
  @HttpCode(204)
  detail(@Param('id') id: string) {
    return this.todosService.detail(+id);
  }

  @Patch(':id')
  @HttpCode(204)
  update(@Param('id') id: string, @Body() body: TodoUpdateDto) {
    return this.todosService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
