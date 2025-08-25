const { PDFDocument, StandardFonts, rgb } = require('pdf-lib') 
const  fs = require ('fs') 

async function generateCertificate(name) {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()

 
  page.drawText('Certificate of Completion', {
    x: width / 2 - 150,
    y: height - 100,
    size: 35,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })


  page.drawText(name, {
    x: width / 2 - 100,
    y: height - 180,
    size: 30,
    font: timesRomanFont,
    color: rgb(0.2, 0.2, 0.7),
  })

  
  page.drawText('has successfully completed the Internship', {
    x: width / 2 - 180,
    y: height - 220,
    size: 18,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync(`${name}-certificate.pdf`, pdfBytes)
  console.log(`${name}-certificate.pdf created!`)

   return pdfBytes;
}

    

module.exports = generateCertificate