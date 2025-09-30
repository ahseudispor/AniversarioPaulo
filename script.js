// Lista de músicas - ADICIONE SUAS MÚSICAS AQUI
const playlist = [
  {
    file: "musica1.mp3"
  },
  {
    file: "musica2.mp3"
  },
  {
    file: "musica3.mp3"
  },
  {
    file: "musica4.mp3"
  },
  {
    file: "musica5.mp3"
  },
  {
    file: "musica6.mp3"
  }
];

// Lista de fotos do carrossel - ADICIONE SUAS FOTOS AQUI
const carouselImages = [
  {
    src: "foto1.jpg",
    caption: "Momentos"
  },
  {
    src: "foto2.jpg",
    caption: "Guerreiro  ⚔️"
  },
  {
    src: "foto3.jpg",
    caption: "Campeão 💪"
  }
];

let currentSongIndex = 0;
let currentImageIndex = 0;
let isPlaying = false;
let carouselInterval;

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const currentSongDisplay = document.getElementById('currentSong');
const progressFill = document.getElementById('progressFill');
const playlistContainer = document.getElementById('playlistContainer');
const carouselImage = document.getElementById('carouselImage');
const carouselCaption = document.getElementById('carouselCaption');
const carouselIndicatorsContainer = document.getElementById('carouselIndicators');

// ===== FUNÇÃO PARA EMBARALHAR PLAYLIST =====
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== FUNÇÕES DO CARROSSEL =====

// Inicializar indicadores do carrossel
function initCarouselIndicators() {
  carouselImages.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.onclick = () => goToSlide(index);
    carouselIndicatorsContainer.appendChild(indicator);
  });
}

// Atualizar imagem do carrossel
function updateCarousel() {
  const image = carouselImages[currentImageIndex];
  carouselImage.style.opacity = '0';
  
  setTimeout(() => {
    carouselImage.src = image.src;
    carouselCaption.textContent = image.caption;
    carouselImage.style.opacity = '1';
  }, 300);

  // Atualizar indicadores
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentImageIndex);
  });
}

// Mudar slide
function changeSlide(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex < 0) {
    currentImageIndex = carouselImages.length - 1;
  } else if (currentImageIndex >= carouselImages.length) {
    currentImageIndex = 0;
  }
  
  updateCarousel();
  resetCarouselTimer();
}

// Ir para slide específico
function goToSlide(index) {
  currentImageIndex = index;
  updateCarousel();
  resetCarouselTimer();
}

// Iniciar carrossel automático
function startCarousel() {
  carouselInterval = setInterval(() => {
    changeSlide(1);
  }, 4000); // Muda a cada 4 segundos
}

// Resetar timer do carrossel
function resetCarouselTimer() {
  clearInterval(carouselInterval);
  startCarousel();
}

// ===== FUNÇÕES DO PLAYER DE MÚSICA =====

// Inicializar playlist
function initPlaylist() {
  playlist.forEach((song, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    if (index === 0) item.classList.add('active');
    item.innerHTML = `
      <div class="song-name">${song.name || "Música " + (index + 1)}</div>
      <div class="song-artist">${song.artist || ""}</div>
    `;
    item.onclick = () => playSong(index);
    playlistContainer.appendChild(item);
  });
}

// Carregar música
function loadSong(index) {
  const song = playlist[index];
  audioPlayer.src = song.file;
  currentSongDisplay.textContent = `${song.name || "Música"} ${index + 1} ${song.artist ? "- " + song.artist : ""}`;
  
  // Atualizar item ativo na playlist
  document.querySelectorAll('.playlist-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// Tocar música
function playSong(index) {
  if (index !== undefined) {
    currentSongIndex = index;
    loadSong(index);
  }
  audioPlayer.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
}

// Pausar música
function pauseSong() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.textContent = '▶️';
}

// Toggle play/pause
function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

// Próxima música
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
}

// Música anterior
function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) playSong();
}

// Atualizar barra de progresso
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFill.style.width = progress + '%';
});

// Música terminou - tocar próxima
audioPlayer.addEventListener('ended', () => {
  nextSong();
});

// Toggle playlist
document.querySelector('.playlist-title').addEventListener('click', () => {
  document.querySelector('.playlist').classList.toggle('open');
});

// ===== FUNÇÕES GERAIS =====

// Iniciar site
function iniciarSite() {
  document.getElementById('introScreen').classList.add('hidden');
  // Tentar tocar música automaticamente
  const playPromise = audioPlayer.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      playBtn.textContent = '⏸️';
    }).catch(() => {
      // Autoplay bloqueado - usuário precisa clicar em play
      console.log('Autoplay bloqueado. Clique em play para iniciar a música.');
    });
  }
}

// Criar chuva de código
function criarCodeRain() {
  const symbols = ['<html>', '{...}', 'function()', 'const', 'if', 'while', '💪', '⚔️', '0101', 'async', '=>', 'class', 'return', '&&', '||'];
  const code = document.createElement('div');
  code.classList.add('code-rain');
  code.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  code.style.left = Math.random() * 100 + 'vw';
  code.style.animationDuration = (Math.random() * 3 + 5) + 's';
  document.body.appendChild(code);

  setTimeout(() => {
    code.remove();
  }, 8000);
}

// Inicializar quando página carregar
window.addEventListener('load', () => {
  shuffle(playlist); // 🔀 embaralha a playlist no início
  initPlaylist();
  loadSong(0);
  initCarouselIndicators();
  updateCarousel();
  startCarousel();
  setInterval(criarCodeRain, 300);
});
