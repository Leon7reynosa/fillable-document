import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfFile from './resources/edesur_t2_t3.pdf';
import './App.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    setPdfUrl(pdfFile);
  }, []);

  const savePdf = async () => {
    const existingPdfBytes = await fetch(pdfFile).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const form = pdfDoc.getForm()
    form.flatten()
    //pdfDoc.setModified(false)

    const pdfBytes = await pdfDoc.save({ useObjectStreams: false })
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filled_document.pdf';
    link.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        {pdfUrl && (
          <>
            <iframe src={`${pdfUrl}#toolbar=0&navpanes=0`} width="100%" height="500px" title="Editable PDF" />
            <button onClick={savePdf}>Save and Flatten PDF</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
