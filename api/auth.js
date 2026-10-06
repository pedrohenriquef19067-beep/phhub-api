export default function handler(req, res) {
    const { key, user } = req.query;

    const KEYS_VALIDAS = {
        "PHHUB-MEU-ACESSO-2026-XYZ": "voce",
        "PHHUB-JOAO-2026-A7X9": "joao",
        "PHHUB-MARIA-2026-B8Y2": "maria",
        "PHHUB-PEDRO-2026-C9Z3": "pedro"
    };

    if (!key || !KEYS_VALIDAS[key]) {
        return res.status(401).json({ erro: "Key invalida" });
    }
    if (!user || KEYS_VALIDAS[key] !== user) {
        return res.status(403).json({ erro: "Key nao pertence a esse usuario" });
    }
    return res.status(200).json({ ok: true, mensagem: "Acesso liberado" });
}
