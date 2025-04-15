document.getElementById("addExperience").addEventListener("click", () => {
  const group = document.createElement("div");
  group.className = "experience-group";
  group.innerHTML = `
    <label>Start Date: <input type="date" class="exp-start-date"></label>
    <label>End Date: <input type="date" class="exp-end-date"></label>
    <label>Position & Company: <input type="text" class="exp-position"></label>
    <label>Description: <textarea class="exp-description"></textarea></label>
  `;
  document.getElementById("resumeForm").insertBefore(group, document.getElementById("addExperience"));
});

document.getElementById("addProject").addEventListener("click", () => {
  const group = document.createElement("div");
  group.className = "project-group";
  group.innerHTML = `
    <label>Project Name: <input type="text" class="project-name"></label>
    <label>Duration: <input type="text" class="project-duration"></label>
    <label>Description: <textarea class="project-description"></textarea></label>
    <label>Technologies Used: <input type="text" class="project-tech"></label>
    <label>Project URL: <input type="url" class="project-url" placeholder="https://project-link.com"></label>
  `;
  document.getElementById("resumeForm").insertBefore(group, document.getElementById("addProject"));
});

// Format date from YYYY-MM-DD to Month Year
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Get display name for social media links
function getSocialMediaName(url) {
  if (!url) return "";
  
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("twitter.com")) return "Twitter";
  if (url.includes("medium.com")) return "Medium";
  
  return "Website";
}

const resumeForm = document.getElementById("resumeForm");
const preview = document.getElementById("resume-preview");
const downloadBtn = document.getElementById("downloadBtn");

resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value;
  const title = document.getElementById("jobTitle").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  
  // Social Media Links
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const website = document.getElementById("website").value;
  const twitter = document.getElementById("twitter").value;
  const medium = document.getElementById("medium").value;
  
  // Create social links array
  const socialLinks = [];
  if (linkedin) socialLinks.push({ url: linkedin, name: "LinkedIn" });
  if (github) socialLinks.push({ url: github, name: "GitHub" });
  if (website) socialLinks.push({ url: website, name: "Portfolio" });
  if (twitter) socialLinks.push({ url: twitter, name: "Twitter" });
  if (medium) socialLinks.push({ url: medium, name: "Medium" });

  const expStartDates = [...document.getElementsByClassName("exp-start-date")].map(input => input.value);
  const expEndDates = [...document.getElementsByClassName("exp-end-date")].map(input => input.value);
  const expPositions = [...document.getElementsByClassName("exp-position")].map(input => input.value);
  const expDescriptions = [...document.getElementsByClassName("exp-description")].map(input => input.value);

  const projectNames = [...document.getElementsByClassName("project-name")].map(input => input.value);
  const projectDurations = [...document.getElementsByClassName("project-duration")].map(input => input.value);
  const projectDescriptions = [...document.getElementsByClassName("project-description")].map(input => input.value);
  const projectTechs = [...document.getElementsByClassName("project-tech")].map(input => input.value);
  const projectUrls = [...document.getElementsByClassName("project-url")].map(input => input.value);

  const eduStartDate = document.getElementById("eduStartDate").value;
  const eduEndDate = document.getElementById("eduEndDate").value;
  const eduDetails = document.getElementById("eduDetails").value;

  const skills = document.getElementById("skills").value.split(",").map(s => s.trim()).filter(s => s);

  preview.innerHTML = `
    <div class="resume">
      <h1>${name}</h1>
      <h2>${title}</h2>
      <div class="contact">
        <span>${email}</span>
        <span>${phone}</span>
      </div>
      
      ${socialLinks.length > 0 ? `
      <div class="social-links">
        ${socialLinks.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join("")}
      </div>
      ` : ''}

      <h3>Experience</h3>
      ${expStartDates.map((startDate, i) => {
        if (!expPositions[i]) return "";
        const duration = `${formatDate(startDate)} - ${expEndDates[i] ? formatDate(expEndDates[i]) : 'Present'}`;
        return `
          <div class="experience-entry">
            <p><strong>${duration}</strong></p>
            <p>${expPositions[i]}</p>
            <p>${expDescriptions[i]}</p>
          </div>`;
      }).join("")}

      <h3>Projects</h3>
      ${projectNames.map((name, i) => {
        if (!name) return "";
        const techs = projectTechs[i].split(",").map(tech => 
          `<span class="tech-tag">${tech.trim()}</span>`
        ).join("");
        
        const projectTitle = projectUrls[i] 
          ? `<div class="project-title">
               <strong>${name}</strong>
               <a href="${projectUrls[i]}" target="_blank">View Project</a>
             </div>`
          : `<p><strong>${name}</strong></p>`;
          
        return `
          <div class="project-entry">
            ${projectTitle}
            ${projectDurations[i] ? `<p>${projectDurations[i]}</p>` : ''}
            <p>${projectDescriptions[i]}</p>
            <div class="tech-tags">${techs}</div>
          </div>`;
      }).join("")}

      <h3>Education</h3>
      <div class="education-entry">
        <p><strong>${formatDate(eduStartDate)} - ${eduEndDate ? formatDate(eduEndDate) : 'Present'}</strong></p>
        <p>${eduDetails}</p>
      </div>

      <h3>Skills</h3>
      <div class="skills-grid">
        ${skills.map(skill => `<span>${skill}</span>`).join("")}
      </div>
    </div>
  `;

  downloadBtn.style.display = "block";
});

downloadBtn.addEventListener("click", () => {
  const element = document.getElementById("resume-preview");
  html2pdf().from(element).save("resume.pdf");
});