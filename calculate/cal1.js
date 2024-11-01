//回到頂部
document.addEventListener('scroll', function() {
    const floatingTexts = document.querySelectorAll('.floating-text');
    const scrollPosition = window.scrollY;

    floatingTexts.forEach(text => {
        if (scrollPosition > 100) {
            text.style.transform = 'translateY(-10px)';
        } else {
            text.style.transform = 'translateY(0)';
        }
    });
});


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// 計算基礎代謝率
// 當表單提交時執行
document.getElementById('calorieForm').addEventListener('submit', function(e) {
    e.preventDefault();// 阻止表單默認提交
    
    // 獲取用戶輸入的卡路里數據
    let calories = parseFloat(document.getElementById('calories').value);

    // 簡單存儲到localStorage (可改為發送至後端API)
    let storedCalories = JSON.parse(localStorage.getItem('calorieData')) || [];
    storedCalories.push({ date: new Date().toLocaleDateString(), calories: calories });
    localStorage.setItem('calorieData', JSON.stringify(storedCalories));
    //document.getElementById('calories').value = null;
    // 更新畫面
    displayCalories(storedCalories);
    renderCalorieChart(storedCalories);// 更新圖表
});

// 當表單Clear時執行
document.getElementById('clearData').addEventListener( 'click',function() {
   
    // 簡單存儲到localStorage (可改為發送至後端API)
    let storedCalories = [];
    localStorage.setItem('calorieData', JSON.stringify(storedCalories));

    // 更新畫面
    displayCalories(storedCalories);
    renderCalorieChart(storedCalories);
});



function displayCalories(data) {
    let output = `<h2>卡路里攝取歷史記錄</h2>`;
    output += `<ul>`
    let iCount = data.length;
    let index = 0;
    data.forEach(entry => {
        index++;
        if (index > iCount - 5) {
            output += `<li>${entry.date} - ${entry.calories} 卡路里</li>`;
        }
        //output += `<li>${entry.date} - ${entry.calories} 卡路里</li>`;
    });
    output += `</ul>`;
    document.getElementById('calorieOutput').innerHTML = output;
}

// 當頁面加載時或數據更新後渲染圖表
document.addEventListener('DOMContentLoaded', () => { 
    let storedCalories = JSON.parse(localStorage.getItem('calorieData')) || [];
    renderCalorieChart(storedCalories); // 正確渲染初始圖表
});

//#####
let myChart;
function renderCalorieChart(data) {
    let labels = data.map(entry => entry.date);
    let calories = data.map(entry => entry.calories);

    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = calories;
        myChart.update(); // 更新圖表而不重新創建
    } 
    // if (myChart) {
    //     myChart.destroy();
    // }
    else {
        const ctx = document.getElementById('calorieChart').getContext('2d');// 獲取畫布
        myChart = new Chart(ctx, {// 創建圖表
            type: 'line',// 折線圖
            data: {
                labels: labels, // x軸
                datasets: [{
                    label: '每日卡路里攝取',
                    data: calories, // 卡路里數據
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false // 不填充
                }]
            },
            options: {// 選項
                maintainAspectRatio: false,// 不保持比例
                responsive: true,// 自適應大小
                scales: {
                    x: {
                        display: true, // 顯示x軸
                        title: {
                            display: true, // 顯示x軸標題
                            text: '日期' // x軸標題
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '卡路里'
                        }
                    }
                }
            }
        });
    }
}


