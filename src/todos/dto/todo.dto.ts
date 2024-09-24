export interface TodoDto {
  /**
   * 아이디
   */
  id: string;
  /**
   * 제목
   */
  title: string;
  /**
   * 내용
   */
  content: string;
  /**
   * 등록일
   */
  regDt: string;
  /**
   * 등록인
   */
  regId: string;
  /**
   * 수정일
   */
  modDt: string;
  /**
   * 수정인
   */
  modId: string;
}
