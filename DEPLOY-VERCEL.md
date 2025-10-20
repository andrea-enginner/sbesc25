# 🚀 Deploy na Vercel - SBESC 2025

## ✅ Por que Vercel é perfeita para este projeto:
- 🎯 **Otimizada para Next.js** (mesma empresa)
- 🔒 **Variáveis de ambiente** seguras
- ⚡ **Deploy automático** do GitHub
- 🌍 **CDN global** para performance
- 🔐 **HTTPS** automático

## 📋 Passo a Passo:

### 1. **Vercel CLI** (Opção A - Recomendada)
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer login na Vercel
vercel login

# Deploy (na pasta do projeto)
vercel

# Para produção
vercel --prod
```

### 2. **Interface Web** (Opção B)
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique **"New Project"**
4. Importe seu repositório `sbesc25`
5. Configure as variáveis de ambiente
6. Clique **"Deploy"**

## 🔑 **Variáveis de Ambiente na Vercel:**

### **O que configurar:**
```
NEXT_PUBLIC_SUPABASE_URL = https://vbniaajmssoibcvadwzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibmlhYWptc3NvaWJjdmFkd3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MTkyNDcsImV4cCI6MjA3NjQ5NTI0N30.ehbrUtfUGJ5ke3fdswSYd765L_J_3Vc-80afYyaTGsw
```

### **Como configurar na interface:**
1. **Project Settings** → **Environment Variables**
2. Adicione cada variável:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://vbniaajmssoibcvadwzf.supabase.co`
   - **Environments**: Production, Preview, Development

## 🛠️ **Configuração Automática:**

### **vercel.json** (opcional, mas recomendado)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

## 📊 **Comandos Úteis:**
```bash
# Build local para testar
npm run build

# Testar produção localmente
npm run start

# Ver logs do deploy
vercel logs

# Remover deploy
vercel remove
```

## 🔍 **Verificações:**

### **Antes do Deploy:**
- [x] Arquivo `.env.local` está no `.gitignore`
- [x] Projeto compila sem erros (`npm run build`)
- [x] Variáveis de ambiente configuradas na Vercel
- [x] Banco Supabase com dados de teste

### **Após o Deploy:**
- [x] URL da Vercel funciona
- [x] Dashboard carrega dados do Supabase
- [x] Não há erros no console
- [x] HTTPS ativo

## 🌐 **URL Final:**
Após o deploy, você terá uma URL como:
`https://sbesc25-[hash].vercel.app`

## 🚨 **Troubleshooting:**
- **Build error**: Verifique se `npm run build` funciona localmente
- **Dados não carregam**: Confirme variáveis de ambiente na Vercel
- **Supabase error**: Verifique políticas RLS no banco
