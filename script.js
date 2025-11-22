// الدوال الخاصة بالتنقل بين الصفحات
function openPage(pageId) {
    // إخفاء جميع الصفحات
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).style.display = 'block';
    
    // إذا كانت صفحة الغاز، نمسح النتائج
    if (pageId === 'gas-page') {
        document.getElementById('gas-result').style.display = 'none';
        document.getElementById('gas-details').style.display = 'none';
        document.getElementById('detailsBtn').textContent = 'عرض التفاصيل';
        document.getElementById('gas-prices').style.display = 'none';
        document.getElementById('pricesBtn').textContent = 'عرض أسعار الغاز';
    }
}

function clearInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        if (input.id !== 'monthsCount' && input.id !== 'bankInstallment') {
            input.value = '';
        }
    });
    // إعادة عدد الشهور إلى 1
    document.getElementById('monthsCount').value = '1';
    // إعادة قسط البنك إلى 0
    document.getElementById('bankInstallment').value = '0';
}

// دالة لعرض/إخفاء التفاصيل
function toggleGasDetails() {
    const detailsSection = document.getElementById('gas-details');
    const detailsBtn = document.getElementById('detailsBtn');
    
    if (detailsSection.style.display === 'none') {
        detailsSection.style.display = 'block';
        detailsBtn.textContent = 'إخفاء التفاصيل';
    } else {
        detailsSection.style.display = 'none';
        detailsBtn.textContent = 'عرض التفاصيل';
    }
}

// دالة لعرض/إخفاء أسعار الغاز
function toggleGasPrices() {
    const pricesSection = document.getElementById('gas-prices');
    const pricesBtn = document.getElementById('pricesBtn');
    
    if (pricesSection.style.display === 'none') {
        pricesSection.style.display = 'block';
        pricesBtn.textContent = 'إخفاء الأسعار';
    } else {
        pricesSection.style.display = 'none';
        pricesBtn.textContent = 'عرض أسعار الغاز';
    }
}

// دوال حساب الفواتير
function calculateGasBill() {
    // الحصول على قيم المدخلات
    const previousReading = parseFloat(document.getElementById('previousReadingGas').value) || 0;
    const currentReading = parseFloat(document.getElementById('currentReadingGas').value) || 0;
    const monthsCount = parseInt(document.getElementById('monthsCount').value) || 1;
    const bankInstallment = parseFloat(document.getElementById('bankInstallment').value) || 0;
    
    // التحقق من صحة البيانات
    if (currentReading < previousReading) {
        alert('القراءة الحالية يجب أن تكون أكبر من أو تساوي القراءة السابقة');
        return;
    }
    
    if (currentReading === 0 && previousReading === 0) {
        alert('يرجى إدخال قراءات صحيحة');
        return;
    }
    
    if (monthsCount < 1) {
        alert('عدد الشهور يجب أن يكون 1 على الأقل');
        return;
    }
    
    // حساب الاستهلاك الفعلي
    const actualConsumption = currentReading - previousReading;
    const totalConsumption = actualConsumption;
    
    let gasBill = 0;
    let calculationMethod = "شهري";
    
    if (monthsCount === 1) {
        // الطريقة العادية (شهر واحد)
        calculationMethod = "شهري";
        
        if (totalConsumption > 0) {
            if (totalConsumption <= 30) {
                gasBill = totalConsumption * 5.00;
                document.getElementById('tier1Details').textContent = totalConsumption + ' م³ × 5 جنيه = ' + (totalConsumption * 5).toFixed(2) + ' جنيه';
                document.getElementById('tier2Details').textContent = '0 م³ × 7 جنيه = 0 جنيه';
                document.getElementById('tier3Details').textContent = '0 م³ × 9 جنيه = 0 جنيه';
            } else if (totalConsumption <= 60) {
                const tier1 = 30 * 5.00;
                const tier2 = (totalConsumption - 30) * 7.00;
                gasBill = tier1 + tier2;
                document.getElementById('tier1Details').textContent = '30 م³ × 5 جنيه = ' + tier1.toFixed(2) + ' جنيه';
                document.getElementById('tier2Details').textContent = (totalConsumption - 30) + ' م³ × 7 جنيه = ' + tier2.toFixed(2) + ' جنيه';
                document.getElementById('tier3Details').textContent = '0 م³ × 9 جنيه = 0 جنيه';
            } else {
                const tier1 = 30 * 5.00;
                const tier2 = 30 * 7.00;
                const tier3 = (totalConsumption - 60) * 9.00;
                gasBill = tier1 + tier2 + tier3;
                document.getElementById('tier1Details').textContent = '30 م³ × 5 جنيه = ' + tier1.toFixed(2) + ' جنيه';
                document.getElementById('tier2Details').textContent = '30 م³ × 7 جنيه = ' + tier2.toFixed(2) + ' جنيه';
                document.getElementById('tier3Details').textContent = (totalConsumption - 60) + ' م³ × 9 جنيه = ' + tier3.toFixed(2) + ' جنيه';
            }
        }
    } else {
        // الطريقة التجميعية (أكثر من شهر)
        calculationMethod = "تجميعي على " + monthsCount + " شهور";
        
        const totalTier1 = monthsCount * 30;
        const totalTier2 = monthsCount * 30;
        
        let remainingConsumption = totalConsumption;
        let tier1Consumption = 0;
        let tier2Consumption = 0;
        let tier3Consumption = 0;
        
        // الشريحة الأولى
        if (remainingConsumption > 0) {
            tier1Consumption = Math.min(remainingConsumption, totalTier1);
            gasBill += tier1Consumption * 5.00;
            remainingConsumption -= tier1Consumption;
        }
        
        // الشريحة الثانية
        if (remainingConsumption > 0) {
            tier2Consumption = Math.min(remainingConsumption, totalTier2);
            gasBill += tier2Consumption * 7.00;
            remainingConsumption -= tier2Consumption;
        }
        
        // الشريحة الثالثة
        if (remainingConsumption > 0) {
            tier3Consumption = remainingConsumption;
            gasBill += tier3Consumption * 9.00;
        }
        
        // عرض تفاصيل الشرائح
        document.getElementById('tier1Details').textContent = tier1Consumption + ' م³ × 5 جنيه = ' + (tier1Consumption * 5).toFixed(2) + ' جنيه';
        document.getElementById('tier2Details').textContent = tier2Consumption + ' م³ × 7 جنيه = ' + (tier2Consumption * 7).toFixed(2) + ' جنيه';
        document.getElementById('tier3Details').textContent = tier3Consumption + ' م³ × 9 جنيه = ' + (tier3Consumption * 9).toFixed(2) + ' جنيه';
    }
    
    // إضافة 20 جنية رسوم
    gasBill += 20;
    
    // إضافة قسط البنك
    const totalWithBank = gasBill + bankInstallment;
    
    // عرض النتائج في العناصر الجديدة
    document.getElementById('previousReadingGasDisplay').textContent = previousReading + ' م³';
    document.getElementById('currentReadingGasDisplay').textContent = currentReading + ' م³';
    document.getElementById('monthsCountDisplay').textContent = monthsCount + ' شهر';
    document.getElementById('actualConsumptionGas').textContent = totalConsumption + ' م³';
    document.getElementById('calculationMethod').textContent = calculationMethod;
    document.getElementById('bankInstallmentDisplay').textContent = bankInstallment.toFixed(2) + ' جنيه';
    
    // عرض الناتج النهائي في العنصر الرئيسي
    const totalBillElement = document.getElementById('totalBillGasMain');
    totalBillElement.innerHTML = 'المجموع: ' + totalWithBank.toFixed(2) + ' جنيه<br>' +
                                '<small style="color: #666; font-size: 0.9rem;">(يشمل 20 جنية رسوم إضافية + ' + bankInstallment.toFixed(2) + ' جنيه قسط بنك)</small>';
    
    // إخفاء التفاصيل في البداية
    document.getElementById('gas-details').style.display = 'none';
    document.getElementById('detailsBtn').textContent = 'عرض التفاصيل';
    
    // إظهار قسم النتائج
    document.getElementById('gas-result').style.display = 'block';
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إظهار الصفحة الرئيسية عند التحميل
    openPage('main-page');
});