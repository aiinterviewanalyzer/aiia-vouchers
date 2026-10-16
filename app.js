(() => {
  'use strict';
  const valid = voucher => voucher && typeof voucher.code === 'string' && voucher.code.length > 0 && voucher.code.length <= 128 && !/[\u0000-\u001f\u007f]/.test(voucher.code) && ['99', '199', '499'].includes(voucher.value);
  let voucher = null;
  const code = document.getElementById('code');
  function displayVoucher() {
    const fragment = window.location.hash.slice(1);
    voucher = null;
    if (fragment) {
      const params = new URLSearchParams(fragment);
      if (params.getAll('code').length === 1 && params.getAll('value').length === 1) voucher = { code: params.get('code'), value: params.get('value') };
    } else {
      voucher = window.history.state?.voucher || null;
    }
    if (!valid(voucher)) voucher = null;
    try {
      // History entry state preserves refresh without a code in the URL or HTTP.
      window.history.replaceState(voucher ? { voucher } : null, '', window.location.pathname);
    } catch { voucher = null; }
    document.getElementById('voucher').hidden = !voucher;
    document.getElementById('status').textContent = '';
    code.textContent = voucher?.code || '';
    document.getElementById('value').textContent = voucher ? `€${voucher.value}` : '';
    document.getElementById('heading').textContent = voucher ? 'Congratulations! 🎉' : 'We couldn’t display this voucher';
    document.getElementById('subtitle').textContent = voucher ? "You've won an exclusive voucher!" : 'Please scan your voucher QR code again or ask the conference host for help.';
  }
  displayVoucher();
  window.addEventListener('hashchange', displayVoucher);
  window.addEventListener('popstate', displayVoucher);
  document.getElementById('copy').addEventListener('click', async () => {
    if (!voucher) return;
    const selected = voucher;
    try {
      await navigator.clipboard.writeText(selected.code);
      if (selected !== voucher) return;
      document.getElementById('status').textContent = 'Code copied!';
    } catch {
      if (selected !== voucher) return;
      const range = document.createRange(); range.selectNodeContents(code);
      const selection = window.getSelection(); selection?.removeAllRanges(); selection?.addRange(range);
      document.getElementById('status').textContent = 'Press and hold the selected code to copy it.';
    }
  });
})();
