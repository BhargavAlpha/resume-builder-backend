function generateLatex(userData) {
  console.log("function called");
  let coursework = "";
  if (userData.coursework) {
    coursework = `\\section{COURSEWORK / SKILLS}
        \\begin{multicols}{4}
            \\begin{itemize}[itemsep=-2pt, parsep=5pt]
                ${userData.coursework
                  .map(
                    (skill) => `
                    \\item ${skill.name}
                  `
                  )
                  .join("")}
            \\end{itemize}
        \\end{multicols}
        \\vspace*{2.0\\multicolsep}`;
  }
  let projects = "";
  if (userData.projects.length > 0) {
    projects = `
    %-----------PROJECTS-----------
    \\section{PROJECTS}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
      ${userData.projects
        .map(
          (project) => `
          \\resumeProjectHeading
          {\\textbf{\\large{\\underline{${project.name}}}} $|$ {\\underline{${
            project.techStack
          }}}}{${project.date}}
          \\resumeItemListStart
            ${project.description
              .filter((point) => point.trim() !== "")
              .map(
                (point, index) =>
                  point ? `\\resumeItem{\\normalsize{${point}}}` : ""
              )
              .join("")}
            ${
              project.link
                ? `\\resumeItem{\\href{${
                    project.link.startsWith("https://")
                      ? project.link
                      : "https://" + project.link
                  }}{\\textcolor{accent}{\\underline{\\normalsize{Live site here}}}}}`
                : ""
            }
          \\resumeItemListEnd
          \\vspace{-13pt}
        `
        )
        .join("")}
    \\vspace{13pt}
    \\resumeSubHeadingListEnd
    \\vspace{-12pt}
    `;
    
  }

  let internship = "";
  if (userData.internships.length > 0) {
    internship = `\\section{EXPERIENCE}
  \\resumeSubHeadingListStart
    ${userData.internships
      .map(
        (internship) => `
        \\resumeSubheading
        {${internship.company}${
          internship.certificateLink
            ? ` \\href{${
                internship.certificateLink.startsWith("https://")
                  ? internship.certificateLink
                  : "https://" + internship.certificateLink
              }}{\\textcolor{accent}{\\underline{\\normalsize{Link}}}}`
            : ""
        }}{${internship.startDate} -- ${internship.endDate}}
        {\\underline{${internship.role}}}${internship.location ? ` {${internship.location}}` : '{}'}         
        \\resumeItemListStart
          ${internship.description
            .filter((point) => point.trim() !== "")
            .map((point) => `\\resumeItem{\\normalsize{${point}}}`)
            .join("")}
        \\resumeItemListEnd
      `
      )
      .join("")}
  \\resumeSubHeadingListEnd
  \\vspace{-12pt}`;

  }

  let technicalSkills = "";
  if (userData.technicalSkills) {
    if (languages.length > 0 || tools.length > 0 || technologies.length > 0) {
      technicalSkills = `\\section{TECHNICAL SKILLS}
        \\begin{itemize}[leftmargin=0.15in, label={}]
          \\small{\\item{ `;
      if (languages.length > 0) {
        technicalSkills += `\\textbf{\\normalsize{Languages:}}{ \\normalsize{${languages.join(
          ", "
        )}}} \\\\`;
      }
      if (tools.length > 0) {
        technicalSkills += `\\textbf{\\normalsize{Developer Tools:}}{ \\normalsize{${tools.join(
          ", "
        )}}} \\\\`;
      }
      if (technologies.length > 0) {
        technicalSkills += `\\textbf{\\normalsize{Technologies/Frameworks:}}{\\normalsize{${technologies.join(
          ", "
        )}}} \\\\`;
      }
      technicalSkills += ` }}
         \\end{itemize}
         \\vspace{-15pt}`;
    }
  }

  let extracurricular = "";
  if (userData.extracurricular) {
    if (userData.extracurricular.length > 0) {
      extracurricular = `\\section{EXTRACURRICULAR}
          \\resumeSubHeadingListStart
            ${userData.extracurricular
              .map(
                (activity) => `
              \\resumeSubheading{${activity.name} ${
                  activity.certificateLink
                    ? `\\href{${
                        activity.certificateLink.startsWith("https://")
                          ? activity.certificateLink
                          : "https://" + activity.certificateLink
                      }}{\\includegraphics[height=1em]{link_icon}\\raisebox{+0.4\\height}}`
                    : ""
                }}{${activity.startDate} -- ${activity.endDate}}{\\underline{${
                  activity.role
                }}}{${activity.location}}
                \\resumeItemListStart
                  \\resumeItem{\\normalsize{${activity.description}}}
                \\resumeItemListEnd
              `
              )
              .join("")}
          \\resumeSubHeadingListEnd
          \\vspace{-11pt}
      `;
    }
  }
  let certifications = "";
  if (userData.certifications) {
    if (userData.certifications.length > 0) {
      certifications = `\\section{CERTIFICATIONS}
          ${userData.certifications
            .map(
              (certification) => `
              $\\sbullet[.75] \\hspace{0.1cm}$ {{${
                certification.name
              }}}\\hspace{0.04cm} ${
                certification.link
                  ? `\\href{${
                      certification.link.startsWith("https://")
                        ? certification.link
                        : "https://" + certification.link
                    }}{\\includegraphics[height=1em]{link_icon}}`
                  : ""
              }
            `
            )
            .join("")}`;
    }
  }
  const latexContent = `
      %-------------------------
      % Resume in Latex
      % Author : Abey George
      % Based off of: https://github.com/sb2nov/resume
      % License : MIT
      %------------------------
      
      \\documentclass[letterpaper,11pt]{article}
      
      \\usepackage{latexsym}
      \\usepackage[empty]{fullpage}
      \\usepackage{titlesec}
      \\usepackage[usenames,dvipsnames]{color}
      \\usepackage{verbatim}
      \\usepackage{enumitem}
      \\usepackage[hidelinks]{hyperref}
      \\usepackage[english]{babel}
      \\usepackage{tabularx}
      \\usepackage{multicol}
      \\usepackage{graphicx}
      \\setlength{\\multicolsep}{-3.0pt}
      \\setlength{\\columnsep}{-1pt}
      \\input{glyphtounicode}
      
      \\RequirePackage{tikz}
      \\RequirePackage{xcolor}
      \\usepackage{tikz}
      \\usetikzlibrary{svg.path}
      
      
      \\definecolor{cvblue}{HTML}{0E5484}
      \\definecolor{black}{HTML}{130810}
      \\definecolor{darkcolor}{HTML}{0F4539}
      \\definecolor{cvgreen}{HTML}{3BD80D}
      \\definecolor{taggreen}{HTML}{00E278}
      \\definecolor{SlateGrey}{HTML}{2E2E2E}
      \\definecolor{LightGrey}{HTML}{666666}
      \\colorlet{name}{black}
      \\colorlet{tagline}{darkcolor}
      \\colorlet{heading}{darkcolor}
      \\colorlet{headingrule}{cvblue}
      \\colorlet{accent}{darkcolor}
      \\colorlet{emphasis}{SlateGrey}
      \\colorlet{body}{LightGrey}
      
      
      
      %----------FONT OPTIONS----------
      % sans-serif
      % \\usepackage[sfdefault]{FiraSans}
      % \\usepackage[sfdefault]{roboto}
      % \\usepackage[sfdefault]{noto-sans}
      % \\usepackage[default]{sourcesanspro}
      
      % serif
      % \\usepackage{CormorantGaramond}
      % \\usepackage{charter}
      
      
      % \\pagestyle{fancy}
      % \\fancyhf{}  % clear all header and footer fields
      % \\fancyfoot{}
      % \\renewcommand{\\headrulewidth}{0pt}
      % \\renewcommand{\\footrulewidth}{0pt}
      
      % Adjust margins
      \\addtolength{\\oddsidemargin}{-0.6in}
      \\addtolength{\\evensidemargin}{-0.5in}
      \\addtolength{\\textwidth}{1.19in}
      \\addtolength{\\topmargin}{-.7in}
      \\addtolength{\\textheight}{1.4in}
      
      \\urlstyle{same}
      
      \\raggedbottom
      \\raggedright
      \\setlength{\\tabcolsep}{0in}
      
      % Sections formatting
      \\titleformat{\\section}{
        \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
      }{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
      
      % Ensure that generate pdf is machine readable/ATS parsable
      \\pdfgentounicode=1
      
      %-------------------------
      % Custom commands
      \\newcommand{\\resumeItem}[1]{
        \\item\\small{
          {#1 \\vspace{-2pt}}
        }
      }
      
      \\newcommand{\\classesList}[4]{
          \\item\\small{
              {#1 #2 #3 #4 \\vspace{-2pt}}
        }
      }
      
      \\newcommand{\\resumeSubheading}[4]{
        \\vspace{-2pt}\\item
          \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
            \\textbf{\\large#1} & \\textbf{\\small #2} \\\\
            \\textit{\\large#3} & \\textit{\\small #4} \\\\
            
          \\end{tabular*}\\vspace{-7pt}
      }
      
      \\newcommand{\\resumeSubSubheading}[2]{
          \\item
          \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
            \\textit{\\small#1} & \\textit{\\small #2} \\\\
          \\end{tabular*}\\vspace{-7pt}
      }
      
      
      \\newcommand{\\resumeProjectHeading}[2]{
          \\item
          \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
            \\small#1 & \\textbf{\\small #2}\\\\
          \\end{tabular*}\\vspace{-7pt}
      }
      
      \\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
      
      \\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
      \\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
      
      \\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
      \\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
      \\newcommand{\\resumeItemListStart}{\\begin{itemize}}
      \\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
      
      
      \\newcommand{\\sbullet}[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}
      
      %-------------------------------------------
      %%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%
      
      
      \\begin{document}
      
      %----------HEADING----------
    
        \\begin{center}
            {\\Huge \\scshape ${userData.name}} \\\\ \\vspace{1pt}
            ${userData.city},${userData.state} \\\\ \\vspace{1pt}
            \\small 
           ${
             userData.phone
               ? `\\href{tel:+${userData.phone}}{\\includegraphics[height=1em]{phone_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{+${userData.phone}}}`
               : ""
           } ~
          ${
            userData.email
              ? `\\href{mailto:${userData.email}}{\\includegraphics[height=1em]{email_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{${userData.email}}}`
              : ""
          } ~ 
            ${
              userData.linkedin
                ? `\\href{${
                    userData.linkedin.startsWith("https://")
                      ? userData.linkedin
                      : "https://" + userData.linkedin
                  }}{\\includegraphics[height=1em]{linkedin_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{\\href{${
                    userData.linkedin.startsWith("https://")
                      ? userData.linkedin
                      : "https://" + userData.linkedin
                  }}{LinkedIn}}}`
                : ""
            } ~
            ${
              userData.github
                ? `\\href{${
                    userData.github.startsWith("https://")
                      ? userData.github
                      : "https://" + userData.github
                  }}{\\includegraphics[height=1em]{github_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{\\href{${
                    userData.github.startsWith("https://")
                      ? userData.github
                      : "https://" + userData.github
                  }}{Github}}}`
                : ""
            } ~
${
  userData.hackerrank
    ? `\\href{${
        userData.hackerrank.startsWith("https://")
          ? userData.hackerrank
          : "https://" + userData.hackerrank
      }}{\\includegraphics[height=1em]{hackerrank_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{\\href{${
        userData.hackerrank.startsWith("https://")
          ? userData.hackerrank
          : "https://" + userData.hackerrank
      }}{Hackerrank}}}`
    : ""
} ~
${
  userData.codeforces
    ? `\\href{${
        userData.codeforces.startsWith("https://")
          ? userData.codeforces
          : "https://" + userData.codeforces
      }}{\\includegraphics[height=1em]{codeforces_icon}}\\hspace{0.2em}\\raisebox{+0.4\\height}{\\underline{\\href{${
        userData.codeforces.startsWith("https://")
          ? userData.codeforces
          : "https://" + userData.codeforces
      }}{Codeforces}}}`
    : ""
} ~

            \\vspace{-8pt}
        \\end{center}
    
        %-----------EDUCATION-----------
        \\section{EDUCATION}
        \\resumeSubHeadingListStart
          ${userData.education
            .map(
              (edu) => `
              \\resumeSubheading
                {${edu.college}}{${edu.startDate} -- ${edu.endDate}}
                {${edu.degree} - \\textbf{CGPA} - \\textbf{${edu.cgpa}}} {${edu.city}}
            `
            )
            .join("")}
        \\resumeSubHeadingListEnd
    
        %------RELEVANT COURSEWORK-------
        ${coursework}

        %-----------EXPERIENCE-----------
         ${internship}
    
        %-----------PROJECTS-----------
        ${projects}
    
        
    
        %-----------PROGRAMMING SKILLS-----------
        ${technicalSkills}
    
        %-----------INVOLVEMENT---------------
        ${extracurricular}
        %-----------CERTIFICATIONS---------------
        ${certifications}
    
        \\end{document}
      `;

  return latexContent;
}
exports.generateLatex = generateLatex;
