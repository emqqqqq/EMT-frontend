import { useCallback, useEffect, useState } from 'react';
import bookApi from '../api/books/bookApi';
import type { Book, BookFormData } from '../api/types/book';

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await bookApi.findAll();
      setBooks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error'));
    } finally {
      setLoading(false);
    }
  }, []);

  const onAdd = useCallback(async (data: BookFormData) => {
    await bookApi.add(data);
    await fetch();
  }, [fetch]);

  const onEdit = useCallback(async (id: number, data: BookFormData) => {
    await bookApi.edit(id.toString(), data);
    await fetch();
  }, [fetch]);

 const onDelete = useCallback(async (id: number) => {
   await bookApi.delete(id.toString());
   const response = await bookApi.findAll();
   setBooks(response.data);
 }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { books, loading, error, onAdd, onEdit, onDelete };
};

export default useBooks;