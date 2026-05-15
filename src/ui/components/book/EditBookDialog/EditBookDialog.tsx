import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import type { Book, BookFormData } from '../../../../api/types/book';

interface Props {
  open: boolean;
  onClose: () => void;
  book: Book | null;
  onEdit: (id: number, data: BookFormData) => Promise<void>;
}

const EditBookDialog = ({ open, onClose, book, onEdit }: Props) => {
   const [formData, setFormData] = useState<FormData>({
      name: book.name,
      category: book.category,
      authorId: String(book.author.id),
      availableCopies: String(book.availableCopies)
   });

   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
      const payload: BookFormData = {
        name: formData.name,
              category: formData.category,
              authorId: Number(formData.authorId),
              availableCopies: Number(formData.availableCopies)
      };

      await onEdit(book.id, payload);
      setFormData({ ...formData });
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Book</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="FICTION">FICTION</MenuItem>
            <MenuItem value="DRAMA">DRAMA</MenuItem>
            <MenuItem value="HISTORY">HISTORY</MenuItem>
            <MenuItem value="FANTASY">FANTASY</MenuItem>
            <MenuItem value="BIOGRAPHY">BIOGRAPHY</MenuItem>
            <MenuItem value="CLASSICS">CLASSICS</MenuItem>
            <MenuItem value="SCIENCE_FICTION">SCIENCE FICTION</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          name="authorId"
          value={formData.authorId}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          name="availableCopies"
          type="number"
          value={formData.availableCopies}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookDialog;