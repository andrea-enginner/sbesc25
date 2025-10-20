# 🔑 SOLUÇÃO: "Invalid API key" na Vercel

## 🚨 **Problema Identificado**
O console mostra: `Invalid API key` com status 401, o que significa que a variável `NEXT_PUBLIC_SUPABASE_ANON_KEY` não está configurada corretamente na Vercel.

## ✅ **Solução Passo a Passo**

### **1. Vá para o Dashboard da Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Entre no seu projeto
3. Vá em **Settings** → **Environment Variables**

### **2. Configure as Variáveis EXATAMENTE assim:**

**Nome da Variável:** `NEXT_PUBLIC_SUPABASE_URL`
**Valor:** `https://vbniaajmssoibcvadwzf.supabase.co`

**Nome da Variável:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Valor:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibmlhYWptc3NvaWJjdmFkd3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MTkyNDcsImV4cCI6MjA3NjQ5NTI0N30.ehbrUtfUGJ5ke3fdswSYd765L_J_3Vc-80afYyaTGsw`

### **3. ⚠️ CUIDADOS IMPORTANTES:**
- **Não adicione espaços** antes ou depois dos valores
- **NÃO** coloque aspas ao redor dos valores
- **Verifique** se o nome da variável está **EXATAMENTE** como mostrado
- Marque todas as opções: **Production**, **Preview** e **Development**

### **4. Após Configurar:**
1. **Clique em "Save"**
2. Vá para a aba **Deployments**
3. **Clique nos 3 pontos** do último deployment
4. **Selecione "Redeploy"**
5. Aguarde o novo deploy terminar

### **5. Verificação:**
Após o redeploy, acesse seu site e:
1. Pressione **F12** → **Console**
2. Deve aparecer:
   - `✅ URL definida: true`
   - `✅ Key definida: true`
   - `✅ [VERCEL DEBUG] Conexão com Supabase OK`

## 🔍 **Se Ainda Não Funcionar:**

### **Verificar se as Variáveis Estão Corretas no Supabase:**
1. Acesse seu projeto no [supabase.com](https://supabase.com)
2. Vá em **Settings** → **API**
3. **Copie novamente** a `anon public` key
4. Compare com o valor configurado na Vercel

### **Possíveis Problemas:**
1. **Variável não foi salva** → Tente deletar e recriar
2. **Nome incorreto** → Deve ser exatamente `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Não fez redeploy** → Sempre faça redeploy após alterar variáveis

## 📋 **Checklist Final:**
- [ ] Variáveis configuradas na Vercel
- [ ] Nomes exatos das variáveis
- [ ] Valores sem aspas ou espaços
- [ ] Todas as environments marcadas (Production/Preview/Development)
- [ ] Redeploy feito após configuração
- [ ] Console mostra conexão OK
