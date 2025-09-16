import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';


export default function Home({ startUpload }) {
return (
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
<Box
display="flex"
flexDirection="column"
justifyContent="center"
alignItems="center"
minHeight="100vh"
bgcolor="#f5f5f7"
color="#111"
>
<Typography variant="h2" gutterBottom fontWeight="bold">
Invoice Processor
</Typography>
<Typography variant="h6" gutterBottom>
Upload your invoices and get structured JSON instantly
</Typography>
<Button
variant="contained"
color="primary"
size="large"
onClick={startUpload}
sx={{ mt: 4, px: 6, py: 2, borderRadius: 3 }}
>
Upload Invoice
</Button>
</Box>
</motion.div>
);
}