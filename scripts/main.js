// 复制功能
document.addEventListener('DOMContentLoaded', function () {
    // 绑定点击事件到所有类名为 'copy_cell' 的单元格
    document.querySelectorAll('.copy_cell').forEach(cell => {
        cell.addEventListener('click', function () {
            // 防止在动画结束前重复点击
            if (cell.classList.contains('animating')) return;
            
            // 使用 Clipboard API 来写入剪贴板
            navigator.clipboard.writeText(this.innerText).then(() => {
                // 复制成功的回调
                console.log(this.innerText);
                
                // 复制成功动画
                var content = cell.textContent;
                cell.innerHTML = '<span class="checkmark">✔️</span>';
                cell.classList.add('animating'); // 标记动画进行中
                
                setTimeout(function () {
                    cell.innerHTML = content;
                    cell.classList.remove('animating'); // 动画结束后解除标记
                }, 900);
                setTimeout(function () {
                    cell.querySelector('.checkmark').classList.add('checked');
                }, 100);
                setTimeout(function () {
                    cell.querySelector('.checkmark').classList.remove('checked');
                }, 1000);

            }).catch(err => {
                // 复制失败的回调
                console.error('复制失败:', err);
            });
        });
    });
});