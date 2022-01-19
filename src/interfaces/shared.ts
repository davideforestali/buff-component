export interface BuffDataProps {
  author: {
    first_name: string;
    last_name: string;
    photo: string[];
  };
  question: string;
  answers: { id: number; title: string, correct: boolean }[];
}
