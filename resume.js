document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const website = document.getElementById('website').value;
    const twitter = document.getElementById('twitter').value;
    const medium = document.getElementById('medium').value;
    const eduStartDate = document.getElementById('eduStartDate').value;
    const eduEndDate = document.getElementById('eduEndDate').value;
    const eduDetails = document.getElementById('eduDetails').value;
    const skills = document.getElementById('skills').value;
  
    const experienceGroups = document.querySelectorAll('.experience-group');
    const projectGroups = document.querySelectorAll('.project-group');
  
    const experiences = Array.from(experienceGroups).map(group => ({
      start: group.querySelector('.exp-start-date').value,
      end: group.querySelector('.exp-end-date').value,
      position: group.querySelector('.exp-position').value,
      description: group.querySelector('.exp-description').value,
    }));
  
    const projects = Array.from(projectGroups).map(group => ({
      name: group.querySelector('.project-name').value,
      duration: group.querySelector('.project-duration').value,
      description: group.querySelector('.project-description').value,
      tech: group.querySelector('.project-tech').value,
      url: group.querySelector('.project-url').value,
    }));
  
    const resumeHTML = `
      <div style="font-family: 'Segoe UI', sans-serif; padding: 20px;">
        <h1 style="font-size: 2rem; color: #003d62;">${fullName}</h1>
        <h2 style="font-size: 1.4rem; color: #333;">${jobTitle}</h2>
        <hr>
  
        <section>
          <h3>Contact</h3>
          <p>Email: ${email} | Phone: ${phone}</p>
          <p>
            ${linkedin ? `LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a><br>` : ""}
            ${github ? `GitHub: <a href="${github}" target="_blank">${github}</a><br>` : ""}
            ${website ? `Website: <a href="${website}" target="_blank">${website}</a><br>` : ""}
            ${twitter ? `Twitter: <a href="${twitter}" target="_blank">${twitter}</a><br>` : ""}
            ${medium ? `Medium: <a href="${medium}" target="_blank">${medium}</a><br>` : ""}
          </p>
        </section>
  
        <section>
          <h3>Experience</h3>
          ${experiences.map(exp => `
            <div>
              <strong>${exp.position}</strong><br>
              <em>${exp.start} - ${exp.end}</em>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </section>
  
        <section>
          <h3>Projects</h3>
          ${projects.map(proj => `
            <div>
              <strong>${proj.name}</strong> (${proj.duration})<br>
              <p>${proj.description}</p>
              <p><strong>Technologies:</strong> ${proj.tech}</p>
              ${proj.url ? `<p><a href="${proj.url}" target="_blank">${proj.url}</a></p>` : ''}
            </div>
          `).join('')}
        </section>
  
        <section>
          <h3>Education</h3>
          <p><strong>${eduDetails}</strong></p>
          <em>${eduStartDate} - ${eduEndDate}</em>
        </section>
  
        <section>
          <h3>Skills</h3>
          <p>${skills}</p>
        </section>
      </div>
    `;
  
    document.getElementById('resume-preview').innerHTML = resumeHTML;
    document.getElementById('downloadBtn').style.display = 'block';
  });
  
  document.getElementById('addExperience').addEventListener('click', () => {
    const container = document.createElement('div');
    container.className = 'experience-group';
    container.innerHTML = `
      <label>Start Date: <input type="date" class="exp-start-date" /></label>
      <label>End Date: <input type="date" class="exp-end-date" /></label>
      <label>Position & Company: <input type="text" class="exp-position" /></label>
      <label>Description: <textarea class="exp-description"></textarea></label>
    `;
    document.getElementById('resumeForm').insertBefore(container, document.getElementById('addExperience').nextSibling);
  });
  
  document.getElementById('addProject').addEventListener('click', () => {
    const container = document.createElement('div');
    container.className = 'project-group';
    container.innerHTML = `
      <label>Project Name: <input type="text" class="project-name" /></label>
      <label>Duration: <input type="text" class="project-duration" /></label>
      <label>Description: <textarea class="project-description"></textarea></label>
      <label>Technologies Used: <input type="text" class="project-tech" /></label>
      <label>Project URL: <input type="url" class="project-url" /></label>
    `;
    document.getElementById('resumeForm').insertBefore(container, document.getElementById('addProject').nextSibling);
  });
  
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const resume = document.getElementById('resume-preview');
    html2pdf().from(resume).save('resume.pdf');
  });
  