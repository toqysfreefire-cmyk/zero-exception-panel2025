// Vercel Serverless Function: Automated GitHub Commit for Zero Exception Store
// Allows secure commits using process.env.GITHUB_TOKEN or client-provided token

export default async function handler(req, res) {
    // Enable CORS for admin dashboard
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        const { products, settings, token: clientToken, repo, branch } = req.body || {};

        const authToken = process.env.GITHUB_TOKEN || clientToken;
        if (!authToken) {
            return res.status(400).json({
                error: 'GitHub Personal Access Token is required. Set GITHUB_TOKEN in Vercel Environment Variables or provide in request.'
            });
        }

        const targetRepo = repo || process.env.GITHUB_REPO || 'toqysfreefire-cmyk/zero-exception-panel';
        const targetBranch = branch || process.env.GITHUB_BRANCH || 'main';

        const results = {};

        // 1. Commit products.json if provided
        if (products && Array.isArray(products)) {
            const path = 'products.json';
            const apiUrl = `https://api.github.com/repos/${targetRepo}/contents/${path}?ref=${targetBranch}`;

            // Fetch current SHA
            let currentSha = null;
            const getRes = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'Zero-Exception-Admin'
                }
            });

            if (getRes.ok) {
                const fileData = await getRes.json();
                currentSha = fileData.sha;
            }

            // Encode content to Base64
            const jsonString = JSON.stringify(products, null, 4);
            const contentBase64 = Buffer.from(jsonString, 'utf-8').toString('base64');

            // Commit to GitHub
            const putRes = await fetch(`https://api.github.com/repos/${targetRepo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Zero-Exception-Admin'
                },
                body: JSON.stringify({
                    message: `Auto-sync ${path} via ZERO Admin Console [deploy]`,
                    content: contentBase64,
                    sha: currentSha || undefined,
                    branch: targetBranch
                })
            });

            if (!putRes.ok) {
                const errJson = await putRes.json();
                throw new Error(`GitHub API error on ${path}: ${errJson.message || putRes.statusText}`);
            }

            const putData = await putRes.json();
            results.products = { success: true, commit: putData.commit?.sha };
        }

        // 2. Commit settings.json if provided
        if (settings && typeof settings === 'object') {
            const path = 'settings.json';
            const apiUrl = `https://api.github.com/repos/${targetRepo}/contents/${path}?ref=${targetBranch}`;

            let currentSha = null;
            const getRes = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'Zero-Exception-Admin'
                }
            });

            if (getRes.ok) {
                const fileData = await getRes.json();
                currentSha = fileData.sha;
            }

            const jsonString = JSON.stringify(settings, null, 4);
            const contentBase64 = Buffer.from(jsonString, 'utf-8').toString('base64');

            const putRes = await fetch(`https://api.github.com/repos/${targetRepo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Zero-Exception-Admin'
                },
                body: JSON.stringify({
                    message: `Auto-sync ${path} via ZERO Admin Console [deploy]`,
                    content: contentBase64,
                    sha: currentSha || undefined,
                    branch: targetBranch
                })
            });

            if (putRes.ok) {
                const putData = await putRes.json();
                results.settings = { success: true, commit: putData.commit?.sha };
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully committed to GitHub. Vercel auto-deploy initiated.',
            results
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal server error while syncing to GitHub'
        });
    }
}
