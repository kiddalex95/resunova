export async function loadTemplate(templateName, audience='professional') {
    // Load JSON template based on audience and region
    const region = document.getElementById('regionSelect').value;
    try {
        const res = await fetch(`templates/${region}/${templateName}.json`);
        const templateData = await res.json();
        // Simple rendering engine: replace {{key}} with data
        let html = templateData.html || '';
        Object.entries(templateData).forEach(([key, value]) => {
            html = html.replaceAll(`{{${key}}}`, value || '');
        });
        // Fill form values as defaults if missing
        const formData = Object.fromEntries(new FormData(document.getElementById('formFields')).entries());
        Object.entries(formData).forEach(([key, value]) => {
            html = html.replaceAll(`{{${key}}}`, value || '');
        });
        return html;
    } catch(err) {
        console.error('Template loading failed', err);
        return '<p>Template not found. Please select another template.</p>';
    }
}