import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export default function InvoiceDisplay({ data }) {
  const [openSections, setOpenSections] = useState({});

  if (!data) return null;

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderValue = (value, key) => {
    if (Array.isArray(value)) {
      const isOpen = openSections[key] ?? true;
      return (
        <>
          <IconButton size="small" onClick={() => toggleSection(key)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Collapse in={isOpen} timeout="auto">
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {value.map((item, idx) => (
                <li key={idx}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </Collapse>
        </>
      );
    } else if (typeof value === 'object' && value !== null) {
      const isOpen = openSections[key] ?? true;
      return (
        <>
          <IconButton size="small" onClick={() => toggleSection(key)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Collapse in={isOpen} timeout="auto">
            <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflow: 'auto' }}>
              {JSON.stringify(value, null, 2)}
            </pre>
          </Collapse>
        </>
      );
    } else if (typeof value === 'string' && value.length > 200) {
      // Very long text
      const isOpen = openSections[key] ?? false;
      return (
        <>
          <IconButton size="small" onClick={() => toggleSection(key)}>
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Collapse in={isOpen} timeout="auto">
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {value}
            </Typography>
          </Collapse>
          {!isOpen && <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '50px' }}>{value}</Typography>}
        </>
      );
    }
    return value;
  };

  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Paper
        elevation={6}
        sx={{
          p: 6,
          maxWidth: 800,
          width: '100%',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff, #f2f2f2)',
          boxShadow: '0px 5px 15px rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Parsed Invoice
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {Object.entries(data).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-3px)' },
                }}
              >
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {key.replace(/_/g, ' ').toUpperCase()}
                </Typography>
                <Typography variant="body2">{renderValue(value, key)}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
