import jsPDF from 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';

export function exportToPDF(previewEl, templateName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p','pt','a4');
    const html = previewEl.innerHTML;

    // Render HTML content in PDF
    doc.html(html, {
        callback: function(doc){
            doc.save(`${templateName}-resume.pdf`);
        },
        x: 20,
        y: 20,
        width: 555
    });
}