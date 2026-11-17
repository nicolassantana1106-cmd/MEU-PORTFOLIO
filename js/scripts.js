const initializePortfolio = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    const themeButton = document.querySelector('[data-theme-toggle]');
    if (themeButton && themeButton.dataset.initialized !== 'true') {
        themeButton.dataset.initialized = 'true';
        const updateThemeButton = () => {
            const isDark = document.body.classList.contains('dark');
            const label = isDark ? 'Tema claro' : 'Tema escuro';
            const action = isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro';
            const labelNode = themeButton.querySelector('.theme-label');
            if (labelNode) {
                labelNode.textContent = label;
            }
            themeButton.setAttribute('aria-label', action);
            themeButton.setAttribute('aria-pressed', String(isDark));
        };

        updateThemeButton();
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
            updateThemeButton();
        });
    }

    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menuDrawer = document.querySelector('[data-menu-drawer]');
    if (menuToggle && menuDrawer && menuToggle.dataset.initialized !== 'true') {
        menuToggle.dataset.initialized = 'true';

        const setMenuOpen = (isOpen) => {
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            menuToggle.classList.toggle('is-open', isOpen);
            menuDrawer.hidden = !isOpen;
            document.body.classList.toggle('menu-open', isOpen);
        };

        menuToggle.addEventListener('click', () => {
            setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
        });

        menuDrawer.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 860 && menuToggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
            }
        });
    }

    if (!document.body.dataset.scrollBound) {
        document.body.dataset.scrollBound = 'true';
        const updateHeader = () => {
            document.querySelector('.site-header')?.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    const form = document.getElementById('form-contato');
    if (!form || form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    const fields = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        mensagem: document.getElementById('mensagem'),
        area: document.getElementById('area')
    };

    const errors = {
        nome: document.getElementById('error-nome'),
        email: document.getElementById('error-email'),
        mensagem: document.getElementById('error-mensagem'),
        area: document.getElementById('error-area'),
        prioridade: document.getElementById('error-prioridade')
    };

    const formStatus = document.getElementById('form-status');

    const loadDraft = () => {
        const savedDraft = JSON.parse(localStorage.getItem('portfolio-form-draft') || '{}');

        if (savedDraft.nome) fields.nome.value = savedDraft.nome;
        if (savedDraft.email) fields.email.value = savedDraft.email;
        if (savedDraft.mensagem) fields.mensagem.value = savedDraft.mensagem;
        if (savedDraft.area) fields.area.value = savedDraft.area;
        if (savedDraft.prioridade) {
            form.querySelectorAll('input[name="prioridade"]').forEach((input) => {
                input.checked = input.value === savedDraft.prioridade;
            });
        }
    };

    const saveDraft = () => {
        const draft = {
            nome: fields.nome.value.trim(),
            email: fields.email.value.trim(),
            mensagem: fields.mensagem.value.trim(),
            area: fields.area.value,
            prioridade: form.querySelector('input[name="prioridade"]:checked')?.value || ''
        };

        localStorage.setItem('portfolio-form-draft', JSON.stringify(draft));
    };

    const setFieldError = (fieldName, message) => {
        const field = fields[fieldName];

        if (fieldName === 'prioridade') {
            const radios = form.querySelectorAll('input[name="prioridade"]');
            radios.forEach((radio) => {
                radio.classList.toggle('input-error', Boolean(message));
                radio.setAttribute('aria-invalid', String(Boolean(message)));
            });
        } else if (field) {
            field.classList.toggle('input-error', Boolean(message));
            field.setAttribute('aria-invalid', String(Boolean(message)));
        }

        const errorNode = errors[fieldName];
        if (errorNode) {
            errorNode.textContent = message || '';
        }
    };

    const validateField = (fieldName) => {
        if (fieldName === 'nome') {
            if (!fields.nome.value.trim()) {
                setFieldError('nome', 'Informe seu nome completo.');
                return false;
            }
            if (fields.nome.value.trim().length < 2) {
                setFieldError('nome', 'O nome deve ter pelo menos 2 caracteres.');
                return false;
            }
            setFieldError('nome', '');
            return true;
        }

        if (fieldName === 'email') {
            const emailValue = fields.email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValue) {
                setFieldError('email', 'Informe seu e-mail.');
                return false;
            }
            if (!emailPattern.test(emailValue)) {
                setFieldError('email', 'Digite um e-mail válido.');
                return false;
            }
            setFieldError('email', '');
            return true;
        }

        if (fieldName === 'mensagem') {
            if (!fields.mensagem.value.trim()) {
                setFieldError('mensagem', 'Escreva sua mensagem.');
                return false;
            }
            if (fields.mensagem.value.trim().length < 10) {
                setFieldError('mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
                return false;
            }
            setFieldError('mensagem', '');
            return true;
        }

        if (fieldName === 'area') {
            if (!fields.area.value) {
                setFieldError('area', 'Selecione uma área de interesse.');
                return false;
            }
            setFieldError('area', '');
            return true;
        }

        if (fieldName === 'prioridade') {
            const selected = form.querySelector('input[name="prioridade"]:checked');
            if (!selected) {
                setFieldError('prioridade', 'Escolha uma prioridade.');
                return false;
            }
            setFieldError('prioridade', '');
            return true;
        }

        return true;
    };

    const showFormStatus = (message, type) => {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.classList.remove('success', 'error');
        formStatus.classList.add(type === 'success' ? 'success' : 'error');
        formStatus.classList.add('is-visible');
    };

    loadDraft();

    form.querySelectorAll('input[name="prioridade"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            validateField('prioridade');
            saveDraft();
        });
    });

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        if (!field) return;

        field.addEventListener('input', () => {
            validateField(fieldName);
            saveDraft();
        });

        field.addEventListener('blur', () => {
            validateField(fieldName);
        });
    });

    if (fields.area) {
        fields.area.addEventListener('change', () => {
            validateField('area');
            saveDraft();
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = [
            validateField('nome'),
            validateField('email'),
            validateField('area'),
            validateField('prioridade'),
            validateField('mensagem')
        ].every(Boolean);

        if (!isValid) {
            showFormStatus('Preencha os campos corretamente antes de enviar.', 'error');
            return;
        }

        const payload = {
            nome: fields.nome.value.trim(),
            email: fields.email.value.trim(),
            area: fields.area.value,
            prioridade: form.querySelector('input[name="prioridade"]:checked').value,
            mensagem: fields.mensagem.value.trim(),
            enviadoEm: new Date().toISOString()
        };

        localStorage.setItem('portfolio-form-enviado', JSON.stringify(payload));
        localStorage.removeItem('portfolio-form-draft');
        form.reset();
        showFormStatus('Mensagem enviada com sucesso! Seus dados foram salvos no navegador.', 'success');
    });

    form.addEventListener('reset', () => {
        document.querySelectorAll('.field-error').forEach((node) => {
            node.textContent = '';
        });
        form.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
            field.setAttribute('aria-invalid', 'false');
        });
        document.querySelectorAll('.input-error').forEach((node) => {
            node.classList.remove('input-error');
        });
        localStorage.removeItem('portfolio-form-draft');
        formStatus?.classList.remove('is-visible');
    });
};

document.addEventListener('DOMContentLoaded', initializePortfolio);
window.addEventListener('components:loaded', initializePortfolio);
