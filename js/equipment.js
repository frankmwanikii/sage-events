/**
 * Equipment List Request Page JavaScript
 * Handles form submissions and category navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle category card clicks
    const categoryLinks = document.querySelectorAll('.category-card a');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetForm = document.querySelector(targetId);
                
                // Hide all category forms first
                document.querySelectorAll('.category-form').forEach(form => {
                    form.classList.remove('active');
                });
                
                // Show the selected category form
                if (targetForm) {
                    targetForm.classList.add('active');
                    window.scrollTo({
                        top: targetForm.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Close category forms
    const closeFormButtons = document.querySelectorAll('.close-category-form');
    if (closeFormButtons.length > 0) {
        closeFormButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.category-form').classList.remove('active');
            });
        });
    }

    // Main equipment form submission
    const equipmentForm = document.getElementById('equipmentForm');
    if (equipmentForm) {
        equipmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // Here we're just showing a success message
            alert('Thank you for your request! We will email you our full equipment list within 24 hours.');
            this.reset();
        });
    }

    // Category form submissions
    const categoryForms = document.querySelectorAll('.category-request-form');
    if (categoryForms.length > 0) {
        categoryForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Form validation
                let isValid = true;
                const requiredFields = this.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Get the category name from the hidden input
                const category = this.querySelector('[name="category"]').value;
                const categoryName = category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                // In a real implementation, you would send the form data to a server
                alert(`Thank you for your ${categoryName} equipment list request! We will email you the catalog shortly.`);
                this.reset();
                this.closest('.category-form').classList.remove('active');
            });
        });
    }
});