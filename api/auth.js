export default function handler(req, res) {
    const { token, user } = req.query;
    const TOKEN_VALIDO = "PHHUB-KEY-2026-A7X9K2-MEU";
    const USERS_AUTORIZADOS = ["voce", "amigo1", "amigo2"];

    if (!token || token !== TOKEN_VALIDO) {
        return res.status(401).json({ erro: "Token inválido" });
    }
    if (!user || !USERS_AUTORIZADOS.includes(user)) {
        return res.status(403).json({ erro: "Usuário não autorizado" });
    }
    return res.status(200).json({ ok: true, mensagem: "Acesso liberado" });
}
