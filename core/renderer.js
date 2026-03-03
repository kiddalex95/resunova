// core/renderer.js

export function renderResume(template, formData) {
    const preview = document.getElementById("resumePreview");
    preview.innerHTML = "";

    if (!template) return;

    // Apply theme colors
    preview.style.borderTop = `6px solid ${template.header.colors.primary}`;

    // Sort sections by order
    const sortedSections = [...template.sections].sort((a, b) => a.order - b.order);

    sortedSections.forEach(section => {
        const sectionElement = document.createElement("div");
        sectionElement.classList.add("mb-6");

        switch (section.type) {

            case "contact":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Contact</h2>
                    <p><strong>${formData.fullName || ""}</strong></p>
                    <p>${formData.email || ""}</p>
                    <p>${formData.phone || ""}</p>
                    <p>${formData.location || ""}</p>
                `;
                break;

            case "summary":
            case "executiveSummary":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Summary</h2>
                    <p>${formData.summary || ""}</p>
                `;
                break;

            case "education":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Education</h2>
                    <p>${formData.education || "Add education details..."}</p>
                `;
                break;

            case "experience":
            case "leadershipExperience":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Experience</h2>
                    <p>${formData.experience || "Add work experience..."}</p>
                `;
                break;

            case "projects":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Projects</h2>
                    <p>${formData.projects || "Add projects..."}</p>
                `;
                break;

            case "skills":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Skills</h2>
                    <p>${formData.skills || "Add skills..."}</p>
                `;
                break;

            case "achievements":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Achievements</h2>
                    <p>${formData.achievements || "Add achievements..."}</p>
                `;
                break;

            case "boardMemberships":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Board Memberships</h2>
                    <p>${formData.boardMemberships || "Add board memberships..."}</p>
                `;
                break;

            case "certifications":
                sectionElement.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">Certifications</h2>
                    <p>${formData.certifications || "Add certifications..."}</p>
                `;
                break;

            default:
                break;
        }

        preview.appendChild(sectionElement);
    });
}