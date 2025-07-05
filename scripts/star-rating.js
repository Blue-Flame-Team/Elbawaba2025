// نظام التقييم بالنجوم
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // اختيار قسم التقييم
        const ratingSection = document.querySelector('section.social-share-section');
        if (!ratingSection) return;

        // اختيار حاوية النجوم
        const starContainer = ratingSection.querySelector('div[style*="display: flex; align-items: center; gap: 8px;"]');
        if (!starContainer) return;

        // اختيار النجوم
        const starElements = Array.from(starContainer.querySelectorAll('img[src*="star.png"], img[src*="star2.png"]'));
        const votesCountElement = starContainer.querySelector('span:last-child');

        // التأكد من وجود النجوم وعداد الأصوات
        if (starElements.length === 0 || !votesCountElement) return;

        // متغيرات التقييم
        let currentRating = 0;
        let votesCount = parseInt(votesCountElement.textContent) || 0;

        // دالة تحديث النجوم
        function updateStars(rating) {
            starElements.forEach((star, index) => {
                // تبديل مسارات الصور بين المفعلة وغير المفعلة
                star.src = index < rating ? '../assets/icons/star.png' : '../assets/icons/star2.png';
                star.alt = index < rating ? 'نجمة غير مفعلة' : 'نجمة مفعلة';
            });
        }

        // إضافة معالجات الأحداث للنجوم
        starElements.forEach((star, index) => {
            // التمرير فوق النجوم
            star.addEventListener('mouseenter', () => {
                starElements.forEach((s, i) => {
                    // تبديل مسارات الصور عند التمرير
                    s.src = i <= index ? '../assets/icons/star.png' : '../assets/icons/star2.png';
                    s.alt = i <= index ? 'نجمة غير مفعلة' : 'نجمة مفعلة';
                });
            });

            // مغادرة منطقة النجوم
            star.addEventListener('mouseleave', () => {
                updateStars(currentRating);
            });

            // النقر على النجمة
            star.addEventListener('click', () => {
                // تحديث التقييم الحالي
                currentRating = index + 1;
                
                // تحديث النجوم
                updateStars(currentRating);
                
                // زيادة عدد الأصوات
                votesCount++;
                votesCountElement.textContent = votesCount;

                // إنشاء رسالة الشكر
                const thankYouMessage = document.createElement('div');
                thankYouMessage.textContent = 'شكراً لتقييمك!';
                thankYouMessage.style.cssText = `
                    color: #00a19a;
                    margin-right: 10px;
                    font-family: 'Droid Arabic Kufi', sans-serif;
                    font-size: 14px;
                `;
                starContainer.appendChild(thankYouMessage);

                // إزالة رسالة الشكر بعد 3 ثوانٍ
                setTimeout(() => {
                    starContainer.removeChild(thankYouMessage);
                }, 3000);

                // طباعة معلومات التقييم بشكل واضح
                console.log('%c🌟 نظام التقييم 🌟', 'color: #00a19a; font-weight: bold;');
                console.log(`%cتقييمك: ${currentRating} من 5 نجوم ⭐`, 'color: #ffc107;');
                console.log(`%cعدد الأصوات الكلي: ${votesCount}`, 'color: #158885;');
                
                // طباعة حالة كل نجمة
                console.log('%cحالة النجوم:', 'color: #333;');
                starElements.forEach((s, i) => {
                    const starStatus = i < currentRating ? '❌ غير مفعلة' : '✅ مفعلة';
                    console.log(`النجمة ${i + 1}: ${starStatus}`);
                });
            });
        });

        // طباعة معلومات أولية
        console.log('%c🌟 نظام التقييم مستعد 🌟', 'color: #00a19a; font-weight: bold;');
        console.log(`عدد النجوم: ${starElements.length}`);
    });
})(); 