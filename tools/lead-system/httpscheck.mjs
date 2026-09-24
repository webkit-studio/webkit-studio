const KEY = process.env.PSI_API_KEY; const hosts = process.argv.slice(2);
async function one(h) {
  for (let i = 1; i <= 6; i++) {
    const u = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent('https://' + h + '/')}&strategy=mobile&category=best-practices&key=${KEY}`;
    try { const d = await (await fetch(u, { signal: AbortSignal.timeout(150000) })).json();
      if (d.error) { if (/quota/i.test(d.error.message)) { await new Promise(r => setTimeout(r, 25000)); continue; } return `${h}: HTTPS NEFUNGUJE (${d.error.message.slice(0, 90)})`; }
      const lr = d.lighthouseResult; return `${h}: https FUNGUJE → final ${lr.finalDisplayedUrl}, runtimeError ${lr.runtimeError?.code || '-'}`;
    } catch (e) { if (i === 6) return `${h}: chyba ${e.message}`; }
  }
  return `${h}: quota, nezměřeno`;
}
console.log((await Promise.all(hosts.map((h, i) => new Promise(r => setTimeout(r, i * 3000)).then(() => one(h))))).join('\n'));
