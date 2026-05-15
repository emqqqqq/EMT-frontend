import { useCallback, useEffect, useState } from "react";
import authorApi from "../api/authors/authorApi";
import type { Author, AuthorFormData } from "../api/types/author";

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authorApi.findAll();
      setAuthors(response.data);
    }catch (err) {
       setError(err instanceof Error ? err : new Error('Error'));
     } finally {
      setLoading(false);
    }
  }, []);

  const onAdd = useCallback(async (data: AuthorFormData) => {
    await authorApi.add(data);
    await fetch();
  }, [fetch]);

  const onEdit = useCallback(async (id: number, data: AuthorFormData) => {
    await authorApi.edit(id.toString(), data);
    await fetch();
  }, [fetch]);

  const onDelete = useCallback(async (id: number) => {
    await authorApi.delete(id.toString());
    await fetch();
  }, [fetch]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { authors, loading, error, onAdd, onEdit, onDelete };
};

export default useAuthors;