export class ResponseDto {
  code: number;
  result: string;
  message: string;
  data: {
    [key: string]: any
  };

  constructor(code: number, result: string, message: string, data: {[key: string]: any} = null) {
    this.code = code;
    this.result = result;
    this.message = message;
    this.data = data;
  }

}
