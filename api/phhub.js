export default function handler(req, res) {
    const { token, user } = req.query;
    const TOKEN_VALIDO = "PHHUB-KEY-2026-A7X9K2-MEU";
    const USERS_AUTORIZADOS = ["voce", "amigo1", "amigo2"];

    if (!token || token !== TOKEN_VALIDO) {
        return res.status(401).send("-- Token invalido");
    }
    if (!user || !USERS_AUTORIZADOS.includes(user)) {
        return res.status(403).send("-- Usuario nao autorizado");
    }

    const PH_HUB = `
-- ============================================
-- PH HUB - SCRIPT PRINCIPAL
-- ============================================
print("PH HUB CARREGADO!")
    `;
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(PH_HUB);
}
