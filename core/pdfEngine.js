import jsPDF from 'jspdf';

export function exportPDF() {
    const preview = document.getElementById('resumePreview');
    if (!preview) return;

    const doc = new jsPDF({ unit: 'px', format: 'a4' });
    doc.html(preview, {
        callback: function(pdf) {
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            const name = userData.fullName?.replace(/\s+/g, '_') || 'Resume';
            pdf.save(`${name}_ResuNova.pdf`);
        },
        x: 20,
        y: 20,
        html2canvas: { scale: 0.5 }
    });
}