export default function handler(req, res) {
    const { key, user, userid } = req.query;

    const KEYS_VALIDAS = {
        "PHHUB-MEU-ACESSO-2026-XYZ": { user: "voce", userid: "11670777434" },
        "PHHUB-JOAO-2026-A7X9": { user: "joao", userid: "000000000" },
        "PHHUB-MARIA-2026-B8Y2": { user: "maria", userid: "000000000" },
        "PHHUB-PEDRO-2026-C9Z3": { user: "pedro", userid: "000000000" }
    };

    const dados = KEYS_VALIDAS[key];

    if (!key || !dados) {
        return res.status(401).json({ erro: "Key invalida" });
    }
    if (!user || dados.user !== user) {
        return res.status(403).json({ erro: "Key nao pertence a esse usuario" });
    }
    if (!userid || dados.userid !== userid) {
        return res.status(403).json({ erro: "Essa key nao pertence a sua conta Roblox" });
    }
    return res.status(200).json({ ok: true, mensagem: "Acesso liberado" });
}
