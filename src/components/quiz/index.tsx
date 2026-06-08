'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Button } from './components/button';
import { Card, CardContent } from './components/card';
import { Badge } from './components/badge';
import { Progress } from './components/progress';

type Question = {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
};

interface QuizProps {
  questions: Question[];
  showCorrectAnswers?: boolean;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query: string) {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const parts = text.split(
    new RegExp(`(${escapeRegExp(trimmed)})`, 'gi')
  );

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        className="rounded bg-yellow-200 px-0.5 text-inherit"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function matchesSearch(
  question: Question,
  query: string
) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  if (question.question.toLowerCase().includes(normalized)) {
    return true;
  }

  return Object.values(question.options).some((option) =>
    option.toLowerCase().includes(normalized)
  );
}

export default function Quiz({
  questions,
  showCorrectAnswers = false,
}: QuizProps) {
  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [submitted, setSubmitted] =
    useState(false);

  const [search, setSearch] = useState('');
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredQuestions = useMemo(
    () =>
      questions
        .map((q, index) => ({ q, index }))
        .filter(({ q }) =>
          matchesSearch(q, search)
        ),
    [questions, search]
  );

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Escape') {
      setSearch('');
      searchInputRef.current?.focus();
    }
  };

  const answeredCount =
    Object.keys(answers).length;

  const progress =
    (answeredCount / questions.length) * 100;

  const score = useMemo(() => {
    return questions.filter(
      (q) => answers[q.id] === q.answer
    ).length;
  }, [answers, questions]);

  const handleSelect = (
    questionId: number,
    option: string
  ) => {
    if (revealAnswers) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const scrollToQuestion = (index: number) => {
  document
    .getElementById(`question-${index}`)
    ?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
};

  const revealAnswers =
  submitted || showCorrectAnswers;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* LEFT */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Tìm kiếm câu hỏi hoặc đáp án..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
              </div>

              {search.trim() && (
                <p className="mt-2 text-sm text-slate-500">
                  Tìm thấy {filteredQuestions.length}/
                  {questions.length} câu
                </p>
              )}

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    Bài kiểm tra
                  </h1>

                  <p className="text-sm text-slate-500">
                    Đã trả lời {answeredCount}/
                    {questions.length} câu
                  </p>
                </div>

                {revealAnswers && (
                  <Badge className="px-4 py-2 text-base">
                    {score}/{questions.length} điểm
                  </Badge>
                )}
              </div>

              <div className="mt-4">
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>

          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-slate-500">
                Không tìm thấy câu hỏi nào phù hợp với &quot;
                {search.trim()}&quot;
              </CardContent>
            </Card>
          ) : (
            filteredQuestions.map(({ q, index }) => {
            const selected = answers[q.id];

            return (
              <Card 
              key={q.id} 
              id={`question-${index}`} 
              className="scroll-mt-4"
              >
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="font-bold text-lg">
                      Câu {index + 1}
                    </h2>

                    <p className="mt-2 text-base">
                      {highlightText(q.question, search)}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(
                      q.options
                    ).map(([key, value]) => {
                      const isSelected =
                        selected === key;

                      const isCorrect =
                        q.answer === key;

                      let className =
                        'relative w-full rounded-xl border p-4 text-left transition-all';

                      if (!revealAnswers) {
                        if (isSelected) {
                          className +=
                            ' border-blue-500 bg-blue-50 ring-2 ring-blue-200';
                        } else {
                          className +=
                            ' border-slate-200 hover:border-slate-400 hover:bg-slate-50';
                        }
                      }

                      if (revealAnswers) {
                        if (isCorrect) {
                          className +=
                            ' border-green-500 bg-green-50';
                        } else if (
                          isSelected &&
                          !isCorrect
                        ) {
                          className +=
                            ' border-red-500 bg-red-50';
                        } else {
                          className +=
                            ' border-slate-200 bg-white';
                        }
                      }

                      return (
                        <button
                          key={key}
                          onClick={() =>
                            handleSelect(
                              q.id,
                              key
                            )
                          }
                          disabled={submitted}
                          className={className}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-start">
                              <div
                                className={`
                                  flex h-8 w-8 shrink-0
                                  items-center justify-center
                                  rounded-full border
                                  font-bold uppercase
                                  ${
                                    revealAnswers
                                      ? 'bg-blue-500 border-blue-500 text-white'
                                      : 'bg-white'
                                  }
                                `}
                              >
                                {key}
                              </div>

                              <span>
                                {highlightText(value, search)}
                              </span>
                            </div>

                            {revealAnswers &&
                              isCorrect && (
                                <span className="text-green-600 text-xl font-bold">
                                  ✓
                                </span>
                              )}

                            {revealAnswers &&
                              isSelected &&
                              !isCorrect && (
                                <span className="text-red-600 text-xl font-bold">
                                  ✗
                                </span>
                              )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4">
                      {selected ===
                      q.answer ? (
                        <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-green-700">
                          ✓ Bạn trả lời
                          chính xác
                        </div>
                      ) : (
                        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
                          <div>
                            ✗ Bạn chọn:{' '}
                            <strong>
                              {selected?.toUpperCase()}
                            </strong>
                          </div>

                          <div>
                            ✓ Đáp án đúng:{' '}
                            <strong>
                              {q.answer.toUpperCase()}
                            </strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
          )}

          {!revealAnswers && (
            <Button
              size="lg"
              className="w-full"
              onClick={() =>
                setSubmitted(true)
              }
            >
              Nộp bài
            </Button>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <Card className="sticky top-2">
            <CardContent className="p-5">
              <h3 className="mb-2 text-lg font-bold">
                Danh sách câu hỏi
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {filteredQuestions.map(
                  ({ q, index }) => {
                    const answered =
                      answers[q.id] !==
                      undefined;

                    let className =
                      'flex h-8 w-8 items-center justify-center rounded-lg border font-semibold cursor-pointer';

                    if (!revealAnswers) {
                      className += answered
                        ? ' bg-blue-500 border-blue-500 text-white '
                        : ' bg-white ';
                    } else {
                      if (
                        answers[q.id] ===
                        q.answer
                      ) {
                        className +=
                          ' bg-green-500 border-green-500 text-white ';
                      } else if (
                        answers[q.id]
                      ) {
                        className +=
                          ' bg-red-500 border-red-500 text-white ';
                      } else {
                        className +=
                          ' bg-slate-200 ';
                      }
                    }

                    return (
                      <div
                        key={q.id}
                        className={className}
                        onClick={() => scrollToQuestion(index)}
                      >
                        {index + 1}
                      </div>
                    );
                  }
                )}
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-blue-500" />
                  <span>
                    Đã chọn
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-500" />
                  <span>
                    Trả lời đúng
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500" />
                  <span>
                    Trả lời sai
                  </span>
                </div>
              </div>

              {revealAnswers && (
                <div className="mt-6 rounded-xl bg-slate-100 p-4 text-center">
                  <div className="text-3xl font-bold">
                    {score}
                  </div>

                  <div className="text-sm text-slate-500">
                    / {questions.length}{' '}
                    điểm
                  </div>

                  <div className="mt-2 text-sm font-medium">
                    {Math.round(
                      (score /
                        questions.length) *
                        100
                    )}
                    %
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
