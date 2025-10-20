# 🔍 Garantindo que os Dados Apareçam no Deploy

## ✅ **Checklist para Dados no Deploy:**

### 1. **Variáveis de Ambiente na Vercel** 🔑
Certifique-se de que estas variáveis estão configuradas **EXATAMENTE** como abaixo:

```
NEXT_PUBLIC_SUPABASE_URL = https://vbniaajmssoibcvadwzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibmlhYWptc3NvaWJjdmFkd3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MTkyNDcsImV4cCI6MjA3NjQ5NTI0N30.ehbrUtfUGJ5ke3fdswSYd765L_J_3Vc-80afYyaTGsw
```

**Como verificar na Vercel:**
1. Vá em **Project Settings** → **Environment Variables**
2. Verifique se as 2 variáveis estão lá (sem a EXAMPLE_NAME)
3. Certifique-se que estão marcadas para **Production**, **Preview** e **Development**

### 2. **Banco Supabase** 🗄️

#### **Verificar se as políticas RLS estão corretas:**
Execute este script no **SQL Editor** do Supabase:

```sql
-- Verificar políticas existentes
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('parametros_solo', 'parametros_climaticos')
ORDER BY tablename, policyname;
```

**Se não houver políticas, execute o fix:**
```sql
-- Corrigir políticas RLS
DROP POLICY IF EXISTS "Permitir leitura parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir inserção parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir leitura parametros climaticos" ON parametros_climaticos;
DROP POLICY IF EXISTS "Permitir inserção parametros climaticos" ON parametros_climaticos;

CREATE POLICY "Permitir leitura parametros solo" ON parametros_solo FOR SELECT USING (true);
CREATE POLICY "Permitir inserção parametros solo" ON parametros_solo FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura parametros climaticos" ON parametros_climaticos FOR SELECT USING (true);
CREATE POLICY "Permitir inserção parametros climaticos" ON parametros_climaticos FOR INSERT WITH CHECK (true);
```

#### **Verificar se há dados:**
```sql
-- Contar registros
SELECT 
    (SELECT COUNT(*) FROM parametros_solo) as total_solo,
    (SELECT COUNT(*) FROM parametros_climaticos) as total_clima;
```

### 3. **Teste Local** 🧪
Antes do deploy, teste localmente:
```bash
npm run build
npm run start
```

Abra no browser e verifique o **Console (F12)** para ver os logs:
- ✅ `🔄 Buscando dados do Supabase...`
- ✅ `✅ Dados do solo: X registros`
- ✅ `✅ Dados climáticos: X registros`

### 4. **Depois do Deploy** 🌐

#### **Verificar no site de produção:**
1. Acesse sua URL da Vercel
2. Abra o **Console do Browser (F12)**
3. Procure por mensagens como:
   - `🔄 Buscando dados do Supabase...`
   - `✅ Dados do solo: X registros`
   - `✅ Dados climáticos: X registros`

#### **Se aparecer erro, verifique:**
- **403/401**: Problema nas políticas RLS
- **Network Error**: URL ou chave incorreta
- **0 registros**: Não há dados no banco

## 🚨 **Problemas Comuns:**

### **"Nenhum dado disponível"**
1. **Execute o script `setup-completo.sql`** no Supabase
2. **Verifique as políticas RLS** executando o script de correção acima

### **CORS Error**
- Normalmente não acontece com Supabase, mas se acontecer, verifique se a URL está correta

### **Variáveis não carregam**
1. Verifique se estão configuradas na Vercel
2. Certifique-se que começam com `NEXT_PUBLIC_`
3. Faça um novo deploy após adicionar variáveis

## 🔧 **Debug no Deploy:**

Adicione este código temporário no Dashboard para debug:

```javascript
console.log('🔍 Debug Deploy:')
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Key (primeiros chars):', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20))
```

Se alguma variável aparecer como `undefined`, há problema na configuração da Vercel.
