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
        return res.status(401).send("-- Key invalida");
    }
    if (!user || dados.user !== user) {
        return res.status(403).send("-- Key nao pertence a esse usuario");
    }
    if (!userid || dados.userid !== userid) {
        return res.status(403).send("-- Essa key nao pertence a sua conta Roblox");
    }

    const PH_HUB = `
local RS = game:GetService("ReplicatedStorage")
local Bridge = RS.Remotes.Bridge
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local tempoEntrada = tick()

local petsData = {
    {n="Coruja",r="Uncommon",p="7.5K",e="20",i="rbxassetid://108715563253264",k="Owl"},
    {n="Tigre",r="Uncommon",p="200K",e="180",i="rbxassetid://83278018510849",k="Tiger"},
    {n="Galimimo",r="Legendary",p="200M",e="15K",i="rbxassetid://77877454813823",k="Gallimimus"},
    {n="Sapo",r="Common",p="50",e="2",i="rbxassetid://129716618732245",k="Frog"},
    {n="Lagarto",r="Common",p="100",e="5",i="rbxassetid://104201785251346",k="Lizard"},
    {n="Papagaio",r="Uncommon",p="12K",e="35",i="rbxassetid://101802370440085",k="Parrot"},
    {n="Vaca",r="Rare",p="420K",e="275",i="rbxassetid://75228833670744",k="Cow"},
    {n="Avestruz",r="Rare",p="250K",e="200",i="rbxassetid://117294747627122",k="Ostrich"},
    {n="Coelho",r="Common",p="70",e="3",i="rbxassetid://117866433575718",k="Bunny"},
    {n="Canguru",r="Rare",p="700K",e="400",i="rbxassetid://87335063964470",k="Kangaroo"},
    {n="T-Rex",r="Secret",p="20B",e="225K",i="rbxassetid://80534799523404",k="T-Rex"},
    {n="Caranguejo",r="Uncommon",p="45K",e="75",i="rbxassetid://117453065515618",k="Crab"},
    {n="Cao",r="Rare",p="100K",e="150",i="rbxassetid://77835978355655",k="Dog"},
    {n="Crocodilo",r="Legendary",p="45M",e="5K",i="rbxassetid://79923447774102",k="Crocodile"},
    {n="Koala",r="Uncommon",p="2K",e="15",i="rbxassetid://127598497056287",k="Koala"},
    {n="Lhama",r="Epic",p="3.5M",e="1.2K",i="rbxassetid://107458635463989",k="Llama"},
    {n="Porquinho",r="Common",p="80",e="4",i="rbxassetid://123020597245827",k="GuiennaPig"},
    {n="Serval",r="Secret",p="10B",e="150K",i="rbxassetid://107115886072931",k="Serval"},
    {n="Baleia",r="Common",p="75K",e="100",i="rbxassetid://84027800633734",k="Whale"},
    {n="Lobo",r="Epic",p="1M",e="580",i="rbxassetid://71043535822884",k="Wolf"},
    {n="Galinha",r="Common",p="25",e="1",i="rbxassetid://78560413433084",k="Chicken"},
    {n="Cavalo",r="Legendary",p="10M",e="2K",i="rbxassetid://122448712952759",k="Horse"},
    {n="Mosassauro",r="Mythical",p="875M",e="50K",i="rbxassetid://73452608874561",k="Mosasaurus"},
    {n="Gorila",r="Mythical",p="150M",e="12K",i="rbxassetid://127956594343410",k="Gorilla"},
    {n="Velociraptor",r="Mythical",p="500M",e="50K",i="rbxassetid://72785547597674",k="Velociraptor"},
    {n="Foca",r="Epic",p="1.5M",e="725",i="rbxassetid://100729450772420",k="Seal"},
    {n="Agua-viva",r="Rare",p="582K",e="320",i="rbxassetid://70409501572539",k="Jellyfish"},
    {n="Tubarao",r="Rare",p="2M",e="700",i="rbxassetid://78408470295260",k="Shark"},
    {n="Elefante",r="Epic",p="15M",e="2.5K",i="rbxassetid://114071862827799",k="Elephant"},
    {n="Urso",r="Legendary",p="70M",e="7.4K",i="rbxassetid://75086483244544",k="Bear"},
    {n="Girafa",r="Mythical",p="345M",e="25K",i="rbxassetid://73065990342907",k="Giraffe"},
    {n="Ponei",r="Epic",p="2.32M",e="840",i="rbxassetid://125725609274133",k="Pony"},
    {n="Peixe-espada",r="Epic",p="5.5M",e="1.5K",i="rbxassetid://82435538730160",k="Swordfish"},
    {n="Capivara",r="Uncommon",p="24K",e="50",i="rbxassetid://76064433290134",k="Capybara"},
    {n="Urso-polar",r="Legendary",p="24M",e="3.2K",i="rbxassetid://107800134553384",k="PolarBear"},
}

local tr = {["Owl"]="Coruja",["Tiger"]="Tigre",["Frog"]="Sapo",["Lizard"]="Lagarto",["Parrot"]="Papagaio",["Cow"]="Vaca",["Ostrich"]="Avestruz",["Bunny"]="Coelho",["Kangaroo"]="Canguru",["Crab"]="Caranguejo",["Dog"]="Cao",["Crocodile"]="Crocodilo",["Llama"]="Lhama",["Guienna Pig"]="Porquinho",["GuiennaPig"]="Porquinho",["Whale"]="Baleia",["Wolf"]="Lobo",["Chicken"]="Galinha",["Horse"]="Cavalo",["Mosasaurus"]="Mosassauro",["Gorilla"]="Gorila",["Seal"]="Foca",["Jellyfish"]="Agua-viva",["Shark"]="Tubarao",["Elephant"]="Elefante",["Bear"]="Urso",["Giraffe"]="Girafa",["Pony"]="Ponei",["Swordfish"]="Peixe-espada",["Capybara"]="Capivara",["Polar Bear"]="Urso-polar",["PolarBear"]="Urso-polar",["Gallimimus"]="Galimimo",["T-Rex"]="T-Rex",["Serval"]="Serval",["Velociraptor"]="Velociraptor",["Koala"]="Koala"}

local function getInfo(k)
    for _, v in ipairs(petsData) do if v.k == k then return v end end
    return nil
end

local function corRar(r)
    r = (r or ""):lower()
    if r:find("common") then return Color3.fromRGB(180,180,180)
    elseif r:find("uncommon") then return Color3.fromRGB(80,220,80)
    elseif r:find("rare") then return Color3.fromRGB(80,160,255)
    elseif r:find("epic") then return Color3.fromRGB(200,80,255)
    elseif r:find("legend") then return Color3.fromRGB(255,200,60)
    elseif r:find("myth") then return Color3.fromRGB(255,80,80)
    elseif r:find("secret") then return Color3.fromRGB(255,80,180)
    else return Color3.fromRGB(180,180,180) end
end

local function calcularValorPet(p)
    if not p then return 0 end
    local t = tostring(p):gsub("%$",""):gsub(",",""):gsub("%s","")
    local n, s = t:match("([%d%.]+)(%a?)")
    if not n then return 0 end
    n = tonumber(n) or 0
    s = s and s:upper() or ""
    if s == "K" then n = n*1000
    elseif s == "M" then n = n*1000000
    elseif s == "B" then n = n*1000000000
    elseif s == "T" then n = n*1000000000000 end
    return n
end

local function calcularValorTotal()
    local total = 0
    local cf = workspace:FindFirstChild("Client")
    if not cf then return 0 end
    for _, obj in pairs(cf:GetDescendants()) do
        if obj:IsA("Folder") and obj.Name == "Pets" then
            for _, pet in pairs(obj:GetChildren()) do
                if pet.Name:match("^%w+%-%w+%-%w+%-%w+%-%w+$") then
                    local ui = pet:FindFirstChild("UI")
                    if ui then
                        local ui2 = ui:FindFirstChild("UI")
                        if ui2 then
                            local uf = ui2:FindFirstChild("Frame")
                            if uf then
                                local pl = uf:FindFirstChild("Price")
                                if pl then total = total + calcularValorPet(pl.Text) end
                            end
                        end
                    end
                end
            end
        end
    end
    return total
end

local sg = Instance.new("ScreenGui", game.CoreGui)
sg.ResetOnSpawn = false

local hudAntigo = sg:FindFirstChild("HUDPanel")
if hudAntigo then hudAntigo:Destroy() end

local nomeGrande = Instance.new("TextLabel", sg)
nomeGrande.Name = "NomeGrandePH"
nomeGrande.Size = UDim2.new(0, 600, 0, 100)
nomeGrande.Position = UDim2.new(0.5, -300, 0.5, -50)
nomeGrande.BackgroundTransparency = 1
nomeGrande.TextColor3 = Color3.fromRGB(180, 120, 255)
nomeGrande.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
nomeGrande.TextStrokeTransparency = 0
nomeGrande.Font = Enum.Font.SourceSansBold
nomeGrande.TextSize = 64
nomeGrande.Text = "PH HUB"
nomeGrande.Visible = true

task.spawn(function()
    task.wait(3)
    for i = 1, 20 do
        nomeGrande.TextTransparency = i / 20
        nomeGrande.TextStrokeTransparency = i / 20
        task.wait(0.05)
    end
    nomeGrande:Destroy()
end)

local hudPanel = Instance.new("Frame", sg)
hudPanel.Name = "HUDPanel"
hudPanel.Size = UDim2.new(0, 150, 0, 65)
hudPanel.Position = UDim2.new(1, -160, 0, 10)
hudPanel.BackgroundColor3 = Color3.fromRGB(25, 20, 40)
hudPanel.BorderSizePixel = 0
hudPanel.Active = true
hudPanel.Draggable = true
local cHud = Instance.new("UICorner", hudPanel); cHud.CornerRadius = UDim.new(0, 8)
local sHud = Instance.new("UIStroke", hudPanel); sHud.Color = Color3.fromRGB(150,100,255); sHud.Thickness = 2

local pingLabel = Instance.new("TextLabel", hudPanel)
pingLabel.Size = UDim2.new(1, -8, 0, 18)
pingLabel.Position = UDim2.new(0, 4, 0, 3)
pingLabel.BackgroundTransparency = 1
pingLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
pingLabel.Font = Enum.Font.SourceSansBold
pingLabel.TextSize = 11
pingLabel.TextXAlignment = Enum.TextXAlignment.Left
pingLabel.Text = "Ping: 0 ms"
task.spawn(function()
    while pingLabel and pingLabel.Parent do
        task.wait(1)
        local ping = math.floor(Players.LocalPlayer:GetNetworkPing() * 1000)
        pingLabel.Text = "Ping: " .. ping .. " ms"
    end
end)

local serverLabel = Instance.new("TextLabel", hudPanel)
serverLabel.Size = UDim2.new(1, -8, 0, 18)
serverLabel.Position = UDim2.new(0, 4, 0, 22)
serverLabel.BackgroundTransparency = 1
serverLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
serverLabel.Font = Enum.Font.SourceSansBold
serverLabel.TextSize = 11
serverLabel.TextXAlignment = Enum.TextXAlignment.Left
serverLabel.Text = "Server: " .. game.JobId:sub(1, 8) .. " | P: " .. #Players:GetPlayers()
task.spawn(function()
    while serverLabel and serverLabel.Parent do
        task.wait(2)
        serverLabel.Text = "Server: " .. game.JobId:sub(1, 8) .. " | P: " .. #Players:GetPlayers()
    end
end)

local timerLabel = Instance.new("TextLabel", hudPanel)
timerLabel.Size = UDim2.new(1, -8, 0, 18)
timerLabel.Position = UDim2.new(0, 4, 0, 41)
timerLabel.BackgroundTransparency = 1
timerLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
timerLabel.Font = Enum.Font.SourceSansBold
timerLabel.TextSize = 11
timerLabel.TextXAlignment = Enum.TextXAlignment.Left
timerLabel.Text = "Tempo: 00:00"
task.spawn(function()
    while timerLabel and timerLabel.Parent do
        task.wait(1)
        local seg = math.floor(tick() - tempoEntrada)
        local min = math.floor(seg / 60)
        local s = seg % 60
        timerLabel.Text = string.format("Tempo: %02d:%02d", min, s)
    end
end)

local fJanela = Instance.new("Frame", sg)
fJanela.Size = UDim2.new(0, 220, 0, 420)
fJanela.Position = UDim2.new(0.5, 135, 0.15, 0)
fJanela.BackgroundColor3 = Color3.fromRGB(25, 20, 40)
fJanela.BorderSizePixel = 0
fJanela.Visible = false
local cFJ = Instance.new("UICorner", fJanela); cFJ.CornerRadius = UDim.new(0, 12)
local sFJ = Instance.new("UIStroke", fJanela); sFJ.Color = Color3.fromRGB(150,100,255); sFJ.Thickness = 3

local titJ = Instance.new("TextLabel", fJanela)
titJ.Size = UDim2.new(1, 0, 0, 28)
titJ.BackgroundColor3 = Color3.fromRGB(40, 30, 70)
titJ.TextColor3 = Color3.new(1,1,1)
titJ.Text = "Janela"
titJ.Font = Enum.Font.SourceSansBold
titJ.TextSize = 11
local cTJ = Instance.new("UICorner", titJ); cTJ.CornerRadius = UDim.new(0, 12)

local scJ = Instance.new("ScrollingFrame", fJanela)
scJ.Size = UDim2.new(1, -12, 1, -38)
scJ.Position = UDim2.new(0, 6, 0, 32)
scJ.CanvasSize = UDim2.new(0, 0, 0, 0)
scJ.AutomaticCanvasSize = Enum.AutomaticSize.Y
scJ.ScrollBarThickness = 8
scJ.ScrollBarImageColor3 = Color3.fromRGB(150,100,255)
scJ.BackgroundColor3 = Color3.fromRGB(20, 15, 35)
scJ.BorderSizePixel = 0
scJ.Active = true
scJ.ScrollingDirection = Enum.ScrollingDirection.Y
scJ.ElasticBehavior = Enum.ElasticBehavior.WhenScrollable
local cSJ = Instance.new("UICorner", scJ); cSJ.CornerRadius = UDim.new(0, 6)
local laySJ = Instance.new("UIListLayout", scJ)
laySJ.Padding = UDim.new(0, 4)
laySJ.SortOrder = Enum.SortOrder.LayoutOrder

task.spawn(function()
    while scJ and scJ.Parent do
        task.wait(0.2)
        local tam = laySJ.AbsoluteContentSize.Y
        if scJ.CanvasSize.Y.Offset ~= tam + 10 then
            scJ.CanvasSize = UDim2.new(0, 0, 0, tam + 10)
        end
        scJ.CanvasPosition = Vector2.new(0, math.min(scJ.CanvasPosition.Y, math.max(0, tam - scJ.AbsoluteSize.Y + 20)))
    end
end)

local contadorLayout = 0
local function criarCheckJanela(nome, callback)
    contadorLayout = contadorLayout + 1
    local fItem = Instance.new("Frame", scJ)
    fItem.LayoutOrder = contadorLayout
    fItem.Size = UDim2.new(1, -4, 0, 28)
    fItem.BackgroundColor3 = Color3.fromRGB(35, 30, 55)
    fItem.BorderSizePixel = 0
    local cI = Instance.new("UICorner", fItem); cI.CornerRadius = UDim.new(0, 6)
    local chk = Instance.new("TextButton", fItem)
    chk.Size = UDim2.new(0, 18, 0, 18)
    chk.Position = UDim2.new(0, 5, 0, 5)
    chk.BackgroundColor3 = Color3.fromRGB(80, 80, 80)
    chk.Text = ""
    chk.TextColor3 = Color3.new(1,1,1)
    chk.Font = Enum.Font.SourceSansBold
    chk.TextSize = 12
    local cChk = Instance.new("UICorner", chk); cChk.CornerRadius = UDim.new(0, 4)
    local lbl = Instance.new("TextLabel", fItem)
    lbl.Size = UDim2.new(1, -30, 1, 0)
    lbl.Position = UDim2.new(0, 28, 0, 0)
    lbl.BackgroundTransparency = 1
    lbl.TextColor3 = Color3.fromRGB(230, 230, 230)
    lbl.Text = nome
    lbl.Font = Enum.Font.SourceSansBold
    lbl.TextSize = 10
    lbl.TextXAlignment = Enum.TextXAlignment.Left
    local ativo = false
    chk.MouseButton1Click:Connect(function()
        ativo = not ativo
        if ativo then
            chk.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
            chk.Text = "X"
        else
            chk.BackgroundColor3 = Color3.fromRGB(80, 80, 80)
            chk.Text = ""
        end
        callback(ativo)
    end)
    return ativo
end

criarCheckJanela("Mostrar FPS", function(ativo)
    if ativo then
        local fpsLabel = Instance.new("TextLabel", sg)
        fpsLabel.Name = "FPSLabel"
        fpsLabel.Size = UDim2.new(0, 100, 0, 24)
        fpsLabel.Position = UDim2.new(0, 10, 0, 10)
        fpsLabel.BackgroundTransparency = 1
        fpsLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
        fpsLabel.Font = Enum.Font.SourceSansBold
        fpsLabel.TextSize = 14
        fpsLabel.Text = "FPS: 60"
        task.spawn(function()
            while fpsLabel and fpsLabel.Parent do
                task.wait(0.5)
                local fps = math.floor(1 / RunService.RenderStepped:Wait())
                fpsLabel.Text = "FPS: " .. fps
            end
        end)
    else
        local lbl = sg:FindFirstChild("FPSLabel")
        if lbl then lbl:Destroy() end
    end
end)

criarCheckJanela("Anti-AFK", function(ativo)
    if ativo then
        local vu = game:GetService("VirtualUser")
        local plr = Players.LocalPlayer
        plr.Idled:Connect(function()
            vu:CaptureController()
            vu:ClickButton2(Vector2.new())
        end)
    end
end)

criarCheckJanela("Servers com 1 pessoa", function(ativo)
    if ativo then
        local plr = Players.LocalPlayer
        local sucesso = pcall(function()
            local servidores = game:GetService("HttpService"):JSONDecode(game:HttpGet("https://games.roblox.com/v1/games/" .. game.PlaceId .. "/servers/Public?sortOrder=Asc&limit=100"))
            local melhorServidor = nil
            local menorQtd = 999
            for _, s in ipairs(servidores.data) do
                if s.playing < menorQtd and s.id ~= game.JobId then
                    menorQtd = s.playing
                    melhorServidor = s.id
                end
            end
            if melhorServidor then
                plr:TeleportToPlaceInstance(game.PlaceId, melhorServidor, plr)
            else
                game:GetService("TeleportService"):Teleport(game.PlaceId, plr)
            end
        end)
        if not sucesso then
            game:GetService("TeleportService"):Teleport(game.PlaceId, plr)
        end
    end
end)

criarCheckJanela("NoClip", function(ativo)
    local plr = Players.LocalPlayer
    local char = plr.Character or plr.CharacterAdded:Wait()
    if ativo then
        task.spawn(function()
            while char and char.Parent do
                for _, p in ipairs(char:GetDescendants()) do
                    if p:IsA("BasePart") and p.CanCollide then
                        p.CanCollide = false
                    end
                end
                RunService.Stepped:Wait()
            end
        end)
        local chao = Instance.new("Part", workspace)
        chao.Name = "ChaoInvisivelPH"
        chao.Size = Vector3.new(30, 1, 30)
        chao.Anchored = true
        chao.CanCollide = true
        chao.Transparency = 1
        chao.Position = char.HumanoidRootPart.Position - Vector3.new(0, 4, 0)
        task.spawn(function()
            while chao and chao.Parent do
                if char and char:FindFirstChild("HumanoidRootPart") then
                    local posAtual = chao.Position
                    local posPlayer = char.HumanoidRootPart.Position
                    chao.Position = Vector3.new(posPlayer.X, posAtual.Y, posPlayer.Z)
                end
                RunService.Heartbeat:Wait()
            end
        end)
    else
        for _, p in ipairs(char:GetDescendants()) do
            if p:IsA("BasePart") then p.CanCollide = true end
        end
        local chao = workspace:FindFirstChild("ChaoInvisivelPH")
        if chao then chao:Destroy() end
    end
end)

criarCheckJanela("Auto Rejoin", function(ativo)
    if ativo then
        Players.LocalPlayer.OnTeleport:Connect(function()
            task.wait(5)
            game:GetService("TeleportService"):Teleport(game.PlaceId, Players.LocalPlayer)
        end)
    end
end)

criarCheckJanela("Player Aura", function(ativo)
    if ativo then
        task.spawn(function()
            while ativo do
                for _, plr in pairs(Players:GetPlayers()) do
                    if plr ~= Players.LocalPlayer and plr.Character then
                        if not plr.Character:FindFirstChild("PHAura") then
                            local hl = Instance.new("Highlight", plr.Character)
                            hl.Name = "PHAura"
                            hl.FillColor = Color3.fromRGB(255, 0, 0)
                            hl.OutlineColor = Color3.fromRGB(255, 100, 100)
                            hl.FillTransparency = 0.5
                            hl.OutlineTransparency = 0
                        end
                    end
                end
                task.wait(1)
            end
        end)
    else
        for _, plr in pairs(Players:GetPlayers()) do
            if plr.Character then
                local hl = plr.Character:FindFirstChild("PHAura")
                if hl then hl:Destroy() end
            end
        end
