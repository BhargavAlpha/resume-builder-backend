function generateLatex(userData){
    const languages=userData.languages.map(lang=>lang.name);
    const tools=userData.tools.map(tool=>tool.name);
    const technologies=userData.technologies.map(technology=>technology.name);
      console.log("function called");


      let internship="";
      if(userData.internships.length>0){
        internship=`\\section{INTERNSHIP}
        \\vspace{-5pt}
        \\resumeSubHeadingListStart
          ${
            userData.internships.map(internship => `
              \\resumeSubheading
                {${internship.company} \\href{https://${internship.certificateLink}}{Link}}{${internship.startDate} -- ${internship.endDate}}
                {\\underline{${internship.role}}}{${internship.location}}
              \\resumeItemListStart
                \\resumeItem{\\normalsize{${internship.point1}}}
                \\resumeItem{\\normalsize{${internship.point2}}}
                \\resumeItem{\\normalsize{${internship.point3}}}
              \\resumeItemListEnd
            `).join('')
          }
        \\resumeSubHeadingListEnd
        \\vspace{-12pt}`
      }


      let technicalSkills="";
      if(languages.length>0 || tools.length>0 || technologies.length>0){
        technicalSkills=`\\section{TECHNICAL SKILLS}
        \\begin{itemize}[leftmargin=0.15in, label={}]
          \\small{\\item{ ` ;
            if(languages.length>0){
                technicalSkills+=`\\textbf{\\normalsize{Languages:}}{ \\normalsize{${languages.join(', ')}}} \\\\`;
            }
            if(tools.length>0){
              technicalSkills+=`\\textbf{\\normalsize{Developer Tools:}}{ \\normalsize{${tools.join(', ')}}} \\\\`;
            }
            if(technologies.length>0){
              technicalSkills+=`\\textbf{\\normalsize{Technologies/Frameworks:}}{\\normalsize{${technologies.join(', ')}}} \\\\`;
            }
         technicalSkills+=` }}
         \\end{itemize}
         \\vspace{-15pt}`
        }

        let extracurricular="";
        if(userData.extracurricular.length>0){
          extracurricular=`\\section{EXTRACURRICULAR}
          \\resumeSubHeadingListStart
            ${
              userData.extracurricular.map(activity => `
                \\resumeSubheading{${activity.name} \\href{https://${activity.certificateLink}}{\\raisebox{-0.1\\height} } }{${activity.startDate} -- ${activity.endDate}}{\\underline{${activity.role}}}{${activity.location}}
                \\resumeItemListStart
                  \\resumeItem{\\normalsize{${activity.description}}}
                  \\resumeItem{\\normalsize{Participation Certificate. \\href{https://${activity.certificateLink}}{\\raisebox{-0.1\\height} }}}
                \\resumeItemListEnd
              `).join('')
            }
          \\resumeSubHeadingListEnd
          \\vspace{-11pt}
      `
        }
        let certifications="";
        if(userData.certifications.length>0){
          certifications=`\\section{CERTIFICATIONS}
          ${
            userData.certifications.map(certification => `
              $\\sbullet[.75] \\hspace{0.1cm}$ {\\href{https://${certification.link}}{${certification.name}}} \\hspace{1.45cm}
            `).join('')
          }`
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
            \\small \\href{tel:+123445}{{\\raisebox{-0.1\\height}{\\underline{+123445}}} ~} \\href{mailto:bhargavvvenkat515@gmail.com}{{\\raisebox{-0.2\\height}{\\underline{bhargavvvenkat515@gmail.com}}} ~} \\href{https://linkedin.com}{{\\raisebox{-0.2\\height} {\\underline{LinkedIn}}} ~} \\href{https://github.com}{{\\raisebox{-0.2\\height} {\\underline{Github}}} ~}

      
            
            \\vspace{-8pt}
        \\end{center}
    
        %-----------EDUCATION-----------
        \\section{EDUCATION}
        \\resumeSubHeadingListStart
          ${
            userData.education.map(edu => `
              \\resumeSubheading
                {${edu.college}}{${edu.startDate} -- ${edu.endDate}}
                {${edu.degree} - \\textbf{CGPA} - \\textbf{${edu.cgpa}}} {${edu.city},${edu.country}}
            `).join('')
          }
        \\resumeSubHeadingListEnd
    
        %------RELEVANT COURSEWORK-------
        \\section{COURSEWORK / SKILLS}
        \\begin{multicols}{4}
            \\begin{itemize}[itemsep=-2pt, parsep=5pt]
                ${
                  userData.coursework.map(skill => `
                    \\item ${skill.name}
                  `).join('')
                }
            \\end{itemize}
        \\end{multicols}
        \\vspace*{2.0\\multicolsep}
    
        %-----------PROJECTS-----------
        \\section{PROJECTS}
        \\vspace{-5pt}
        \\resumeSubHeadingListStart
          ${
            userData.projects.map(project => `
              \\resumeProjectHeading
                {\\href{https://${project.link}}{\\textbf{\\large{\\underline{${project.name}}}} \\href{https://${project.link}}{\\raisebox{-0.1\\height} }} $|$ \\large{\\underline{${project.techStack}}} }{${project.date}}
              \\resumeItemListStart
                \\resumeItem{\\normalsize{${project.point1}}}
                \\resumeItem{\\normalsize{${project.point2}}}
                \\resumeItem{\\normalsize{${project.point3}}}
              \\resumeItemListEnd
              \\vspace{-13pt}
            `).join('')
          }
        \\resumeSubHeadingListEnd
        \\vspace{-12pt}
    
        %-----------EXPERIENCE-----------
         ${internship}
    
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
exports.generateLatex=generateLatex;