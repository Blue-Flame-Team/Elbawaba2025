document.addEventListener('DOMContentLoaded', function() {
    const starRatingContainer = document.getElementById('star-rating');
    const voteCountElement = document.getElementById('vote-count');
    const stars = starRatingContainer.querySelectorAll('img');
    
    let hasVoted = false;
    let currentRating = 0;
    let votesCount = parseInt(voteCountElement.textContent);

    // دالة تحديث حالة النجوم
    function updateStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.src = '../assets/icons/star2.png';
                star.alt = 'نجمة مفعلة';
            } else {
                star.src = '../assets/icons/star.png';
                star.alt = 'نجمة غير مفعلة';
            }
        });
    }

    // إضافة معالج النقر لكل نجمة
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // التأكد من عدم التصويت أكثر من مرة
            if (!hasVoted) {
                // تحديد التقييم الحالي
                currentRating = index + 1;
                
                // زيادة عدد الأصوات
                votesCount++;
                voteCountElement.textContent = votesCount.toLocaleString('ar-EG');
                
                // تحديث حالة النجوم
                updateStars(currentRating);
                
                // منع التصويت مرة أخرى
                hasVoted = true;
                
                // اختياري: يمكنك إضافة رسالة شكر أو تنبيه بعد التصويت
                alert('شكرًا لتقييمك! لا يمكنك التصويت مرة أخرى.');
            } else {
                alert('لقد قمت بالتصويت مسبقًا. شكرًا لك!');
            }
        });
    });
}); 