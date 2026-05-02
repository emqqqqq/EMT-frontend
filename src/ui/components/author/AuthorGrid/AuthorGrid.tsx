import { Grid } from "@mui/material";
import type { Author } from "../../../api/types/author";
import AuthorCard from "../AuthorCard/AuthorCard";

interface Props {
  authors: Author[];
}

const AuthorGrid = ({ authors = [] }: Props) => {
  return (
    <Grid container spacing={2}>
      {authors.map((author) => (
        <Grid item key={author.id} xs={12} sm={6} md={4}>
          <AuthorCard author={author} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AuthorGrid;