import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum QuizType {
  Multiple = 'multiple',
  Boolean = 'boolean',
}

export enum QuizDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum QuizCategory {
  GeneralKnowledge = 'General Knowledge',
  EntertainmentBooks = 'Entertainment: Books',
  EntertainmentFilm = 'Entertainment: Film',
  EntertainmentMusic = 'Entertainment: Music',
  EntertainmentMusicalsTheatres = 'Entertainment: Musicals & Theatres',
  EntertainmentTelevision = 'Entertainment: Television',
  EntertainmentVideoGames = 'Entertainment: Video Games',
  EntertainmentBoardGames = 'Entertainment: Board Games',
  ScienceNature = 'Science & Nature',
  ScienceComputers = 'Science: Computers',
  ScienceMathematics = 'Science: Mathematics',
  Mythology = 'Mythology',
  Sports = 'Sports',
  Geography = 'Geography',
  History = 'History',
  Politics = 'Politics',
  Art = 'Art',
  Celebrities = 'Celebrities',
  Animals = 'Animals',
  Vehicles = 'Vehicles',
  EntertainmentComics = 'Entertainment: Comics',
  ScienceGadgets = 'Science: Gadgets',
  EntertainmentJapaneseAnimeManga = 'Entertainment: Japanese Anime & Manga',
  EntertainmentCartoonAnimations = 'Entertainment: Cartoon & Animations',
}

export type Quiz = {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizWithAnswers = Quiz & {
  answers: string[];
};
export type QuizApiResponse = {
  response_code: number;
  results: Quiz[];
};
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<QuizApiResponse> {
    return this.http.get<QuizApiResponse>(
      'https://opentdb.com/api.php?amount=3'
    );
  }
}
