// Verificar si ya hay sesión activa
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = 'index.html';
    }
});

// Manejar envío del formulario
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const direccion = document.getElementById('direccion').value.trim();
    const terms = document.getElementById('terms').checked;
    
    // Validaciones
    if (!nombre || !email || !password || !confirmPassword) {
        showMessage('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un email válido', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (!terms) {
        showMessage('Debes aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Mostrar loading
    showLoading(true);
    
    // Simulación de registro (en producción conectar con backend/Supabase)
    setTimeout(() => {
        // Obtener usuarios registrados
        let users = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
        
        // Verificar si el email ya existe
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            showLoading(false);
            showMessage('Este email ya está registrado. Intenta iniciar sesión', 'error');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            nombre: nombre,
            apellido: apellido || '',
            email: email,
            password: password, // En producción usar hash
            telefono: telefono || '',
            direccion: direccion || '',
            fechaRegistro: new Date().toISOString()
        };
        
        // Guardar usuario
        users.push(newUser);
        sessionStorage.setItem('registeredUsers', JSON.stringify(users));
        
        showLoading(false);
        showMessage('¡Cuenta creada exitosamente! Redirigiendo al login...', 'success');
        
        // Redireccionar al login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 1500);
});

// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const iconId = fieldId === 'password' ? 'toggleIcon1' : 'toggleIcon2';
    const toggleIcon = document.getElementById(iconId);
    
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
    
    // Scroll al mensaje
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
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

// Validación en tiempo real de contraseñas
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = '#F44336';
    } else {
        this.style.borderColor = '';
    }
});

// Validación de email en tiempo real
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    
    if (email && !validateEmail(email)) {
        this.style.borderColor = '#F44336';
    } else {
        this.style.borderColor = '';
    }
});