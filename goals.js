document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  const cards = document.querySelectorAll('.goal-card');

  cards.forEach(card => {
    const type = card.getAttribute('data-type');
    const section = card.querySelector('.goal-section');
    let goals = JSON.parse(localStorage.getItem(type + 'Goals')) || [];

    function renderGoals() {
      section.innerHTML = `
        <input type="text" placeholder="New goal...">
        <button>Add</button>
        <ul>${goals.map((g, i) =>
          `<li>
            <input type="checkbox" ${g.done ? 'checked' : ''} data-index="${i}">
            <span style="text-decoration:${g.done ? 'line-through' : 'none'}">${g.text}</span>
            <button class="delete" data-index="${i}">✖</button>
          </li>`
        ).join('')}</ul>
      `;

      section.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', e => {
          const idx = e.target.getAttribute('data-index');
          goals[idx].done = e.target.checked;
          localStorage.setItem(type + 'Goals', JSON.stringify(goals));
          renderGoals();
        });
      });

      section.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', e => {
          const idx = e.target.getAttribute('data-index');
          goals.splice(idx, 1);
          localStorage.setItem(type + 'Goals', JSON.stringify(goals));
          renderGoals();
        });
      });

      section.querySelector('button').addEventListener('click', () => {
        const input = section.querySelector('input[type="text"]');
        if (input.value.trim()) {
          goals.push({ text: input.value.trim(), done: false });
          localStorage.setItem(type + 'Goals', JSON.stringify(goals));
          input.value = '';
          renderGoals();
        }
      });
    }

    renderGoals();

    card.addEventListener('click', e => {
      if (e.target.closest('input') || e.target.closest('button') || e.target.closest('li')) return;
      section.style.display = section.style.display === 'block' ? 'none' : 'block';
    });
  });
});
