import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import useAuthors from "../../../../hooks/useAuthors";
import useCountries from "../../../../hooks/useCountries";
import type { CountryFormData } from "../../../../api/types/countries";

interface FormData {
  name: string;
  continent: string;
}

const initialFormData: FormData = {
  name: "",
  continent: "",
};

interface AddCountryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: CountryFormData) => Promise<void>;
}

const AddCountryDialog = ({ open, onClose, onAdd }: AddCountryDialogProps) => {
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
       continent: formData.continent,
    };

   console.log({
     name: formData.name,
            continent: formData.continent,
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

         <TextField
          margin="dense"
          label="Continent"
          name="continent"
          value={formData.continent}
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

export default AddCountryDialog;