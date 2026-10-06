export default function handler(req, res) {
    const { key, user } = req.query;

    const KEYS_VALIDAS = {
        "PHHUB-MEU-ACESSO-2026-XYZ": "voce",
        "PHHUB-JOAO-2026-A7X9": "joao",
        "PHHUB-MARIA-2026-B8Y2": "maria",
        "PHHUB-PEDRO-2026-C9Z3": "pedro"
    };

    if (!key || !KEYS_VALIDAS[key]) {
        return res.status(401).send("-- Key invalida");
    }
    if (!user || KEYS_VALIDAS[key] !== user) {
        return res.status(403).send("-- Key nao pertence a esse usuario");
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
    end
end)

criarCheckJanela("Auto Upgrade Base", function(ativo)
    if ativo then
        task.spawn(function()
            while ativo do
                pcall(function()
                    Bridge:FireServer("Bases", "Upgrade")
                end)
                task.wait(2)
            end
        end)
    end
end)

contadorLayout = contadorLayout + 1
local bHop = Instance.new("TextButton", scJ)
bHop.LayoutOrder = contadorLayout
bHop.Size = UDim2.new(1, -4, 0, 28)
bHop.BackgroundColor3 = Color3.fromRGB(80, 50, 140)
bHop.TextColor3 = Color3.new(1,1,1)
bHop.Text = "Server Hop"
bHop.Font = Enum.Font.SourceSansBold
bHop.TextSize = 11
local cHop = Instance.new("UICorner", bHop); cHop.CornerRadius = UDim.new(0, 6)
bHop.MouseButton1Click:Connect(function()
    local plr = Players.LocalPlayer
    local sucesso = pcall(function()
        local servidores = game:GetService("HttpService"):JSONDecode(game:HttpGet("https://games.roblox.com/v1/games/" .. game.PlaceId .. "/servers/Public?sortOrder=Asc&limit=100"))
        for _, s in ipairs(servidores.data) do
            if s.playing < s.maxPlayers and s.id ~= game.JobId then
                plr:TeleportToPlaceInstance(game.PlaceId, s.id, plr)
                return
            end
        end
    end)
    if not sucesso then
        game:GetService("TeleportService"):Teleport(game.PlaceId, plr)
    end
end)

local f = Instance.new("Frame", sg)
f.Size = UDim2.new(0, 260, 0, 340)
f.Position = UDim2.new(0.5, -130, 0.15, 0)
f.BackgroundColor3 = Color3.fromRGB(25, 20, 40)
f.Active = true
f.Draggable = true
local cF = Instance.new("UICorner", f); cF.CornerRadius = UDim.new(0, 12)
local sF = Instance.new("UIStroke", f); sF.Color = Color3.fromRGB(150,100,255); sF.Thickness = 3

local topo = Instance.new("Frame", f)
topo.Size = UDim2.new(1, 0, 0, 28)
topo.BackgroundColor3 = Color3.fromRGB(40, 30, 70)
topo.BorderSizePixel = 0
local cT = Instance.new("UICorner", topo); cT.CornerRadius = UDim.new(0, 12)

local tit = Instance.new("TextLabel", topo)
tit.Size = UDim2.new(1, -60, 1, 0)
tit.Position = UDim2.new(0, 10, 0, 0)
tit.BackgroundTransparency = 1
tit.TextColor3 = Color3.new(1,1,1)
tit.Text = "PH HUB"
tit.Font = Enum.Font.SourceSansBold
tit.TextSize = 12
tit.TextXAlignment = Enum.TextXAlignment.Left

local bMin = Instance.new("TextButton", topo)
bMin.Size = UDim2.new(0, 22, 0, 22)
bMin.Position = UDim2.new(1, -50, 0, 3)
bMin.BackgroundColor3 = Color3.fromRGB(80, 50, 140)
bMin.TextColor3 = Color3.new(1,1,1)
bMin.Text = "-"
bMin.Font = Enum.Font.SourceSansBold
bMin.TextSize = 15
local cBM = Instance.new("UICorner", bMin); cBM.CornerRadius = UDim.new(0, 6)

local bX = Instance.new("TextButton", topo)
bX.Size = UDim2.new(0, 22, 0, 22)
bX.Position = UDim2.new(1, -26, 0, 3)
bX.BackgroundColor3 = Color3.fromRGB(150, 30, 30)
bX.TextColor3 = Color3.new(1,1,1)
bX.Text = "X"
bX.Font = Enum.Font.SourceSansBold
bX.TextSize = 12
local cBX = Instance.new("UICorner", bX); cBX.CornerRadius = UDim.new(0, 6)

local bAutoEquip = Instance.new("TextButton", f)
bAutoEquip.Size = UDim2.new(0.5, -12, 0, 24)
bAutoEquip.Position = UDim2.new(0, 8, 0, 33)
bAutoEquip.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
bAutoEquip.TextColor3 = Color3.fromRGB(180, 180, 180)
bAutoEquip.Text = "Auto Equip: OFF"
bAutoEquip.Font = Enum.Font.SourceSansBold
bAutoEquip.TextSize = 10
local cAE = Instance.new("UICorner", bAutoEquip); cAE.CornerRadius = UDim.new(0, 8)

local autoEquipAtivo = false
bAutoEquip.MouseButton1Click:Connect(function()
    autoEquipAtivo = not autoEquipAtivo
    if autoEquipAtivo then
        bAutoEquip.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
        bAutoEquip.TextColor3 = Color3.new(1,1,1)
        bAutoEquip.Text = "Auto Equip: ON"
    else
        bAutoEquip.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
        bAutoEquip.TextColor3 = Color3.fromRGB(180, 180, 180)
        bAutoEquip.Text = "Auto Equip: OFF"
    end
end)

local bSell = Instance.new("TextButton", f)
bSell.Size = UDim2.new(0.5, -12, 0, 24)
bSell.Position = UDim2.new(0.5, 4, 0, 33)
bSell.BackgroundColor3 = Color3.fromRGB(150, 30, 30)
bSell.TextColor3 = Color3.new(1,1,1)
bSell.Text = "VENDER"
bSell.Font = Enum.Font.SourceSansBold
bSell.TextSize = 10
local cBS = Instance.new("UICorner", bSell); cBS.CornerRadius = UDim.new(0, 8)

bSell.MouseButton1Click:Connect(function()
    local ids = {}
    local plr = game.Players.LocalPlayer
    local pg = plr:FindFirstChild("PlayerGui")
    if pg then
        for _, g in pairs(pg:GetDescendants()) do
            if g.Name:match("^%w+%-%w+%-%w+%-%w+%-%w+$") then table.insert(ids, g.Name) end
        end
    end
    if #ids == 0 then bSell.Text = "SEM PETS!" task.wait(1.5) bSell.Text = "VENDER" return end
    local tab = {}
    for _, id in ipairs(ids) do tab[id] = true end
    pcall(function() Bridge:FireServer("Bases", "Pets", "Sell", tab) end)
    bSell.Text = "OK " .. #ids
    local notif = Instance.new("TextLabel", sg)
    notif.Size = UDim2.new(0, 250, 0, 35)
    notif.Position = UDim2.new(0.5, -125, 0.15, 0)
    notif.BackgroundColor3 = Color3.fromRGB(0, 150, 0)
    notif.TextColor3 = Color3.new(1,1,1)
    notif.Text = "Vendeu " .. #ids .. " pets!"
    notif.Font = Enum.Font.SourceSansBold
    notif.TextSize = 13
    local cN = Instance.new("UICorner", notif); cN.CornerRadius = UDim.new(0, 8)
    task.wait(2)
    notif:Destroy()
    task.wait(1.5)
    bSell.Text = "VENDER"
end)

local bAuto = Instance.new("TextButton", f)
bAuto.Size = UDim2.new(1, -16, 0, 22)
bAuto.Position = UDim2.new(0, 8, 0, 62)
bAuto.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
bAuto.TextColor3 = Color3.fromRGB(180, 180, 180)
bAuto.Text = "Auto Buy: OFF"
bAuto.Font = Enum.Font.SourceSansBold
bAuto.TextSize = 10
local cBA = Instance.new("UICorner", bAuto); cBA.CornerRadius = UDim.new(0, 8)

local autoAtivo = false
bAuto.MouseButton1Click:Connect(function()
    autoAtivo = not autoAtivo
    if autoAtivo then
        bAuto.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
        bAuto.TextColor3 = Color3.new(1,1,1)
        bAuto.Text = "Auto Buy: ON"
    else
        bAuto.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
        bAuto.TextColor3 = Color3.fromRGB(180, 180, 180)
        bAuto.Text = "Auto Buy: OFF"
    end
end)

local rars = {
    {n="Common",s="Com",c=Color3.fromRGB(180,180,180),a=false},
    {n="Uncommon",s="Unc",c=Color3.fromRGB(80,220,80),a=false},
    {n="Rare",s="Rar",c=Color3.fromRGB(80,160,255),a=false},
    {n="Epic",s="Epi",c=Color3.fromRGB(200,80,255),a=false},
    {n="Legendary",s="Leg",c=Color3.fromRGB(255,200,60),a=false},
    {n="Mythical",s="Myt",c=Color3.fromRGB(255,80,80),a=false},
    {n="Secret",s="Sec",c=Color3.fromRGB(255,80,180),a=false},
}

local contR = Instance.new("Frame", f)
contR.Size = UDim2.new(1, -16, 0, 22)
contR.Position = UDim2.new(0, 8, 0, 88)
contR.BackgroundTransparency = 1
local layR = Instance.new("UIListLayout", contR)
layR.FillDirection = Enum.FillDirection.Horizontal
layR.Padding = UDim.new(0, 2)

for _, r in ipairs(rars) do
    local b = Instance.new("TextButton", contR)
    b.Size = UDim2.new(0, 31, 0, 22)
    b.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
    b.TextColor3 = Color3.fromRGB(180, 180, 180)
    b.Text = r.s
    b.Font = Enum.Font.SourceSansBold
    b.TextSize = 9
    local c = Instance.new("UICorner", b); c.CornerRadius = UDim.new(0, 5)
    b.MouseButton1Click:Connect(function()
        r.a = not r.a
        if r.a then
            b.BackgroundColor3 = r.c
            b.TextColor3 = Color3.new(1,1,1)
            b.Text = "ON"
        else
            b.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
            b.TextColor3 = Color3.fromRGB(180, 180, 180)
            b.Text = r.s
        end
    end)
end

local bPetSpaw = Instance.new("TextButton", f)
bPetSpaw.Size = UDim2.new(0.35, -6, 0, 20)
bPetSpaw.Position = UDim2.new(0, 8, 0, 114)
bPetSpaw.BackgroundColor3 = Color3.fromRGB(80, 50, 140)
bPetSpaw.TextColor3 = Color3.new(1,1,1)
bPetSpaw.Text = "Pets Spaw:"
bPetSpaw.Font = Enum.Font.SourceSansBold
bPetSpaw.TextSize = 9
local cP1 = Instance.new("UICorner", bPetSpaw); cP1.CornerRadius = UDim.new(0, 6)

local bSelectPets = Instance.new("TextButton", f)
bSelectPets.Size = UDim2.new(0.35, -6, 0, 20)
bSelectPets.Position = UDim2.new(0.35, 1, 0, 114)
bSelectPets.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
bSelectPets.TextColor3 = Color3.fromRGB(180, 180, 180)
bSelectPets.Text = "Select Pets"
bSelectPets.Font = Enum.Font.SourceSansBold
bSelectPets.TextSize = 9
local cP2 = Instance.new("UICorner", bSelectPets); cP2.CornerRadius = UDim.new(0, 6)

local bValor = Instance.new("TextButton", f)
bValor.Size = UDim2.new(0.3, -6, 0, 20)
bValor.Position = UDim2.new(0.7, -3, 0, 114)
bValor.BackgroundColor3 = Color3.fromRGB(80, 50, 140)
bValor.TextColor3 = Color3.new(1,1,1)
bValor.Text = "Calcular"
bValor.Font = Enum.Font.SourceSansBold
bValor.TextSize = 8
local cPV = Instance.new("UICorner", bValor); cPV.CornerRadius = UDim.new(0, 6)
bValor.MouseButton1Click:Connect(function()
    local total = calcularValorTotal()
    local notif = Instance.new("TextLabel", sg)
    notif.Size = UDim2.new(0, 300, 0, 40)
    notif.Position = UDim2.new(0.5, -150, 0.1, 0)
    notif.BackgroundColor3 = Color3.fromRGB(0, 150, 0)
    notif.TextColor3 = Color3.new(1,1,1)
    notif.Text = "Valor total da base: " .. tostring(math.floor(total))
    notif.Font = Enum.Font.SourceSansBold
    notif.TextSize = 14
    local cN = Instance.new("UICorner", notif); cN.CornerRadius = UDim.new(0, 8)
    task.wait(3)
    notif:Destroy()
end)

local bRedPequeno = Instance.new("TextButton", f)
bRedPequeno.Size = UDim2.new(0, 25, 0, 25)
bRedPequeno.Position = UDim2.new(1, 3, 0, 150)
bRedPequeno.BackgroundColor3 = Color3.fromRGB(220, 40, 40)
bRedPequeno.TextColor3 = Color3.new(1,1,1)
bRedPequeno.Text = ">"
bRedPequeno.Font = Enum.Font.SourceSansBold
bRedPequeno.TextSize = 14
local cBRP = Instance.new("UICorner", bRedPequeno); cBRP.CornerRadius = UDim.new(0, 6)

local janelaAberta = false

local function atualizarJanela()
    local posF = f.AbsolutePosition
    local sizeF = f.AbsoluteSize
    fJanela.Position = UDim2.new(0, posF.X + sizeF.X + 30, 0, posF.Y)
end

local function toggleJanela()
    janelaAberta = not janelaAberta
    fJanela.Visible = janelaAberta
    if janelaAberta then
        bRedPequeno.Text = "<"
    else
        bRedPequeno.Text = ">"
    end
    atualizarJanela()
end

bRedPequeno.MouseButton1Click:Connect(toggleJanela)

task.spawn(function()
    while task.wait(0.05) do
        if janelaAberta then
            atualizarJanela()
        end
    end
end)

local sc = Instance.new("ScrollingFrame", f)
sc.Size = UDim2.new(1, -16, 0, 190)
sc.Position = UDim2.new(0, 8, 0, 138)
sc.CanvasSize = UDim2.new(0, 0, 0, 0)
sc.AutomaticCanvasSize = Enum.AutomaticSize.Y
sc.ScrollBarThickness = 4
sc.BackgroundColor3 = Color3.fromRGB(20, 15, 35)
sc.BorderSizePixel = 0
local cS = Instance.new("UICorner", sc); cS.CornerRadius = UDim.new(0, 6)
local layS = Instance.new("UIListLayout", sc); layS.Padding = UDim.new(0, 2)

local abaAtual = "spaw"
local petsMarcados = {}

local function rarFiltroAtiva(r)
    for _, f in ipairs(rars) do
        if f.a and r:lower():find(f.n:lower()) then return true end
    end
    return false
end

local function rarTemFiltro()
    for _, f in ipairs(rars) do if f.a then return true end end
    return false
end

local function listarSpawn()
    local l = {}
    local cf = workspace:FindFirstChild("Client")
    if not cf then return l end
    local sf = cf:FindFirstChild("Spawn")
    if not sf then return l end
    local pf = sf:FindFirstChild("Pets")
    if not pf then return l end
    for _, pet in pairs(pf:GetChildren()) do
        local pr = pet:FindFirstChild("ProximityPrompt")
        if pr and pr:IsA("ProximityPrompt") then
            local ni = "?"
            local rar = "?"
            local pc = "?"
            local ui = pet:FindFirstChild("UI")
            if ui then
                local ui2 = ui:FindFirstChild("UI")
                if ui2 then
                    local uf = ui2:FindFirstChild("Frame")
                    if uf then
                        local tf = uf:FindFirstChild("Title")
                        if tf then
                            local tl = tf:FindFirstChild("Title")
                            if tl then ni = tl.Text end
                        end
                        local rl = uf:FindFirstChild("Rarity")
                        if rl then rar = rl.Text end
                        local pl = uf:FindFirstChild("Price")
                        if pl then pc = pl.Text end
                    end
                end
            end
            local d = getInfo(ni)
            local nt = tr[ni] or ni
            local foto = d and d.i or "rbxassetid://0"
            local er = d and d.e or "?"
            table.insert(l, {id=pet.Name, n=nt, r=rar, p=pc, i=foto, e=er, k=ni})
        end
    end
    return l
end

local function listarSelect()
    local l = {}
    for _, p in ipairs(petsData) do
        table.insert(l, {id=p.k, n=p.n, r=p.r, p=p.p, i=p.i, e=p.e, k=p.k})
    end
    return l
end

local function atLista()
    for _, c in pairs(sc:GetChildren()) do
        if c:IsA("Frame") then c:Destroy() end
    end
    local lista = {}
    if abaAtual == "spaw" then lista = listarSpawn()
    elseif abaAtual == "select" then lista = listarSelect() end
    local filtrada = {}
    for _, p in ipairs(lista) do
        if abaAtual ~= "select" or not rarTemFiltro() or rarFiltroAtiva(p.r) then
            table.insert(filtrada, p)
        end
    end
    table.sort(filtrada, function(a,b)
        local function cp(t)
            if not t then return 0 end
            t = tostring(t):gsub("%$",""):gsub(",",""):gsub("%s","")
            local n, s = t:match("([%d%.]+)(%a?)")
            if not n then return 0 end
            n = tonumber(n) or 0
            s = s:upper()
            if s == "K" then n = n*1000
            elseif s == "M" then n = n*1000000
            elseif s == "B" then n = n*1000000000
            elseif s == "T" then n = n*1000000000000 end
            return n
        end
        return cp(a.p) > cp(b.p)
    end)
    for _, p in ipairs(filtrada) do
        local marcado = petsMarcados[p.id]
        local it = Instance.new("Frame", sc)
        it.Size = UDim2.new(1, -4, 0, 34)
        it.BackgroundColor3 = marcado and Color3.fromRGB(0, 80, 0) or Color3.fromRGB(30, 60, 30)
        it.BorderSizePixel = 0
        local cI = Instance.new("UICorner", it); cI.CornerRadius = UDim.new(0, 6)
        local sI = Instance.new("UIStroke", it); sI.Color = corRar(p.r); sI.Thickness = 2
        local im = Instance.new("ImageLabel", it)
        im.Size = UDim2.new(0, 28, 0, 28)
        im.Position = UDim2.new(0, 3, 0, 3)
        im.BackgroundTransparency = 1
        im.Image = p.i
        im.ScaleType = Enum.ScaleType.Fit
        local chk = Instance.new("TextButton", it)
        chk.Size = UDim2.new(0, 20, 0, 20)
        chk.Position = UDim2.new(0, 34, 0, 7)
        chk.BackgroundColor3 = marcado and Color3.fromRGB(0, 200, 0) or Color3.fromRGB(80, 80, 80)
        chk.Text = marcado and "X" or ""
        chk.TextColor3 = Color3.new(1,1,1)
        chk.Font = Enum.Font.SourceSansBold
        chk.TextSize = 12
        local cCh = Instance.new("UICorner", chk); cCh.CornerRadius = UDim.new(0, 4)
        chk.MouseButton1Click:Connect(function()
            petsMarcados[p.id] = not petsMarcados[p.id]
            if petsMarcados[p.id] then
                chk.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
                chk.Text = "X"
                it.BackgroundColor3 = Color3.fromRGB(0, 80, 0)
            else
                chk.BackgroundColor3 = Color3.fromRGB(80, 80, 80)
                chk.Text = ""
                it.BackgroundColor3 = Color3.fromRGB(30, 60, 30)
            end
        end)
        local t1 = Instance.new("TextLabel", it)
        t1.Size = UDim2.new(1, -60, 0, 14)
        t1.Position = UDim2.new(0, 58, 0, 2)
        t1.BackgroundTransparency = 1
        t1.TextColor3 = Color3.fromRGB(230, 230, 230)
        t1.Text = p.n .. " (" .. p.r .. ")"
        t1.Font = Enum.Font.SourceSansBold
        t1.TextSize = 9
        t1.TextXAlignment = Enum.TextXAlignment.Left
        local t2 = Instance.new("TextLabel", it)
        t2.Size = UDim2.new(1, -60, 0, 14)
        t2.Position = UDim2.new(0, 58, 0, 17)
        t2.BackgroundTransparency = 1
        t2.TextColor3 = corRar(p.r)
        t2.Text = p.p .. " | $" .. p.e .. "/s"
        t2.Font = Enum.Font.SourceSansBold
        t2.TextSize = 8
        t2.TextXAlignment = Enum.TextXAlignment.Left
    end
end

local function setAba(aba)
    abaAtual = aba
    bPetSpaw.BackgroundColor3 = aba == "spaw" and Color3.fromRGB(80, 50, 140) or Color3.fromRGB(60, 60, 60)
    bPetSpaw.TextColor3 = aba == "spaw" and Color3.new(1,1,1) or Color3.fromRGB(180, 180, 180)
    bSelectPets.BackgroundColor3 = aba == "select" and Color3.fromRGB(80, 50, 140) or Color3.fromRGB(60, 60, 60)
    bSelectPets.TextColor3 = aba == "select" and Color3.new(1,1,1) or Color3.fromRGB(180, 180, 180)
    contR.Visible = (aba == "spaw" or aba == "select")
    atLista()
end

bPetSpaw.MouseButton1Click:Connect(function() setAba("spaw") end)
bSelectPets.MouseButton1Click:Connect(function() setAba("select") end)

local bBolinha = Instance.new("TextButton", sg)
bBolinha.Size = UDim2.new(0, 40, 0, 40)
bBolinha.Position = UDim2.new(0, 10, 0.3, 0)
bBolinha.BackgroundColor3 = Color3.fromRGB(120, 70, 220)
bBolinha.TextColor3 = Color3.new(1,1,1)
bBolinha.Text = "PH"
bBolinha.Font = Enum.Font.SourceSansBold
bBolinha.TextSize = 14
bBolinha.Visible = false
bBolinha.Active = true
local cBBol = Instance.new("UICorner", bBolinha); cBBol.CornerRadius = UDim.new(1, 0)
local sBBol = Instance.new("UIStroke", bBolinha); sBBol.Color = Color3.new(0,0,0); sBBol.Thickness = 3

local arrastandoBola = false
local offsetBolaX, offsetBolaY = 0, 0
local moveuBola = false

bBolinha.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        arrastandoBola = true
        moveuBola = false
        local p = input.Position
        offsetBolaX = p.X - bBolinha.AbsolutePosition.X
        offsetBolaY = p.Y - bBolinha.AbsolutePosition.Y
    end
end)

UIS.InputChanged:Connect(function(input)
    if arrastandoBola and input.UserInputType == Enum.UserInputType.Touch then
        moveuBola = true
        local p = input.Position
        bBolinha.Position = UDim2.new(0, p.X - offsetBolaX, 0, p.Y - offsetBolaY)
    end
end)

UIS.InputEnded:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        if arrastandoBola then
            arrastandoBola = false
            if not moveuBola then
                f.Visible = true
                bBolinha.Visible = false
                bRedPequeno.Visible = true
            end
        end
    end
end)

bMin.MouseButton1Click:Connect(function()
    f.Visible = false
    fJanela.Visible = false
    bRedPequeno.Visible = false
    bBolinha.Visible = true
end)

bX.MouseButton1Click:Connect(function()
    local sgConf = Instance.new("ScreenGui", game.CoreGui)
    sgConf.ResetOnSpawn = false
    local fConf = Instance.new("Frame", sgConf)
    fConf.Size = UDim2.new(0, 250, 0, 130)
    fConf.Position = UDim2.new(0.5, -125, 0.5, -65)
    fConf.BackgroundColor3 = Color3.fromRGB(25, 20, 40)
    local cConf = Instance.new("UICorner", fConf); cConf.CornerRadius = UDim.new(0, 12)
    local sConf = Instance.new("UIStroke", fConf); sConf.Color = Color3.fromRGB(255, 80, 80); sConf.Thickness = 3
    local titConf = Instance.new("TextLabel", fConf)
    titConf.Size = UDim2.new(1, 0, 0, 28)
    titConf.BackgroundColor3 = Color3.fromRGB(150, 30, 30)
    titConf.TextColor3 = Color3.new(1,1,1)
    titConf.Text = "FECHAR SCRIPT?"
    titConf.Font = Enum.Font.SourceSansBold
    titConf.TextSize = 12
    local cTitConf = Instance.new("UICorner", titConf); cTitConf.CornerRadius = UDim.new(0, 12)
    local textoConf = Instance.new("TextLabel", fConf)
    textoConf.Size = UDim2.new(1, -20, 0, 40)
    textoConf.Position = UDim2.new(0, 10, 0, 35)
    textoConf.BackgroundTransparency = 1
    textoConf.TextColor3 = Color3.fromRGB(255, 200, 200)
    textoConf.Text = "Tem certeza que quer fechar o script?"
    textoConf.Font = Enum.Font.SourceSansBold
    textoConf.TextSize = 12
    textoConf.TextWrapped = true
    local bSim = Instance.new("TextButton", fConf)
    bSim.Size = UDim2.new(0.5, -15, 0, 32)
    bSim.Position = UDim2.new(0, 10, 1, -42)
    bSim.BackgroundColor3 = Color3.fromRGB(0, 160, 80)
    bSim.TextColor3 = Color3.new(1,1,1)
    bSim.Text = "SIM"
    bSim.Font = Enum.Font.SourceSansBold
    bSim.TextSize = 12
    local cSim = Instance.new("UICorner", bSim); cSim.CornerRadius = UDim.new(0, 8)
    local bNao = Instance.new("TextButton", fConf)
    bNao.Size = UDim2.new(0.5, -15, 0, 32)
    bNao.Position = UDim2.new(0.5, 5, 1, -42)
    bNao.BackgroundColor3 = Color3.fromRGB(150, 30, 30)
    bNao.TextColor3 = Color3.new(1,1,1)
    bNao.Text = "NAO"
    bNao.Font = Enum.Font.SourceSansBold
    bNao.TextSize = 12
    local cNao = Instance.new("UICorner", bNao); cNao.CornerRadius = UDim.new(0, 8)
    bSim.MouseButton1Click:Connect(function()
        f.Visible = false
        fJanela.Visible = false
        bRedPequeno.Visible = false
        bBolinha.Visible = false
        fConf:Destroy()
        sgConf:Destroy()
    end)
    bNao.MouseButton1Click:Connect(function()
        fConf:Destroy()
        sgConf:Destroy()
    end)
end)

local bShift = Instance.new("TextButton", sg)
bShift.Name = "ShiftLockButton"
bShift.Size = UDim2.new(0, 55, 0, 55)
bShift.Position = UDim2.new(1, -80, 1, -295)
bShift.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
bShift.BackgroundTransparency = 0.35
bShift.Text = ""
bShift.Active = true
local cShift = Instance.new("UICorner", bShift); cShift.CornerRadius = UDim.new(1, 0)
local sShift = Instance.new("UIStroke", bShift); sShift.Color = Color3.fromRGB(255, 255, 255); sShift.Thickness = 2

local shiftIcon = Instance.new("ImageLabel", bShift)
shiftIcon.Size = UDim2.new(0.65, 0, 0.65, 0)
shiftIcon.Position = UDim2.new(0.175, 0, 0.175, 0)
shiftIcon.BackgroundTransparency = 1
shiftIcon.Image = "rbxassetid://6031075931"
shiftIcon.ImageColor3 = Color3.fromRGB(255, 255, 255)
shiftIcon.ScaleType = Enum.ScaleType.Fit
shiftIcon.Name = "Icone"

local shiftAtivo = false
local connShift = nil

bShift.MouseButton1Click:Connect(function()
    shiftAtivo = not shiftAtivo
    local plr = Players.LocalPlayer
    local char = plr.Character
    if shiftAtivo then
        bShift.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
        bShift.BackgroundTransparency = 0.2
        plr.CameraMode = Enum.CameraMode.Classic
        if char then
            local hum = char:FindFirstChildOfClass("Humanoid")
            if hum then
                hum.CameraOffset = Vector3.new(1.5, 0.5, 0)
                hum.AutoRotate = false
            end
        end
        connShift = RunService.RenderStepped:Connect(function()
            local c = plr.Character
            if c then
                local root = c:FindFirstChild("HumanoidRootPart")
                local cam = workspace.CurrentCamera
                if root and cam then
                    local moveDir = cam.CFrame.LookVector
                    local newCF = CFrame.new(root.Position, root.Position + Vector3.new(moveDir.X, 0, moveDir.Z))
                    root.CFrame = newCF
                end
            end
        end)
    else
        bShift.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
        bShift.BackgroundTransparency = 0.35
        plr.CameraMode = Enum.CameraMode.Classic
        if char then
            local hum = char:FindFirstChildOfClass("Humanoid")
            if hum then
                hum.CameraOffset = Vector3.new(0, 0, 0)
                hum.AutoRotate = true
            end
        end
        if connShift then
            connShift:Disconnect()
            connShift = nil
        end
    end
end)

local ultimaLista = ""
task.spawn(function()
    while task.wait(0.5) do
        local listaAtual = ""
        if abaAtual == "spaw" then
            local cf = workspace:FindFirstChild("Client")
            if cf then
                local sf = cf:FindFirstChild("Spawn")
                if sf then
                    local pf = sf:FindFirstChild("Pets")
                    if pf then
                        for _, pet in pairs(pf:GetChildren()) do
                            listaAtual = listaAtual .. pet.Name .. ","
                        end
                    end
                end
            end
            if listaAtual ~= ultimaLista then
                ultimaLista = listaAtual
                atLista()
            end
        end

        if autoEquipAtivo then
            pcall(function()
                Bridge:FireServer("Bases", "Pets", "EquipBest")
            end)
        end

        if autoAtivo and rarTemFiltro() then
            local cf = workspace:FindFirstChild("Client")
            if cf then
                local sf = cf:FindFirstChild("Spawn")
                if sf then
                    local pf = sf:FindFirstChild("Pets")
                    if pf then
                        for _, pet in pairs(pf:GetChildren()) do
                            local prompt = pet:FindFirstChild("ProximityPrompt")
                            if prompt and prompt:IsA("ProximityPrompt") and prompt.Enabled then
                                local rar = "?"
                                local ui = pet:FindFirstChild("UI")
                                if ui then
                                    local ui2 = ui:FindFirstChild("UI")
                                    if ui2 then
                                        local uf = ui2:FindFirstChild("Frame")
                                        if uf then
                                            local rl = uf:FindFirstChild("Rarity")
                                            if rl then rar = rl.Text end
                                        end
                                    end
                                end
                                if rarFiltroAtiva(rar) then
                                    Bridge:FireServer("Spawn", "Pets", "Purchase", pet.Name)
                                end
                            end
                        end
                    end
                end
            end
        end

        if true then
            local listaCompra = {}
            if abaAtual == "spaw" then
                listaCompra = listarSpawn()
            elseif abaAtual == "select" then
                listaCompra = listarSelect()
            end
            for _, p in ipairs(listaCompra) do
                if petsMarcados[p.id] then
                    Bridge:FireServer("Spawn", "Pets", "Purchase", p.id)
                end
            end
        end
    end
end)

setAba("spaw")
print("PH HUB v6 CARREGADO!")
    `;
    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send(PH_HUB);
}
