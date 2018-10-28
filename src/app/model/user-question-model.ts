export interface UserQuestionModel {
  id: string;
  question: string;
  option: string[];
  selected: string;
  saved: boolean;
}
