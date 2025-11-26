# ⚡ Configuração Rápida do Firebase

## ✅ Arquivos já criados:

1. ✅ `firebase-service-account.json` - Credenciais do Firebase (já salvo na raiz do projeto)

## 📝 Próximo passo: Criar o arquivo `.env.local`

Crie um arquivo chamado `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
FIREBASE_DATABASE_URL=https://demeterbd-72054-default-rtdb.firebaseio.com
FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
```

## 🚀 Testar a conexão

Após criar o `.env.local`, reinicie o servidor:

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🧪 Testar a API

Você pode testar inserindo dados via curl ou Postman:

```bash
curl -X POST http://localhost:3000/api/parametro-solo \
  -H "Content-Type: application/json" \
  -d '{"ph": 6.8}'
```

## ✅ Verificar no Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Vá em **Realtime Database**
3. Você deve ver os dados em `parametro_solo/`

## 🔒 Segurança

✅ O arquivo `firebase-service-account.json` já está no `.gitignore`
✅ O arquivo `.env.local` também está protegido

**NUNCA** faça commit desses arquivos no Git!

