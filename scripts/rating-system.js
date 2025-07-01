document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.rating-container');
    
    ratingContainers.forEach(container => {
        const starsContainer = container.querySelector('.stars-container');
        const stars = starsContainer.querySelectorAll('.star-icon');
        let currentRating = 0;

        // تحويل NodeList إلى Array
        const starsArray = Array.from(stars);
        
        // عكس ترتيب النجوم ليكون من اليمين لليسار
        starsArray.reverse();
        
        function activateStars(starElement) {
            // احصل على مؤشر النجمة في المصفوفة المعكوسة
            const index = starsArray.indexOf(starElement);
            const rating = index + 1;
            
            // تحديث حالة كل النجوم
            starsArray.forEach((star, i) => {
                if (i <= index) {
                    star.src = '../assets/icons/star2.png';
                    star.alt = 'نجمة مفعلة';
                    star.classList.add('active');
                } else {
                    star.src = '../assets/icons/star.png';
                    star.alt = 'نجمة غير مفعلة';
                    star.classList.remove('active');
                }
            });
            
            return rating;
        }

        starsArray.forEach(star => {
            // معالج النقر
            star.addEventListener('click', () => {
                currentRating = activateStars(star);
                console.log(`تم التقييم: ${currentRating} نجوم`);
            });

            // معالج التحويم
            star.addEventListener('mouseover', () => {
                activateStars(star);
            });
        });

        // عند مغادرة منطقة النجوم
        starsContainer.addEventListener('mouseleave', () => {
            if (currentRating === 0) {
                // إذا لم يتم اختيار تقييم، أزل تفعيل كل النجوم
                starsArray.forEach(star => {
                    star.src = '../assets/icons/star.png';
                    star.alt = 'نجمة غير مفعلة';
                    star.classList.remove('active');
                });
            } else {
                // إعادة تفعيل النجوم حسب آخر تقييم
                starsArray.forEach((star, i) => {
                    if (i < currentRating) {
                        star.src = '../assets/icons/star2.png';
                        star.alt = 'نجمة مفعلة';
                        star.classList.add('active');
                    } else {
                        star.src = '../assets/icons/star.png';
                        star.alt = 'نجمة غير مفعلة';
                        star.classList.remove('active');
                    }
                });
            }
        });
    });
}); 