// 當表單提交時執行
document.getElementById('calorieForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 獲取用戶輸入的卡路里數據
    let calories = document.getElementById('calories').value;

    // 簡單存儲到localStorage (可改為發送至後端API)
    let storedCalories = JSON.parse(localStorage.getItem('calorieData')) || [];
    storedCalories.push({ date: new Date().toLocaleDateString(), calories: calories });
    localStorage.setItem('calorieData', JSON.stringify(storedCalories));

    // 更新畫面
    displayCalories(storedCalories);
    renderCalorieChart(storedCalories);
});

function displayCalories(data) {
    let output = `<h2>卡路里攝取歷史記錄</h2>`;
    output += `<ul>`
    data.forEach(entry => {
        output += `<li>${entry.date} - ${entry.calories} 卡路里</li>`;
    });
    output += `</ul>`;
    document.getElementById('calorieOutput').innerHTML = output;
}

// 頁面加載時顯示已存數據
document.addEventListener('DOMContentLoaded', () => {
    let storedCalories = JSON.parse(localStorage.getItem('calorieData')) || [];
    displayCalories(storedCalories);
});

//#####maintainAspectRatio: false,// 不保持比例
let myChart;
function renderCalorieChart(data) {
    let labels = data.map(entry => entry.date);
    let calories = data.map(entry => entry.calories);

    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = calories;
        myChart.update(); // 更新圖表而不重新創建
    } else {
        const ctx = document.getElementById('calorieChart').getContext('2d');// 獲取畫布
        myChart = new Chart(ctx, {// 創建圖表
            type: 'line',// 折線圖
            data: {
                labels: labels,  // 日期
                datasets: [{
                    label: '每日卡路里攝取',
                    data: calories, // 卡路里數據
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false // 不填充
                }]
            },
            options: {// 選項
                
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

// 在頁面加載時或數據更新後渲染圖表
document.addEventListener('DOMContentLoaded', () => {
    let storedCalories = JSON.parse(localStorage.getItem('calorieData')) || [];
    renderCalorieChart(storedCalories);
});
