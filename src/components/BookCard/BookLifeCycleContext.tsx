import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';

const BookLifeCycleContext = createContext<{
  hasReachedLimit: boolean;
  handlers: { returnBook: () => any; borrowBook: () => any };
}>({} as any);

export function BookLifeCycleContextProvider({
  bookingLimit,
  children,
}: {
  bookingLimit: number;
  children: ReactNode;
}) {
  const [numberOfBooksBorrowed, setNumberOfBooksBorrowed] = useState(0);

  const hasReachedLimit = numberOfBooksBorrowed >= bookingLimit;

  useEffect(
    () => console.log('Borrowed', numberOfBooksBorrowed),
    [numberOfBooksBorrowed]
  );

  const borrowBook = () => {
    if (hasReachedLimit) return;
    setNumberOfBooksBorrowed((prev) => prev + 1);
  };
  const returnBook = () => {
    if (numberOfBooksBorrowed === 0) return;
    setNumberOfBooksBorrowed((prev) => prev - 1);
  };

  const handlers = {
    returnBook,
    borrowBook,
  };

  return (
    <BookLifeCycleContext.Provider value={{ handlers, hasReachedLimit }}>
      {children}
    </BookLifeCycleContext.Provider>
  );
}

export function useBookLifeCycle() {
  const context = useContext(BookLifeCycleContext);

  if (context === undefined) {
    throw new Error(
      `useBookLifeCycle must be wrapped within BookLifeCycleContextProvider`
    );
  }

  return context;
}
