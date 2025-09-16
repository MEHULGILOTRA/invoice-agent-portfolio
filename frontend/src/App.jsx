import React, { useState } from 'react';
import Home from './components/Home';
import InvoiceUploader from './components/InvoiceUploader';
import InvoiceDisplay from './components/InvoiceDisplay';


function App() {
const [step, setStep] = useState(0);
const [invoiceData, setInvoiceData] = useState(null);


return (
<div>
{step === 0 && <Home startUpload={() => setStep(1)} />}
{step === 1 && (
<InvoiceUploader
onUpload={(data) => {
setInvoiceData(data);
setStep(2);
}}
/>
)}
{step === 2 && <InvoiceDisplay data={invoiceData} />}
</div>
);
}


export default App;