import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import PdfViewerComponent from './components/PdfViewerComponent.js';

function App() {

  return (
    DocumentViewerComponent()
  );
}

export default App;




function DocumentViewerComponent() {
	return (
		<div style={{width: '100%', height: '100vh'}}>
			<PdfViewerComponent
				document={"document.pdf"}
			/>
		</div>
	);
}