let allClubs = [];

document.addEventListener("DOMContentLoaded", () => {
  loadClubs();
});

function loadClubs() {
  // Mengambil data dari JSON statis sebagai pengganti PHP
  fetch("clubs.json")
    .then((res) => {
      if (!res.ok) throw new Error("Gagal mengambil data");
      return res.json();
    })
    .then((clubs) => {
      allClubs = clubs;
      displayClubs(allClubs);
    })
    .catch((err) => {
      console.error("Gagal memuat data klub:", err);
      document.getElementById("search-result").innerHTML =
        '<p class="error-msg">Gagal memuat data klub. Pastikan file clubs.json tersedia.</p>';
    });
}

function searchClub() {
  const keyword = document.getElementById("search").value.toLowerCase();
  
  const filtered = allClubs
    .filter((club) => 
      club.name.toLowerCase().includes(keyword) || 
      club.country.toLowerCase().includes(keyword)
    )
    .sort((a, b) =>
      a.name
        .trim()
        .toLowerCase()
        .localeCompare(b.name.trim().toLowerCase())
    );

  displayClubs(filtered);
}

function displayClubs(clubs) {
  const resultContainer = document.getElementById("search-result");
  
  if (!clubs || clubs.length === 0) {
    resultContainer.innerHTML =
      '<div class="no-results"><i class="fas fa-search-minus" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i><p>Klub tidak ditemukan.</p></div>';
    return;
  }

  const html = clubs
    .map(
      (club) => `
    <div class="club-card">
      <div class="club-image-wrapper">
        <img src="${club.logo || "https://via.placeholder.com/150?text=No+Logo"}" 
             class="club-image" 
             alt="${club.name}"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/150?text=No+Logo'" />
      </div>
      <div class="club-info">
        <div class="club-name">${club.name}</div>
        <div class="club-meta">
          <span><i class="fas fa-globe"></i> ${club.country}</span>
          <span><i class="fas fa-calendar-alt"></i> ${club.year}</span>
        </div>
      </div>
    </div>
    `
    )
    .join("");

  resultContainer.innerHTML = html;
}