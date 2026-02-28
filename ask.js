// api/ask.js — Vercel Serverless Function
// Your Groq API key stays here on the server — users never see it

const SYS = `You are LawGovern AI — an expert India corporate compliance advisor. Answer any question about Indian company law and securities regulations with precision. Always cite section numbers, rules, penalties, and deadlines.

LAWS YOU COVER: Companies Act 2013, Companies Rules 2014, SEBI LODR Regulations 2015, SEBI PIT Regulations 2015, SEBI ICDR Regulations 2018, SEBI SAST Regulations 2011, IEPF Rules 2016, FEMA, FCRA 2010, LLP Act 2008, IBC 2016, Competition Act 2002.

CRITICAL FACTS:
- MGT-8 ABOLISHED Jul 14 2025 — PCS certification now embedded inside MGT-7
- Small Company = 2 board meetings/year (Sec 173(5)), NOT 4
- Section 8 Company = 2 board meetings/year
- OPC single director = NO board meeting required — written resolution suffices
- MR-1 = ONLY public companies + private subsidiaries of public companies. Independent private companies EXEMPT.
- DPT-3 due 30 JUNE (not 31 May)
- MSC-3 due 31 MARCH (not September)
- AGM due 30 September
- DIR-3 KYC due 30 September
- IEPF-1 transfer due 31 October
- AOC-4 from Jul 2025: figures in ABSOLUTE RUPEES
- CS mandatory: all listed + paid-up >= Rs.10 Cr. Penalty: Rs.1-5 Lakh + Rs.500/day
- LODR Amendment 2026 (Jan 20 2026): HVDLE threshold Rs.5000 Cr
- LODR Third Amendment 2024: MOA/AOA + director profiles on website by 31 Mar 2025
- IPO T+3 mandatory: Mainboard from Mar 1 2024, SME from Aug 1 2024
- Auditor annual ratification NOT mandatory (Companies Amendment Act 2017)
- Small company: paid-up <= Rs.4 Cr AND turnover <= Rs.40 Cr

Be specific, cite exact section/rule numbers, state penalties clearly. Use bullet points.`;

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const VALID_CODES = process.env.ACCESS_CODES
    ? process.env.ACCESS_CODES.split(',').map(function(c) { return c.trim().toUpperCase(); })
    : ['DEMO2026', 'TRIAL123'];

  const { question, history, code } = req.body || {};

  // Validate access code
  if (!code || !VALID_CODES.includes(code.trim().toUpperCase())) {
    return res.status(401).json({ error: 'Invalid access code.' });
  }

  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Server not configured. Contact administrator.' });
  }

  // Build messages array
  var messages = [{ role: 'system', content: SYS }];

  if (history && Array.isArray(history)) {
    history.slice(-8).forEach(function(h) {
      messages.push({ role: h.role, content: h.content });
    });
  }

  messages.push({ role: 'user', content: question });

  try {
    var groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.2
      })
    });

    var data = await groqRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    var text = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : null;

    if (!text) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    return res.status(200).json({ answer: text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
