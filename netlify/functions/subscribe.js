// Netlify Function: Subscribe to roulette email
// Handles double opt-in flow

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SITE_URL = process.env.URL || 'https://casa-vacanza-alghero.netlify.app';
const SECRET_KEY = process.env.DOI_SECRET || 'casa-vacanza-secret-2026';

// Simple HMAC-like signature
function createSignature(email, timestamp) {
    const data = `${email}:${timestamp}:${SECRET_KEY}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

function createToken(email) {
    const timestamp = Date.now();
    const signature = createSignature(email, timestamp);
    const payload = JSON.stringify({ e: email, t: timestamp, s: signature });
    return Buffer.from(payload).toString('base64url');
}

function verifyToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token, 'base64url').toString());
        const { e: email, t: timestamp, s: signature } = payload;
        
        // Check if token is less than 24 hours old
        const age = Date.now() - timestamp;
        if (age > 24 * 60 * 60 * 1000) {
            return { valid: false, error: 'Token expired' };
        }
        
        // Verify signature
        const expectedSig = createSignature(email, timestamp);
        if (signature !== expectedSig) {
            return { valid: false, error: 'Invalid signature' };
        }
        
        return { valid: true, email };
    } catch (e) {
        return { valid: false, error: 'Invalid token' };
    }
}

// Send confirmation email via Brevo
async function sendConfirmationEmail(email, token) {
    const confirmUrl = `${SITE_URL}?confirm=${token}`;
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: {
                name: 'Case Vacanza Alghero',
                email: 'noreply@casavacanzealghero.it' // Cambia con il tuo sender verificato
            },
            to: [{ email }],
            subject: '🎰 Conferma per girare la Ruota della Fortuna!',
            htmlContent: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background-color:#f5f5f5;">
    <div style="max-width:500px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#0a1e2e,#1a3a52);border-radius:20px;padding:40px 30px;text-align:center;">
            <div style="font-size:48px;margin-bottom:20px;">🎰</div>
            <h1 style="color:#fff;font-size:24px;margin:0 0 10px;">Formula Roulette</h1>
            <p style="color:#C27A50;font-size:14px;letter-spacing:2px;margin:0 0 30px;">CASE VACANZA ALGHERO</p>
            <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;margin:0 0 30px;">
                Ciao! 👋<br><br>
                Clicca il pulsante qui sotto per confermare la tua email e sbloccare la <strong style="color:#fff;">Ruota della Fortuna</strong>!
            </p>
            <a href="${confirmUrl}" style="display:inline-block;background:linear-gradient(135deg,#8B5A3C,#C27A50);color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-weight:bold;font-size:15px;">
                🎯 GIRA LA RUOTA ORA
            </a>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:30px 0 0;">
                Il link scade tra 24 ore.<br>
                Se non hai richiesto tu questa email, ignorala.
            </p>
        </div>
        <p style="text-align:center;color:#999;font-size:11px;margin-top:20px;">
            © 2026 Case Vacanza Alghero · Sardegna
        </p>
    </div>
</body>
</html>
            `
        })
    });
    
    return response.ok;
}

// Add confirmed contact to Brevo list
async function addToBrevoList(email) {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            listIds: [2], // Default list ID - puoi cambiarlo
            updateEnabled: true,
            attributes: {
                ROULETTE_CONFIRMED: true,
                CONFIRMED_DATE: new Date().toISOString()
            }
        })
    });
    
    return response.ok;
}

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
    
    try {
        const body = JSON.parse(event.body);
        const { action, email, token } = body;
        
        if (action === 'subscribe') {
            // Step 1: User submits email
            if (!email || !email.includes('@')) {
                return { 
                    statusCode: 400, 
                    headers, 
                    body: JSON.stringify({ error: 'Email non valida' }) 
                };
            }
            
            const confirmToken = createToken(email);
            const sent = await sendConfirmationEmail(email, confirmToken);
            
            if (sent) {
                return { 
                    statusCode: 200, 
                    headers, 
                    body: JSON.stringify({ 
                        success: true, 
                        message: 'Email di conferma inviata!' 
                    }) 
                };
            } else {
                return { 
                    statusCode: 500, 
                    headers, 
                    body: JSON.stringify({ error: 'Errore invio email' }) 
                };
            }
        }
        
        if (action === 'confirm') {
            // Step 2: User clicked confirmation link
            const result = verifyToken(token);
            
            if (!result.valid) {
                return { 
                    statusCode: 400, 
                    headers, 
                    body: JSON.stringify({ error: result.error }) 
                };
            }
            
            // Add to Brevo list
            await addToBrevoList(result.email);
            
            return { 
                statusCode: 200, 
                headers, 
                body: JSON.stringify({ 
                    success: true, 
                    email: result.email,
                    message: 'Email confermata!' 
                }) 
            };
        }
        
        return { 
            statusCode: 400, 
            headers, 
            body: JSON.stringify({ error: 'Invalid action' }) 
        };
        
    } catch (e) {
        return { 
            statusCode: 500, 
            headers, 
            body: JSON.stringify({ error: 'Server error' }) 
        };
    }
};
