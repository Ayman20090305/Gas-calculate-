# Gas-calculate-
Calculate your gas used in few minutes 
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gas Calculate - حاسبة الغاز</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- الصفحة الرئيسية -->
    <div id="main-page" class="page">
        <div class="container">
            <header>
                <h1>Gas Calculate</h1>
                <p class="subtitle">حاسبة فاتورة الغاز الطبيعي</p>
            </header>
            
            <div class="services-grid">
                <div class="service-card" onclick="openPage('gas-page')">
                    <div class="service-icon">🔥</div>
                    <h2>حاسبة الغاز</h2>
                    <p>احسب فاتورة الغاز</p>
                </div>
                
                <div class="service-card" onclick="openPage('designer-page')">
                    <div class="service-icon">👤</div>
                    <h2>المصمم</h2>
                    <p>معلومات عن المصمم</p>
                </div>
            </div>
            
            <footer>
                <div class="footer-content">
                    <p>© 2025-2026 Gas Calculate - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    </div>

    <!-- صفحة حاسبة الغاز -->
    <div id="gas-page" class="page" style="display: none;">
        <div class="container">
            <header>
                <h1>حاسبة الغاز</h1>
                <p class="subtitle">احسب فاتورة الغاز الطبيعي</p>
            </header>
            
            <button class="btn btn-back" onclick="openPage('main-page')">← العودة للرئيسية</button>
            
            <div class="card">
                <h2 class="card-title">أدخل بيانات استهلاك الغاز</h2>
                
                <div class="input-group">
                    <label for="previousReadingGas">القراءة السابقة (م³)</label>
                    <input type="number" id="previousReadingGas" min="0" step="1" placeholder="أدخل القراءة السابقة">
                </div>
                
                <div class="input-group">
                    <label for="currentReadingGas">القراءة الحالية (م³)</label>
                    <input type="number" id="currentReadingGas" min="0" step="1" placeholder="أدخل القراءة الحالية">
                </div>

                <div class="input-group">
                    <label for="monthsCount">عدد الشهور *</label>
                    <input type="number" id="monthsCount" min="1" step="1" value="1" placeholder="أدخل عدد الشهور" required>
                </div>

                <div class="input-group">
                    <label for="bankInstallment">قسط البنك (جنيه)</label>
                    <input type="number" id="bankInstallment" min="0" step="0.01" value="0" placeholder="أدخل قيمة قسط البنك">
                </div>
                
                <button class="btn" onclick="calculateGasBill()">احسب الفاتورة</button>
            </div>
            
            <div class="result" id="gas-result">
                <div class="total-bill-main" id="totalBillGasMain">المجموع: 0.00 جنيه</div>
                
                <button class="btn btn-details" onclick="toggleGasDetails()" id="detailsBtn">عرض التفاصيل</button>
                
                <div class="bill-details" id="gas-details" style="display: none;">
                    <h2 class="result-title">تفاصيل فاتورة الغاز</h2>
                    
                    <div class="bill-details-grid">
                        <div class="bill-item">
                            <div class="bill-item-title">القراءة السابقة</div>
                            <div class="bill-item-value" id="previousReadingGasDisplay">0 م³</div>
                        </div>
                        <div class="bill-item">
                            <div class="bill-item-title">القراءة الحالية</div>
                            <div class="bill-item-value" id="currentReadingGasDisplay">0 م³</div>
                        </div>
                        <div class="bill-item">
                            <div class="bill-item-title">عدد الشهور</div>
                            <div class="bill-item-value" id="monthsCountDisplay">1 شهر</div>
                        </div>
                        <div class="bill-item">
                            <div class="bill-item-title">الاستهلاك الكلي</div>
                            <div class="bill-item-value" id="actualConsumptionGas">0 م³</div>
                        </div>
                        <div class="bill-item">
                            <div class="bill-item-title">طريقة الحساب</div>
                            <div class="bill-item-value" id="calculationMethod">شهري</div>
                        </div>
                        <div class="bill-item">
                            <div class="bill-item-title">قسط البنك</div>
                            <div class="bill-item-value" id="bankInstallmentDisplay">0.00 جنيه</div>
                        </div>
                    </div>

                    <div class="tier-details" id="gas-tier-details">
                        <div class="tier-item">
                            <span class="tier-name">الشريحة الأولى (0-30 م³)</span>
                            <span class="tier-value" id="tier1Details">0 م³ × 5 جنيه = 0 جنيه</span>
                        </div>
                        <div class="tier-item">
                            <span class="tier-name">الشريحة الثانية (31-60 م³)</span>
                            <span class="tier-value" id="tier2Details">0 م³ × 7 جنيه = 0 جنيه</span>
                        </div>
                        <div class="tier-item">
                            <span class="tier-name">الشريحة الثالثة (أكثر من 60 م³)</span>
                            <span class="tier-value" id="tier3Details">0 م³ × 9 جنيه = 0 جنيه</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2 class="card-title">أسعار الغاز</h2>
                <button class="btn btn-prices" onclick="toggleGasPrices()" id="pricesBtn">عرض أسعار الغاز</button>
                
                <div class="prices-content" id="gas-prices" style="display: none;">
                    <table class="pricing-table">
                        <thead>
                            <tr>
                                <th>الاستهلاك (م³)</th>
                                <th>السعر (جنيه)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0 - 30</td>
                                <td>5.00</td>
                            </tr>
                            <tr>
                                <td>31 - 60</td>
                                <td>7.00</td>
                            </tr>
                            <tr>
                                <td>أكثر من 60</td>
                                <td>9.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <footer>
                <div class="footer-content">
                    <p>© 2025-2026 Gas Calculate - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    </div>

    <!-- صفحة المصمم -->
    <div id="designer-page" class="page" style="display: none;">
        <div class="container">
            <header>
                <h1>المصمم</h1>
                <p class="subtitle">معلومات عن مصمم التطبيق</p>
            </header>
            
            <button class="btn btn-back" onclick="openPage('main-page')">← العودة للرئيسية</button>
            
            <div class="card">
                <h2 class="card-title">معلومات المصمم</h2>
                
                <div class="designer-profile">
                    <!-- تم إزالة خانة رفع الصورة -->
                    
                    <div class="designer-info">
                        <div class="info-item">
                            <span class="info-label">الاسم:</span>
                            <span class="info-value">ايمن أسامة فؤاد عبد المجيد</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">العمر:</span>
                            <span class="info-value">16 سنة</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">الإيميل:</span>
                            <span class="info-value">aymanosamafouad111@gmail.com</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">رقم الهاتف:</span>
                            <span class="info-value">01152955661</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer>
                <div class="footer-content">
                    <p>© 2025-2026 Gas Calculate - جميع الحقوق محفوظة</p>
                </div>
            </footer>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>