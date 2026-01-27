// ดึง Element ที่เราต้องใช้จาก HTML มาเก็บในตัวแปร
const clockDisplay = document.getElementById('clock-display');
const customContent = document.getElementById('custom-content');
const textDisplayArea = document.getElementById('text-display-area'); // เพิ่มตัวแปรสำหรับกล่องข้อความ
const textInput = document.getElementById('text-input');
const setTextBtn = document.getElementById('set-text-btn');
const imageInput = document.getElementById('image-input');
const clearBtn = document.getElementById('clear-btn');

// ฟังก์ชันสำหรับอัปเดตเวลา
function updateClock() {
    const now = new Date(); // ดึงเวลาปัจจุบัน

    // จัดรูปแบบตัวเลขให้มี 2 หลักเสมอ (เช่น 01, 02, ... 09)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // นำเวลามาแสดงผลใน #clock-display
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// เรียกใช้ updateClock ทุกๆ 1 วินาที (1000 มิลลิวินาที)
setInterval(updateClock, 1000);

// เรียกใช้ครั้งแรกทันทีเพื่อให้แสดงผลเลย ไม่ต้องรอ 1 วินาที
updateClock();


// --- ส่วนจัดการการปรับแต่ง ---

// เมื่อกดปุ่ม "แสดงข้อความ"
setTextBtn.addEventListener('click', () => {
    const text = textInput.value;
    // ใช้ .textContent จะปลอดภัยกว่าเมื่อแสดงผลแค่ข้อความธรรมดา
    textDisplayArea.textContent = text; 
    textInput.value = '';
});

// เมื่อมีการเลือกไฟล์รูปภาพ
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // ดึงไฟล์ที่เลือก
    if (file) {
        const reader = new FileReader(); // สร้างตัวอ่านไฟล์
        
        // เมื่ออ่านไฟล์เสร็จ
        reader.onload = (e) => {
            // สร้าง element <img> แล้วใส่ URL ของรูปที่อ่านได้เข้าไป
            customContent.innerHTML = `<img src="${e.target.result}" alt="Custom Background">`;
        };
        
        reader.readAsDataURL(file); // เริ่มอ่านไฟล์เป็น Data URL
    }
});

// เมื่อกดปุ่ม "ล้างการปรับแต่ง"
clearBtn.addEventListener('click', () => {
    textDisplayArea.textContent = ''; // ล้างข้อความด้านบน
    customContent.innerHTML = ''; // ทำให้ #custom-content ว่างเปล่า
    imageInput.value = ''; // รีเซ็ตค่าของ input file (สำคัญ)

});
