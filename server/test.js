import PDFDocument from 'pdfkit';
import fs from 'fs'

const doc = new PDFDocument;

doc.pipe(fs.createWriteStream('timesheet.pdf'));
doc
   
  .fontSize(27)
  .text('TimeSheet printing Test', 100, 100);
doc.end();