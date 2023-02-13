import { AnswerObject } from "../App";


type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQusetions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQusetions }) => {
    return (
        <div>
            <p className="number">Question: {questionNum} / {totalQusetions}</p>

            <p dangerouslySetInnerHTML={{__html: question}}></p>

            <div>
                {
                    answers.map(answer => (
                        <div key={answer}>
                            <button disabled = {userAnswer ? true :false} value = {answer} onClick = {callback}>
                                <span dangerouslySetInnerHTML={{__html: answer}}></span>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}