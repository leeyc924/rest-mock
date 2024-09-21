import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({ description: '아이디', example: '1' })
  id: string;
  @ApiProperty({ description: '제목', example: '제목' })
  title: string;
  @ApiProperty({ description: '내용', example: '내용' })
  content: string;
  @ApiProperty({ description: '등록일', example: '2024-10-10' })
  regDt: string;
  @ApiProperty({ description: '등록인', example: '홍길동' })
  regId: string;
  @ApiProperty({ description: '수정일', example: '2024-10-10' })
  modDt: string;
  @ApiProperty({ description: '수정인', example: '홍길동' })
  modId: string;
}

export class TodoCreateDto extends TodoDto {}

export class TodoUpdateDto extends TodoDto {}
