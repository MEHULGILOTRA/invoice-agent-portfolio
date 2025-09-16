import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';

export default function InvoiceUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:8000/process-invoice/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      onUpload(data.parsed_invoice);
    } catch (err) {
      alert('Upload failed: ' + err);
    }

    setLoading(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 6,
        maxWidth: 500,
        width: '100%',
        textAlign: 'center',
        mt: 6,
        mx: 'auto',
        borderRadius: 3,
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Upload Your Invoice
      </Typography>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
          sx={{ px: 4, py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Process Invoice'}
        </Button>
      </Box>

      {file && (
        <Typography variant="body2" sx={{ mt: 2, color: 'gray' }}>
          Selected file: {file.name}
        </Typography>
      )}
    </Paper>
  );
}
