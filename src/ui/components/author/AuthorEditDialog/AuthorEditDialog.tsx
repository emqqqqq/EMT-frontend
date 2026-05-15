import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useEffect, useState } from "react";
import type { Author, AuthorFormData } from "../../../../api/types/author";
import useCountries from "../../../../hooks/useCountries";

interface Props {
  open: boolean;
  onClose: () => void;
  author: Author | null;
  onEdit: (id: number, data: AuthorFormData) => Promise<void>;
}

const AuthorEditDialog = ({ open, onClose, author, onEdit }: Props) => {
   const { countries } = useCountries();
   const [formData, setFormData] = useState<FormData>({
     name: author.name,
     surname: author.surname,
     countryId: String(author.country.id),
  });

  const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
      ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload: AuthorFormData = {
        name: formData.name,
        surname: formData.surname,
        countryId: Number(formData.countryId)
    };

    await onEdit(author.id, payload);
    setFormData({ ...formData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Author</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Country</InputLabel>

          <Select
              label="Country"
              name="countryId"
              value={formData.countryId}
              onChange={handleChange}
            >
              {countries.map((country) => (
                <MenuItem
                  key={country.id}
                  value={String(country.id)}
                >
                  {country.name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthorEditDialog;