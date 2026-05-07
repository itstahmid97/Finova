// --- Initial State ---
let appData = {
    currentMonthStr: getLocalMonthStr(), 
    categories: ['House Rent', 'Pocket Money', 'Food & Groceries', 'Transport'],
    records: [],
    archives: {},
    mealData: {
        currentMonth: getLocalMonthStr(),
        lastUpdateDate: getLocalDateStr(), 
        dailyLogs: {} 
    }
};

let chartInst = null;
let currentUser = null; 
const colorsList = ['#111111', '#ff6a00', '#4b5563', '#f97316', '#9ca3af', '#ea580c'];

// --- GUIDELINES LOGIC (Expanded) ---
let guideLang = 'en';
const guideText = {
    en: {
        title: "<i class='fa-solid fa-book-open text-orange'></i> Comprehensive User Guidelines",
        btn: "Read in বাংলা",
        content: `
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">🎯 Core Purpose of Finova</h4>
                <p>Finova is a highly secure, smart expense and meal tracking application. It saves your personal financial data to the cloud in real-time, ensuring you never lose your data, even if you switch devices or clear your browser cache. You must log in using your Google account to utilize the syncing features securely.</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">1️⃣ Dashboard (Adding Data)</h4>
                <p>The dashboard is your main control center. Here, you can log your daily expenses. Enter the exact date, select a relevant category from the list, input the amount, and add a descriptive note. The interactive line chart gives you a real-time visual representation of your daily spending habits throughout the current month. You can also easily add or remove custom categories using the <strong>'Manage Segments'</strong> tool below the chart.</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">2️⃣ Meal Tracker System</h4>
                <p>Finova automatically adds <strong>2 meals for every new day</strong> to reduce your manual work! If you eat more or fewer meals on a specific date, click the 'Meals' badge in the navigation bar, select the date from the calendar, and adjust the count using the (+ / -) buttons or edit the exact number directly using the Edit button.</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">3️⃣ View Data (Edit & PDF Export)</h4>
                <p>Navigate to the 'View Data' tab to analyze your expenses category by category. If you make a mistake while logging data, don't worry! You can click the <strong>'Edit'</strong> button next to any past transaction to correct the amount or note. The total cost will automatically recalculate. You can also download a beautifully formatted PDF report of your selected segment to share or print.</p>
            </div>
            
            <div>
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">4️⃣ Past Months Archive</h4>
                <p>Finova is smart enough to handle month transitions automatically. When a new month begins, your previous month's transactions, total cost, and total meals are safely packaged and moved to the 'Past Months' archive. You can visit this tab anytime to review your financial history from older months without cluttering your current dashboard.</p>
            </div>
        `
    },
    bn: {
        title: "<i class='fa-solid fa-book-open text-orange'></i> ব্যবহার নির্দেশিকা",
        btn: "Read in English",
        content: `
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">🎯 অ্যাপের মূল উদ্দেশ্য</h4>
                <p>Finova হলো আপনার দৈনন্দিন খরচ এবং মিল (meal) ক্লাউডে সুরক্ষিতভাবে ট্র্যাক করার একটি অত্যন্ত স্মার্ট প্ল্যাটফর্ম। ডিভাইস পরিবর্তন করলেও বা ব্রাউজার ক্লিয়ার করলেও আপনার ডেটা কখনো হারাবে না। রিয়েল-টাইম ক্লাউড সিঙ্ক ফিচারটি ব্যবহার করার জন্য আপনাকে প্রথমে আপনার গুগল অ্যাকাউন্ট দিয়ে লগইন করতে হবে।</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">1️⃣ ড্যাশবোর্ড (ডেটা যুক্ত করা)</h4>
                <p>এটি আপনার প্রধান স্ক্রিন। এখানে আপনি প্রতিদিনের খরচ যুক্ত করতে পারবেন। সঠিক তারিখ, ক্যাটাগরি, অ্যামাউন্ট এবং খরচের বিবরণ দিয়ে 'Save Record' এ ক্লিক করুন। ডানদিকের লাইন চার্টটি আপনাকে পুরো মাসের খরচের একটি সুন্দর গ্রাফিক্যাল ধারণা দেবে। আপনার প্রয়োজন অনুযায়ী 'Manage Segments' অপশন থেকে নতুন ক্যাটাগরি যুক্ত বা পুরনো ক্যাটাগরি ডিলিট করতে পারবেন।</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">2️⃣ স্মার্ট মিল ট্র্যাকার</h4>
                <p>আপনার কাজ সহজ করার জন্য, নতুন দিন শুরু হলেই Finova অটোমেটিক <strong>২টি মিল অ্যাড করে নেয়!</strong> যদি কোনো দিন মিল কম বা বেশি হয়, তবে উপরের 'Meals' বাটনে ক্লিক করে ক্যালেন্ডার থেকে নির্দিষ্ট তারিখ সিলেক্ট করুন। এরপর (+ / -) বাটন দিয়ে অথবা 'Edit' বাটনে চেপে সঠিক সংখ্যাটি বসিয়ে দিন।</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">3️⃣ ডেটা ভিউ (এডিট এবং PDF ডাউনলোড)</h4>
                <p>'View Data' পেজে গিয়ে আপনি ক্যাটাগরি অনুযায়ী খরচের হিস্ট্রি দেখতে পারবেন। ডেটা যুক্ত করার সময় কোনো ভুল হলে চিন্তার কিছু নেই! যেকোনো রেকর্ডের পাশে থাকা <strong>'Edit'</strong> বাটনে ক্লিক করে আপনি অ্যামাউন্ট বা নোট পরিবর্তন করতে পারবেন, এবং টোটাল অ্যামাউন্ট সাথে সাথেই অটো-আপডেট হয়ে যাবে। চাইলে এই পেজ থেকে এক ক্লিকেই PDF রিপোর্টও ডাউনলোড করতে পারবেন।</p>
            </div>
            
            <div>
                <h4 class="text-black" style="font-size: 1.2rem; margin-bottom: 8px;">4️⃣ পুরনো মাসের আর্কাইভ</h4>
                <p>মাস শেষ হওয়া নিয়ে আপনাকে কোনো চিন্তা করতে হবে না। নতুন মাস শুরু হওয়ার সাথে সাথেই আগের মাসের সব রেকর্ড, টোটাল খরচ এবং মোট মিল অটোমেটিক 'Past Months' আর্কাইভে সুরক্ষিতভাবে সেভ হয়ে যায়। পুরনো যেকোনো মাসের হিসেব দেখতে চাইলে এই পেজে চলে আসুন।</p>
            </div>
        `
    }
};

function toggleGuideLang() {
    guideLang = guideLang === 'en' ? 'bn' : 'en';
    renderGuideline();
}

function renderGuideline() {
    const titleEl = document.getElementById('guide-title');
    const btnEl = document.getElementById('guide-lang-btn');
    const contentEl = document.getElementById('guide-content');
    
    if(titleEl && btnEl && contentEl) {
        titleEl.innerHTML = guideText[guideLang].title;
        btnEl.innerText = guideText[guideLang].btn;
        contentEl.innerHTML = guideText[guideLang].content;
    }
}

// --- Mobile Menu Logic ---
function toggleMobileMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}
window.toggleMobileMenu = toggleMobileMenu; // Making sure it works everywhere

function getLocalDateStr(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function getLocalMonthStr(d = new Date()) {
    return getLocalDateStr(d).slice(0, 7);
}

// --- Firebase Auth & Guards ---
document.addEventListener("DOMContentLoaded", () => {
    init(); 
    renderGuideline(); 
    
    setTimeout(() => {
        if(window.firebaseAuth) {
            window.firebaseOnAuth(window.firebaseAuth, async (user) => {
                const authBtn = document.getElementById('auth-btn');
                if (user) {
                    currentUser = user;
                    authBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
                    authBtn.className = 'btn-delete'; 
                    
                    try {
                        const docSnap = await window.firebaseGetDoc(window.firebaseDoc(window.firebaseDb, "users", user.uid));
                        if (docSnap.exists()) {
                            appData = { ...appData, ...docSnap.data().finovaData };
                            if(!appData.mealData.dailyLogs) appData.mealData.dailyLogs = {};
                        }
                    } catch(e) { console.error("Data load error:", e); }
                    
                    init(); 
                } else {
                    currentUser = null;
                    authBtn.innerHTML = '<i class="fa-solid fa-user"></i> Login';
                    authBtn.className = 'btn-black';
                }
            });
        }
    }, 1000);
});

function checkAuth() {
    if (!currentUser) {
        alert("Please login first to add or modify your data!");
        openLoginModal();
        return false;
    }
    return true;
}

function openLoginModal() { 
    document.getElementById('auth-modal').classList.add('show'); 
    document.getElementById('nav-menu').classList.remove('active'); 
}
function closeLoginModal() { document.getElementById('auth-modal').classList.remove('show'); }

async function toggleAuth() {
    if (currentUser) {
        if(confirm("Do you want to logout?")) {
            await window.firebaseSignOut(window.firebaseAuth);
            location.reload();
        }
    } else {
        openLoginModal();
    }
}

async function doGoogleLogin() {
    try {
        await window.firebaseSignIn(window.firebaseAuth, window.googleProvider);
        closeLoginModal();
    } catch (e) {
        console.error("Firebase Login Error:", e);
        alert("Error: " + e.message); 
    }
}

// --- Initialization ---
function init() {
    const localData = localStorage.getItem('finovaMasterV4');
    if(localData) {
        const parsed = JSON.parse(localData);
        appData = { ...appData, ...parsed }; 
        if(!appData.mealData.dailyLogs) appData.mealData.dailyLogs = {};
    }
    
    const now = new Date();
    document.getElementById('record-date').value = getLocalDateStr(now);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('record-time').value = `${hours}:${minutes}`;

    checkMonthArchiving();
    processAutoMeals();
    renderApp();
}

async function saveData() {
    renderApp();
    if (!currentUser) return; 
    
    localStorage.setItem('finovaMasterV4', JSON.stringify(appData));
    if (window.firebaseDb) {
        try {
            await window.firebaseSetDoc(window.firebaseDoc(window.firebaseDb, "users", currentUser.uid), { finovaData: appData });
        } catch (e) { console.error("Cloud Sync Error", e); }
    }
}

// --- Edit Feature ---
function editRecord(id) {
    if(!checkAuth()) return; 
    const record = appData.records.find(r => r.id === id);
    if (!record) return;

    const newAmt = prompt(`Edit Amount for ${record.category}:`, record.amount);
    if (newAmt === null || newAmt === "" || isNaN(newAmt)) return;

    const newNote = prompt("Edit Note:", record.note || "");
    record.amount = parseFloat(newAmt);
    record.note = newNote;

    saveData();
    renderSegmentDetails();
}

function deleteRecord(id) {
    if(!checkAuth()) return; 
    if(confirm("Delete this transaction?")) {
        appData.records = appData.records.filter(r => r.id !== id);
        saveData();
        renderSegmentDetails();
    }
}

// --- Navigation & Modals ---
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId).classList.add('active-page');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    // Close mobile menu on click
    document.getElementById('nav-menu').classList.remove('active');

    if(pageId === 'segment-view-page') renderSegmentDetails();
    if(pageId === 'history-page') renderHistoryDropdown();
}

function toggleMealModal() {
    const modal = document.getElementById('meal-modal');
    modal.classList.toggle('show');
    if(modal.classList.contains('show')) {
        document.getElementById('meal-date-selector').value = getLocalDateStr();
        renderMealHistory();
    }
    // Close mobile menu on click
    document.getElementById('nav-menu').classList.remove('active');
}

// --- Auto Meal Logic ---
function processAutoMeals() {
    const todayStr = getLocalDateStr();
    const realMonth = getLocalMonthStr();

    if (appData.mealData.currentMonth !== realMonth) {
        appData.mealData.currentMonth = realMonth;
        appData.mealData.lastUpdateDate = todayStr;
        appData.mealData.dailyLogs = {}; 
        appData.mealData.dailyLogs[todayStr] = 2; 
    } else {
        let currDateObj = new Date(appData.mealData.lastUpdateDate);
        const todayObj = new Date(todayStr);

        while(currDateObj <= todayObj) {
            let dStr = getLocalDateStr(currDateObj);
            if(appData.mealData.dailyLogs[dStr] === undefined) {
                appData.mealData.dailyLogs[dStr] = 2; 
            }
            currDateObj.setDate(currDateObj.getDate() + 1);
        }
        appData.mealData.lastUpdateDate = todayStr;
    }
    calculateTotalMeals();
}

function calculateTotalMeals() {
    let total = 0;
    for(let date in appData.mealData.dailyLogs) { total += appData.mealData.dailyLogs[date]; }
    document.getElementById('nav-meal-count').innerText = total;
    
    const modalTotalElem = document.getElementById('modal-meal-grand-total');
    if(modalTotalElem) modalTotalElem.innerText = total;
    saveData();
}

function modifySelectedMeal(val) {
    if(!checkAuth()) return; 
    const dateVal = document.getElementById('meal-date-selector').value;
    if(!dateVal) return alert("Select a date from the calendar first!");
    
    if(appData.mealData.dailyLogs[dateVal] === undefined) { appData.mealData.dailyLogs[dateVal] = 2; }
    appData.mealData.dailyLogs[dateVal] += val;
    if(appData.mealData.dailyLogs[dateVal] < 0) appData.mealData.dailyLogs[dateVal] = 0;
    
    calculateTotalMeals();
    renderMealHistory();
}

function editExactMealCount(dateStr) {
    if(!checkAuth()) return; 
    const currentVal = appData.mealData.dailyLogs[dateStr] || 0;
    const newVal = prompt(`Set exact meal count for ${dateStr}:`, currentVal);
    
    if(newVal !== null && newVal.trim() !== "") {
        const num = parseInt(newVal);
        if(!isNaN(num) && num >= 0) {
            appData.mealData.dailyLogs[dateStr] = num;
            calculateTotalMeals();
            renderMealHistory();
        } else {
            alert("Please enter a valid number!");
        }
    }
}

function renderMealHistory() {
    const container = document.getElementById('meal-history-list');
    container.innerHTML = '';
    const dates = Object.keys(appData.mealData.dailyLogs).sort().reverse();
    
    dates.forEach(date => {
        let count = appData.mealData.dailyLogs[date];
        container.innerHTML += `
            <div class="meal-log-item">
                <div class="flex-row">
                    <div style="background: #f3f4f6; padding: 8px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; width: 40px; text-align: center;" class="text-orange">${count}</div>
                    <div><strong class="text-black">${date}</strong></div>
                </div>
                <button class="btn-edit-meal" onclick="editExactMealCount('${date}')"><i class="fa-solid fa-pen"></i> Edit</button>
            </div>
        `;
    });
}

// --- Archiving Month ---
function checkMonthArchiving() {
    const realCurrentMonth = getLocalMonthStr();
    if (appData.currentMonthStr !== realCurrentMonth) {
        let monthTotal = 0; let catTotals = {};
        appData.records.forEach(r => { monthTotal += r.amount; catTotals[r.category] = (catTotals[r.category] || 0) + r.amount; });
        let oldMealTotal = 0;
        for(let date in appData.mealData.dailyLogs) { oldMealTotal += appData.mealData.dailyLogs[date]; }

        appData.archives[appData.currentMonthStr] = { total: monthTotal, categoryBreakdown: catTotals, records: [...appData.records], totalMeals: oldMealTotal };
        appData.currentMonthStr = realCurrentMonth;
        appData.records = [];
        saveData();
    }
}

// --- Data Add & Segments ---
function addRecord() {
    if(!checkAuth()) return; 
    const dateVal = document.getElementById('record-date').value;
    const timeVal = document.getElementById('record-time').value;
    const cat = document.getElementById('record-category').value;
    const amt = parseFloat(document.getElementById('record-amount').value);
    const note = document.getElementById('record-note').value;

    if(!dateVal || !timeVal || !cat || isNaN(amt) || amt <= 0) return alert('Please fill correctly.');

    const dateTimeStr = `${dateVal}T${timeVal}`;
    const recordMonthStr = dateVal.slice(0, 7); 
    const newRecord = { id: Date.now(), datetime: dateTimeStr, category: cat, amount: amt, note: note };

    if (recordMonthStr !== appData.currentMonthStr) {
        if (!appData.archives[recordMonthStr]) { appData.archives[recordMonthStr] = { total: 0, categoryBreakdown: {}, records: [], totalMeals: 0 }; }
        appData.archives[recordMonthStr].records.push(newRecord);
        appData.archives[recordMonthStr].total += amt;
        appData.archives[recordMonthStr].categoryBreakdown[cat] = (appData.archives[recordMonthStr].categoryBreakdown[cat] || 0) + amt;
        saveData();
        return alert(`Success! Saved to past archive: ${recordMonthStr}`);
    }

    appData.records.push(newRecord);
    document.getElementById('record-amount').value = '';
    document.getElementById('record-note').value = '';
    saveData();
}

function addSegment() {
    if(!checkAuth()) return; 
    const input = document.getElementById('new-segment-input');
    const newCat = input.value.trim();
    if(newCat !== "" && !appData.categories.includes(newCat)) {
        appData.categories.push(newCat);
        input.value = '';
        saveData();
    }
}

function deleteSegment(catName) {
    if(!checkAuth()) return; 
    if(confirm(`Remove "${catName}"? (Past money stays safe)`)) {
        appData.categories = appData.categories.filter(c => c !== catName);
        saveData();
    }
}

// --- Render Main ---
function renderApp() {
    const catHtml = appData.categories.map(c => `<option value="${c}">${c}</option>`).join('');
    document.getElementById('record-category').innerHTML = catHtml;
    document.getElementById('view-segment-select').innerHTML = catHtml;

    document.getElementById('segment-list-ui').innerHTML = appData.categories.map(c => `
        <div class="segment-item">
            <span>${c}</span>
            <button class="btn-delete" onclick="deleteSegment('${c}')" style="padding: 6px 10px;"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');

    let totalCost = 0;
    appData.records.forEach(r => totalCost += r.amount);
    document.getElementById('total-cost').innerText = `৳ ${totalCost.toLocaleString()}`;
    updateMultiLineChart();
}

function formatDateTimeUI(isoStr) {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' | ' + 
           d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function renderSegmentDetails() {
    const selectedCat = document.getElementById('view-segment-select').value;
    if(!selectedCat) return;

    document.getElementById('view-segment-name').innerText = selectedCat;
    
    let segTotal = 0;
    const filteredRecords = appData.records.filter(r => r.category === selectedCat).sort((a,b) => new Date(b.datetime) - new Date(a.datetime));
    const timeline = document.getElementById('segment-timeline');
    timeline.innerHTML = '';

    filteredRecords.forEach(r => {
        segTotal += r.amount;
        timeline.innerHTML += `
            <div class="timeline-item" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <div class="timeline-date"><i class="fa-regular fa-clock"></i> ${formatDateTimeUI(r.datetime)}</div>
                    <div class="timeline-amount text-orange">৳ ${r.amount.toLocaleString()}</div>
                    <div style="color:#6b7280; font-size:0.9rem; margin-top:6px; font-weight: 500;"><i class="fa-solid fa-pen-clip"></i> ${r.note || '-'}</div>
                </div>
                <div class="flex-row">
                    <button class="btn-edit-small" onclick="editRecord(${r.id})"><i class="fa-solid fa-pen"></i> Edit</button>
                    <button class="btn-delete" style="padding: 5px 8px;" onclick="deleteRecord(${r.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    if(filteredRecords.length === 0) timeline.innerHTML = '<p style="text-align:center; padding: 20px; color:#888;">No transactions found.</p>';
    document.getElementById('view-segment-total').innerText = `৳ ${segTotal.toLocaleString()}`;
}

// --- History Archive ---
function renderHistoryDropdown() {
    const select = document.getElementById('archive-month-select');
    const archiveKeys = Object.keys(appData.archives).sort().reverse();
    const btn = document.getElementById('delete-month-btn');
    
    if(archiveKeys.length === 0) {
        select.innerHTML = '<option value="">No History Available</option>';
        document.getElementById('archive-month-title').innerText = "Empty Archive";
        document.getElementById('archive-total-cost').innerText = "৳ 0";
        document.getElementById('archive-total-meals').innerText = "0";
        document.getElementById('archive-breakdown').innerHTML = "";
        btn.style.display = 'none';
        return;
    }

    select.innerHTML = archiveKeys.map(k => {
        const [year, month] = k.split('-');
        const dateObj = new Date(year, month - 1);
        return `<option value="${k}">${dateObj.toLocaleString('default', { month: 'long', year: 'numeric' })}</option>`;
    }).join('');

    btn.style.display = 'block';
    renderArchiveDetails();
}

function renderArchiveDetails() {
    const selectedKey = document.getElementById('archive-month-select').value;
    if(!selectedKey) return;
    const [year, month] = selectedKey.split('-');
    const dateObj = new Date(year, month - 1);
    document.getElementById('archive-month-title').innerText = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });

    const data = appData.archives[selectedKey];
    document.getElementById('archive-total-cost').innerText = `৳ ${data.total.toLocaleString()}`;
    document.getElementById('archive-total-meals').innerText = data.totalMeals || 0;

    const breakdownContainer = document.getElementById('archive-breakdown');
    breakdownContainer.innerHTML = '';
    for (const [cat, amount] of Object.entries(data.categoryBreakdown)) {
        breakdownContainer.innerHTML += `<div class="archive-card"><span>${cat}</span><strong>৳ ${amount.toLocaleString()}</strong></div>`;
    }
}

function deleteArchiveMonth() {
    if(!checkAuth()) return; 
    const selectedKey = document.getElementById('archive-month-select').value;
    if(!selectedKey) return;
    if(confirm(`Delete ALL data for ${selectedKey}?`)) { delete appData.archives[selectedKey]; saveData(); renderHistoryDropdown(); }
}

// --- Chart ---
function updateMultiLineChart() {
    const ctx = document.getElementById('multiLineChart').getContext('2d');
    const allDates = [...new Set(appData.records.map(r => r.datetime.split('T')[0]))].sort();
    const datasets = appData.categories.map((cat, index) => {
        const dataForCat = allDates.map(dateStr => {
            return appData.records.filter(r => r.category === cat && r.datetime.startsWith(dateStr)).reduce((sum, r) => sum + r.amount, 0);
        });
        return { label: cat, data: dataForCat, borderColor: colorsList[index % colorsList.length], backgroundColor: 'transparent', borderWidth: 3, tension: 0.4, pointBackgroundColor: '#fff', pointBorderColor: colorsList[index % colorsList.length] };
    });

    if(chartInst) chartInst.destroy();
    chartInst = new Chart(ctx, { type: 'line', data: { labels: allDates.length > 0 ? allDates : ['Start Logging'], datasets: datasets }, options: { responsive: true, interaction: { mode: 'index', intersect: false }, scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }, plugins: { legend: { position: 'top', labels: { usePointStyle: true } } } } });
}

function generateScreenshotPDF() {
    const element = document.getElementById('pdf-capture-area');
    const opt = { margin: 0.3, filename: `Finova_Visual_Report_${appData.currentMonthStr}.pdf`, image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(element).save();
}