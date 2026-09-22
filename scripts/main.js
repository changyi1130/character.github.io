document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll(
        '.char-cell:not(.wingdings):not(.wingdings-2):not(.wingdings-3)'
    );
    const toast = document.getElementById('toast');
    let toastTimer = null;

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            const text = cell.textContent;

            navigator.clipboard.writeText(text).then(() => {
                // 更新提示文字（可以只写“已复制”，也可以带上字符）
                toast.textContent = `已复制：${text}`;

                // 显示 toast
                toast.classList.add('show');

                // 如果之前有计时器，清掉，重新计时
                if (toastTimer) clearTimeout(toastTimer);
                toastTimer = setTimeout(() => {
                    toast.classList.remove('show');
                }, 1500);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
    });
});