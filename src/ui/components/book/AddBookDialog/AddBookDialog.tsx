import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import useAuthors from "../../../../hooks/useAuthors";
import useCountries from "../../../../hooks/useCountries";
import type { BookFormData } from "../../../../api/types/book";

interface FormData {
  name: string;
  description: string;
  availableCopies: string;
  authorId: string;
  countryId: string;
}

const initialFormData: FormData = {
  name: "",
  category: "",
  authorId: "",
  availableCopies: ""
};

interface AddBookDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: BookFormData) => Promise<void>;
}

const AddBookDialog = ({ open, onClose, onAdd }: AddBookDialogProps) => {
  const { authors } = useAuthors();
  const { countries } = useCountries();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
       name: formData.name,
       category: formData.category,
       authorId: Number(formData.authorId),
       availableCopies: Number(formData.availableCopies)
    };

   console.log({
     name: formData.name,
     category: formData.category,
     authorId: formData.authorId,
     availableCopies: formData.availableCopies
   });
    await onAdd(payload);
    setFormData({ ...initialFormData });
    onClose();
  };

  return (
     <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ fontWeight: 600, color: "black" }}>Add Book</DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        {/* Category */}
        <FormControl margin='dense' fullWidth>
          <InputLabel>Category</InputLabel>

          <Select
            label='Category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            variant='outlined'
          >
            <MenuItem value='SCIENCE_FICTION'>SCIENCE FICTION</MenuItem>
            <MenuItem value='DRAMA'>DRAMA</MenuItem>
            <MenuItem value='HISTORY'>HISTORY</MenuItem>
          </Select>
        </FormControl>

        {/* Author */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Author</InputLabel>
          <Select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            label="Author"
          >
            {authors.map((a) => (
              <MenuItem
                key={a.id}
                value={a.id}
              >
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

         <TextField
          margin="dense"
          label="Available Copies"
          name="availableCopies"
          type="number"
          value={formData.availableCopies}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
       <Button onClick={onClose}>Cancel</Button>
       <Button onClick={handleSubmit} variant='contained' color='primary'>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;