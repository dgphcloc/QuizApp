import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Quiz = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
};

const quizzes: Quiz[] = [
  {
    question: 'Thủ đô của Việt Nam là gì?',
    options: ['Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội', 'Huế'],
    correctAnswerIndex: 2,
  },
  {
    question: '2 + 2 bằng bao nhiêu?',
    options: ['3', '4', '5', '6'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Ngôn ngữ nào được sử dụng trong Angular?',
    options: ['Python', 'TypeScript', 'Java', 'PHP'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Trái đất quay quanh gì?',
    options: ['Mặt trăng', 'Sao Hỏa', 'Mặt trời', 'Sao Kim'],
    correctAnswerIndex: 2,
  },
  {
    question: 'Ai là người viết bản Tuyên ngôn Độc lập của Việt Nam?',
    options: ['Trần Hưng Đạo', 'Nguyễn Du', 'Hồ Chí Minh', 'Phan Bội Châu'],
    correctAnswerIndex: 2,
  },
  {
    question: 'HTML là viết tắt của gì?',
    options: [
      'Hyper Trainer Marking Language',
      'Hyper Text Markup Language',
      'Hyper Text Markdown Language',
      'Highlevel Text Management Language',
    ],
    correctAnswerIndex: 1,
  },
  {
    question: 'Màu xanh lá cây trong RGB là?',
    options: ['(255, 0, 0)', '(0, 255, 0)', '(0, 0, 255)', '(255, 255, 0)'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Ai là tác giả truyện Kiều?',
    options: ['Nguyễn Trãi', 'Nguyễn Du', 'Xuân Diệu', 'Tố Hữu'],
    correctAnswerIndex: 1,
  },
  {
    question: 'Câu lệnh để khai báo biến trong TypeScript là?',
    options: ['define', 'dim', 'let', 'select'],
    correctAnswerIndex: 2,
  },
  {
    question: 'CSS dùng để làm gì?',
    options: [
      'Thiết kế cấu trúc',
      'Kết nối cơ sở dữ liệu',
      'Tạo giao diện đẹp',
      'Xử lý logic',
    ],
    correctAnswerIndex: 2,
  },
];

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  getQuizzes(): Observable<Quiz[]> {
    return of(quizzes);
  }
}
