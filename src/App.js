import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import './App.css';

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const createPdf = async () => {
    const urlPdf = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(urlPdf).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    

    const page = firstPage
  
    const form = pdfDoc.getForm()
  
    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })
  
    const superheroField = form.createTextField('favorite.superhero')
    superheroField.setText('')
    superheroField.addToPage(page, { x: 50, y: 640, width: 150, height: 20 })

    const pdfBytes = await pdfDoc.save()

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createPdf}>Create PDF</button>
        {pdfUrl && (
          <iframe src={pdfUrl} width="100%" height="500px" title="Generated PDF" />
        )}
      </header>
    </div>
  );
}

export default App;
