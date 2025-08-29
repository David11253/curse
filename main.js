async function loadCourses(category, lessons) {
    const container = document.getElementById("course-container");
  
    if (container) container.innerHTML = "";
  
    try {
        const response = await fetch("main.json");
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
  
        const courses = data[category];
  
        if (!courses || courses.length === 0) {
            if (container) {
                container.innerHTML = `<p style="text-align: center; color: #aaa; font-size: 1.1rem; padding: 20px;">Курсы в этой категории пока не найдены.</p>`;
            }
            return;
        }
  
        courses.forEach(course => {
            const card = document.createElement("div");
            card.className = "card";
  
            const imageSrc = course.image || 'https://placehold.co/200x200/3a3a5e/ffffff?text=Нет+Изображения';
  
            const cardHTML = `
                <img src="${imageSrc}" alt="${course.name}" width="200" height="200" onerror="this.onerror=null; this.src='https://placehold.co/200x200/3a3a5e/ffffff?text=Ошибка+загрузки';">
                <div class="text_in_card">
                    <p>
                        <span>${course.name} ${lessons} уроков</span>
                        <a href="${course.button}" download class="download-inline-icon">
                            <svg class="download-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 16L7 11l1.41-1.41L11 13.17V4h2v9.17l2.59-2.58L17 11l-5 5zm-5 4h10v2H7z"/></svg>
                        </a>
                    </p>
                </div>
            `;
            
            card.innerHTML = cardHTML;
  
            if (container) container.appendChild(card);
        });
  
    } catch (err) {
        console.error("Ошибка при загрузке курсов:", err);
        if (container) container.innerHTML = "";
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadCourses('minimum', 5);
  });