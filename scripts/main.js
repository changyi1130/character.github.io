// 复制功能
document.addEventListener('DOMContentLoaded', function () {
    // 绑定点击事件到所有类名为 'copy_cell' 的单元格
    document.querySelectorAll('.copy_cell').forEach(cell => {
        cell.addEventListener('click', function () {
            // 使用 Clipboard API 来写入剪贴板
            navigator.clipboard.writeText(this.innerText).then(() => {
                // 复制成功的回调
                console.log(this.innerText)
            }).catch(err => {
                // 复制失败的回调
                console.error('复制失败:', err);
            });
        });
    });
});

// 复制动画
