// Quote.js
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const icon = this.querySelector('i');
                
                // Toggle active class on FAQ item
                faqItem.classList.toggle('active');
                
                // Toggle icon
                if (faqItem.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                    answer.style.maxHeight = '0';
                }
                
                // Close other open FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.querySelector('.faq-question i').classList.remove('fa-chevron-up');
                        item.querySelector('.faq-question i').classList.add('fa-chevron-down');
                        item.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
            });
        });
    }
    
    // Form Submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
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
            alert('Thank you for your quote request! We will contact you within 24 hours with your customized proposal.');
            this.reset();
        });
    }
});
