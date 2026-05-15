import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent,
  TextField
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import type { Country, CountryFormData } from '../../../../api/types/country';

interface Props {
  open: boolean;
  onClose: () => void;
  country: Country | null;
  onEdit: (id: number, data: CountryFormData) => Promise<void>;
}

const EditCountryDialog = ({ open, onClose, country, onEdit }: Props) => {
   const [formData, setFormData] = useState<FormData>({
      name: country.name,
      continent: country.continent
   });

   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
      const payload: CountryFormData = {
        name: formData.name,
        continent: formData.continent
      };

      await onEdit(country.id, payload);
      setFormData({ ...formData });
      onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Country</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />


        <TextField
          fullWidth
          margin="dense"
          name="continent"
          value={formData.continent}
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

export default EditCountryDialog;