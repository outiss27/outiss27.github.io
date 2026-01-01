// ============ SLIDESHOW ============
let slideIndex = 1;
mostrarSlide(slideIndex);

// Cambio automático cada 4 segundos
setInterval(() => {
    cambiarSlide(1);
}, 4000);

function cambiarSlide(n) {
    mostrarSlide(slideIndex += n);
}

function slideActual(n) {
    mostrarSlide(slideIndex = n);
}

function mostrarSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Ocultar todos los slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remover active de todos los dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Mostrar el slide actual
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

// ============ CONTADOR REGRESIVO ============
function actualizarContador() {
    const ahora = new Date().getTime();
    const anoNuevo = new Date('January 1, 2026 00:00:00').getTime();
    const diferencia = anoNuevo - ahora;
    
    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
        document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<h2>¡Feliz Año Nuevo!</h2>';
        lanzarFuegosArtificiales();
    }
}

// Actualizar cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();

// ============ CONFETI ANIMADO ============
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Confeti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Crear partículas de confeti
const confetis = [];
for (let i = 0; i < 100; i++) {
    confetis.push(new Confeti());
}

function animarConfeti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetis.forEach(confeti => {
        confeti.update();
        confeti.draw();
    });
    
    requestAnimationFrame(animarConfeti);
}

animarConfeti();

// Función para agregar más confeti cuando llegue el año nuevo
function lanzarFuegosArtificiales() {
    for (let i = 0; i < 200; i++) {
        confetis.push(new Confeti());
    }
}