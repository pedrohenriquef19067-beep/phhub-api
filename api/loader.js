export default function handler(req, res) {
    const { user } = req.query;

    const USERS_AUTORIZADOS = ["voce", "joao", "maria", "pedro"];

    if (!user || !USERS_AUTORIZADOS.includes(user)) {
        return res.status(403).send("-- Usuario nao autorizado");
    }

    const LOADER = `
local UIS = game:GetService("UserInputService")
local HttpService = game:GetService("HttpService")

local sg = Instance.new("ScreenGui", game.CoreGui)
sg.ResetOnSpawn = false

local f = Instance.new("Frame", sg)
f.Size = UDim2.new(0, 320, 0, 220)
f.Position = UDim2.new(0.5, -160, 0.5, -110)
f.BackgroundColor3 = Color3.fromRGB(25, 20, 40)
f.BorderSizePixel = 0
f.Active = true
f.Draggable = true
local cF = Instance.new("UICorner", f); cF.CornerRadius = UDim.new(0, 12)
local sF = Instance.new("UIStroke", f); sF.Color = Color3.fromRGB(150,100,255); sF.Thickness = 3

local tit = Instance.new("TextLabel", f)
tit.Size = UDim2.new(1, 0, 0, 30)
tit.BackgroundColor3 = Color3.fromRGB(40, 30, 70)
tit.TextColor3 = Color3.new(1,1,1)
tit.Text = "PH HUB - ACESSO"
tit.Font = Enum.Font.SourceSansBold
tit.TextSize = 13
local cT = Instance.new("UICorner", tit); cT.CornerRadius = UDim.new(0, 12)

local txt = Instance.new("TextLabel", f)
txt.Size = UDim2.new(1, -20, 0, 20)
txt.Position = UDim2.new(0, 10, 0, 40)
txt.BackgroundTransparency = 1
txt.TextColor3 = Color3.fromRGB(220, 220, 220)
txt.Text = "Digite sua KEY de acesso:"
txt.Font = Enum.Font.SourceSansBold
txt.TextSize = 11

local box = Instance.new("TextBox", f)
box.Size = UDim2.new(1, -20, 0, 40)
box.Position = UDim2.new(0, 10, 0, 68)
box.BackgroundColor3 = Color3.fromRGB(15, 10, 25)
box.TextColor3 = Color3.new(1,1,1)
box.PlaceholderText = "Cole sua key aqui..."
box.PlaceholderColor3 = Color3.fromRGB(120, 120, 120)
box.Font = Enum.Font.SourceSansBold
box.TextSize = 11
box.Text = ""
box.ClearTextOnFocus = false
local cB = Instance.new("UICorner", box); cB.CornerRadius = UDim.new(0, 6)
local sB = Instance.new("UIStroke", box); sB.Color = Color3.fromRGB(150,100,255); sB.Thickness = 1

local btn = Instance.new("TextButton", f)
btn.Size = UDim2.new(1, -20, 0, 38)
btn.Position = UDim2.new(0, 10, 0, 118)
btn.BackgroundColor3 = Color3.fromRGB(80, 50, 140)
btn.TextColor3 = Color3.new(1,1,1)
btn.Text = "ENTRAR"
btn.Font = Enum.Font.SourceSansBold
btn.TextSize = 13
local cBtn = Instance.new("UICorner", btn); cBtn.CornerRadius = UDim.new(0, 8)

local status = Instance.new("TextLabel", f)
status.Size = UDim2.new(1, -20, 0, 25)
status.Position = UDim2.new(0, 10, 0, 165)
status.BackgroundTransparency = 1
status.TextColor3 = Color3.fromRGB(255, 100, 100)
status.Text = ""
status.Font = Enum.Font.SourceSansBold
status.TextSize = 11

btn.MouseButton1Click:Connect(function()
    local keyDigitada = box.Text
    status.TextColor3 = Color3.fromRGB(255, 200, 100)
    status.Text = "Verificando..."

    local sucesso = pcall(function()
        local url = "https://phhub-api.vercel.app/api/auth?key=" .. keyDigitada .. "&user=${user}"
        local resposta = HttpService:JSONDecode(game:HttpGet(url))
        if resposta.ok then
            status.TextColor3 = Color3.fromRGB(100, 255, 100)
            status.Text = "Acesso liberado!"
            task.wait(0.8)
            sg:Destroy()
            loadstring(game:HttpGet("https://phhub-api.vercel.app/api/phhub?key=" .. keyDigitada .. "&user=${user}"))()
        else
            status.TextColor3 = Color3.fromRGB(255, 100, 100)
            status.Text = "Key invalida!"
        end
    end)

    if not sucesso then
        status.TextColor3 = Color3.fromRGB(255, 100, 100)
        status.Text = "Erro ao verificar key!"
    end
end)
    `;
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(LOADER);
}
