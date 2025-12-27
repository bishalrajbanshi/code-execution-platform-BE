import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseMessage {
  CreateMessage(modelName: string) {
    return `${modelName} created successfully`;
  }
  UpdateMessage(modelName: string) {
    return `${modelName} updated successfully`;
  }
  DeleteMessage(modelName: string) {
    return `${modelName} deleted successfully`;
  }
  FindAllMessage(modelName: string) {
    return `${modelName} fetched successfully`;
  }
  FindOneMessage(modelName: string) {
    return `${modelName} fetched successfully`;
  }

  SuccessMessage(message: string) {
    return `${message}  successfully`;
  }
  ErrorMessage(modelName: string) {
    return `${modelName} not found`;
  }
}
