import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from "react";

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
}

const PreferContext = createContext<PreferContextType>({
  data: [], // Initialize as an empty array
  setData: () => {}, // Correct type for setData
});

export const PreferProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Question[]>([]); // Use Question[] here as well

  return (
    <PreferContext.Provider value={{ data, setData }}>
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
