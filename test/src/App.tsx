import React, { useState } from 'react';
import { QuestionState, Diffuclty, fetchQuizQuestions } from './API';
import { QuestionCard } from './components/QuestionCard';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;


const App = () => {

  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);


  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Diffuclty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Diffuclty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: any) => {

    if(!gameOver) {
      //Users answer
      const answer = e.currentTarget.value;
      //check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //add score is answer is correct
      if(correct){
        setScore(prev => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }

  }

  const nextQuestion = () => {

    const nextQuestion = number + 1;

    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);  
    }

  }
  return (
    <div className="App">
      <h1>React Quiz</h1>


      {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
        <button className='start' onClick={startTrivia}>Start</button>
        : null
      }

      {!gameOver ? <p className='score'>Score: {score} </p> : null}
      {loading && <p>Loading Questions...</p>}


      {!loading && !gameOver ? (
        <QuestionCard
          questionNum={number + 1}
          totalQusetions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}


      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
      <button className='next' onClick={nextQuestion}>Next Question</button>: null}
    </div>
  );
}

export default App;
