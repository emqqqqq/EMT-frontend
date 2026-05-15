import { Grid } from "@mui/material";
import type { Author, AuthorFormData } from "../../../api/types/author";
import AuthorCard from "../AuthorCard/AuthorCard";

interface Props {
  authors: Author[];
  onEdit: (id: number, data: AuthorFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const AuthorGrid = ({ authors = [], onEdit, onDelete }: Props) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
      {authors.map((author) => (
        <Grid item key={author.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AuthorCard author={author}  onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AuthorGrid;