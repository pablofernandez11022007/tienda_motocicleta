// Verificar si ya hay sesión activa
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = 'index.html';
    }
});

// Manejar envío del formulario
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validaciones
    if (!email || !password) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Mostrar loading
    showLoading(true);
    
    // Simulación de login (en producción conectar con backend/Supabase)
    setTimeout(() => {
        // Obtener usuarios registrados
        const users = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
        
        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            showLoading(false);
            showMessage('Email o contraseña incorrectos', 'error');
            return;
        }
        
        // Guardar sesión
        const userData = {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            direccion: user.direccion
        };
        
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        
        if (remember) {
            localStorage.setItem('rememberUser', JSON.stringify(userData));
        }
        
        showMessage('¡Inicio de sesión exitoso!', 'success');
        
        // Redireccionar
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensaje
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    if (type === 'error') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Enter para submit
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});