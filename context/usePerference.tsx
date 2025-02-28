import React, { createContext, useState, ReactNode, useContext } from "react";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface PreferContextType {
  data: Question[]; // Use the Question type here
  setData: React.Dispatch<React.SetStateAction<Question[]>>; // Type for setData
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PreferContext = createContext<PreferContextType>({
  data: [], // Initialize as an empty array
  setData: () => {}, // Correct type for setData
  score: 0,
  setScore: () => {},
  url: "",
  setUrl: () => {},
});

export const PreferProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Question[]>([]); // Use Question[] here as well
  const [score, setScore] = useState<number>(0);
  const [url, setUrl] = useState<string>("");

  return (
    <PreferContext.Provider
      value={{ data, setData, score, setScore, url, setUrl }}
    >
      {children}
    </PreferContext.Provider>
  );
};

export const usePreferContext = () => {
  const context = useContext(PreferContext);
  if (context === undefined) {
    throw new Error("usePreferContext must be used within a PreferProvider");
  }
  return context;
};
