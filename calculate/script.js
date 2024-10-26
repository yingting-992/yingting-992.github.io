// script.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const userSelect = document.getElementById('userSelect');
            const userInfo = document.getElementById('userInfo');

            // 填充下拉選單
            data.forEach(user => {
                const option = document.createElement('option');
                option.value = user.name;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });

            // 顯示選擇的使用者資料
            userSelect.addEventListener('change', function () {
                const selectedUser = data.find(user => user.name === this.value);
                if (selectedUser) {
                    userInfo.innerHTML = `
                        <p>Name: ${selectedUser.name}</p>
                        <p>Age: ${selectedUser.age}</p>
                        <p>Gender: ${selectedUser.gender}</p>
                        <p>Height: ${selectedUser.height}</p>
                        <p>Weight: ${selectedUser.weight}</p>
                    `;
                    // 計算基礎代謝率
                    const bmr = calculateBMR(selectedUser);
                    userInfo.innerHTML += `<p>BMR: ${bmr}</p>`;
                } else {
                    userInfo.innerHTML = '';
                }
            });
        })
        .catch(error => console.error('Error:', error));
});

function calculateBMR(user) {
    if (user.gender === 'Male') {
        return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
        return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }
}



