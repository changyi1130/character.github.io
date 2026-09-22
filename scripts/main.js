document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll(
        '.char-cell:not(.wingdings):not(.wingdings-2):not(.wingdings-3)'
    );
    const toast = document.getElementById('toast');
    let toastTimer = null;

    function showToast(text) {
        toast.textContent = `已复制：${text}`;
        toast.classList.add('show');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 1500);
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        // 回退：非安全上下文（如 file://）或旧浏览器
        return new Promise((resolve, reject) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy')
                    ? resolve()
                    : reject(new Error('execCommand 复制失败'));
            } catch (err) {
                reject(err);
            } finally {
                document.body.removeChild(textarea);
            }
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            const text = cell.textContent;
            copyText(text)
                .then(() => showToast(text))
                .catch(err => {
                    console.error('复制失败:', err);
                });
        });
    });

    // 侧栏开关与无障碍状态同步
    const tocToggle = document.getElementById('toc-toggle');
    const tocButton = document.querySelector('.toc-toggle-button');

    function setTocOpen(open) {
        if (!tocToggle) return;
        tocToggle.checked = open;
        tocToggle.dispatchEvent(new Event('change'));
    }

    function syncExpanded() {
        if (tocButton) {
            tocButton.setAttribute('aria-expanded', String(tocToggle.checked));
        }
    }

    if (tocToggle) {
        tocToggle.addEventListener('change', syncExpanded);
        syncExpanded();
    }

    if (tocButton) {
        tocButton.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setTocOpen(!tocToggle.checked);
            }
        });
    }

    // 移动端：点目录链接后收起侧栏
    document.querySelectorAll('.toc a').forEach(link => {
        link.addEventListener('click', () => setTocOpen(false));
    });
});