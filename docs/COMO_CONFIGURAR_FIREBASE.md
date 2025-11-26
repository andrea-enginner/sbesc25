# 🔥 Como Configurar as Credenciais do Firebase

Este guia explica como obter e configurar as credenciais necessárias para conectar o projeto ao Firebase Realtime Database.

---

## 📋 Pré-requisitos

1. Ter um projeto Firebase criado
2. Ter acesso ao console do Firebase (https://console.firebase.google.com)
3. Ter o Firebase Realtime Database habilitado no projeto

---

## 🔑 Passo 1: Obter a URL do Realtime Database

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Selecione seu projeto (ex: `demeterBD`)
3. No menu lateral, clique em **"Realtime Database"**
4. Na página, você verá a URL do banco de dados, algo como:
   ```
   https://demeterbd-72054-default-rtdb.firebaseio.com
   ```
5. **Copie essa URL completa** - você precisará dela no próximo passo

---

## 🔐 Passo 2: Criar uma Service Account

A Service Account é um arquivo JSON que contém as credenciais necessárias para o backend acessar o Firebase.

### 2.1. Acessar as Configurações do Projeto

1. No console do Firebase, clique no ícone de **engrenagem** (⚙️) ao lado de "Visão geral do projeto"
2. Selecione **"Configurações do projeto"**
3. Vá para a aba **"Contas de serviço"** (Service accounts)

### 2.2. Gerar Nova Chave Privada

1. Na seção "Contas de serviço", você verá opções para Node.js, Python, etc.
2. Clique em **"Gerar nova chave privada"** (Generate new private key)
3. Uma caixa de diálogo aparecerá avisando que você está baixando uma chave privada
4. Clique em **"Gerar chave"** (Generate key)
5. Um arquivo JSON será baixado automaticamente (ex: `demeterbd-72054-firebase-adminsdk-xxxxx.json`)

⚠️ **IMPORTANTE**: Guarde esse arquivo com segurança! Ele contém credenciais sensíveis.

---

## ⚙️ Passo 3: Configurar as Variáveis de Ambiente

Agora você precisa adicionar as credenciais ao arquivo `.env.local` do projeto.

### Opção 1: Usar o JSON como String (Recomendado)

1. Abra o arquivo JSON baixado em um editor de texto
2. Copie **todo o conteúdo** do arquivo (é um JSON grande)
3. No arquivo `.env.local`, adicione:

```env
FIREBASE_DATABASE_URL=https://demeterbd-72054-default-rtdb.firebaseio.com
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"demeterbd-72054",...}'
```

⚠️ **ATENÇÃO**: 
- O JSON deve estar entre aspas simples (`'...'`)
- Se o JSON tiver quebras de linha, você pode mantê-lo em uma única linha ou usar `\n` para quebras
- Exemplo completo:

```env
FIREBASE_DATABASE_URL=https://demeterbd-72054-default-rtdb.firebaseio.com
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"demeterbd-72054","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@demeterbd-72054.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40demeterbd-72054.iam.gserviceaccount.com"}'
```

### Opção 2: Usar Caminho para Arquivo

1. Coloque o arquivo JSON baixado na raiz do projeto (ou em uma pasta segura)
2. Renomeie-o para `firebase-service-account.json` (ou outro nome de sua preferência)
3. Adicione o arquivo ao `.gitignore` para não versioná-lo:

```gitignore
# Firebase credentials
firebase-service-account.json
*.json
!package.json
!package-lock.json
!tsconfig.json
```

4. No arquivo `.env.local`, adicione:

```env
FIREBASE_DATABASE_URL=https://demeterbd-72054-default-rtdb.firebaseio.com
FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
```

---

## ✅ Passo 4: Verificar a Configuração

1. Certifique-se de que o arquivo `.env.local` existe na raiz do projeto
2. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Se houver erros, verifique:
   - Se a URL do Firebase está correta
   - Se o JSON da service account está válido
   - Se as variáveis de ambiente estão sendo carregadas corretamente

---

## 🔒 Segurança

⚠️ **NUNCA** faça commit das credenciais do Firebase no Git!

1. Certifique-se de que `.env.local` está no `.gitignore`:

```gitignore
# Environment variables
.env.local
.env*.local
```

2. Se usar a Opção 2 (arquivo JSON), adicione também:

```gitignore
# Firebase credentials
firebase-service-account.json
```

3. Se por acaso você fez commit das credenciais:
   - **Revogue imediatamente** a service account no console do Firebase
   - Gere uma nova chave privada
   - Atualize o `.env.local` com as novas credenciais

---

## 📝 Exemplo Completo de `.env.local`

```env
# Firebase Realtime Database
FIREBASE_DATABASE_URL=https://demeterbd-72054-default-rtdb.firebaseio.com

# Service Account (JSON completo como string)
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"demeterbd-72054","private_key_id":"abc123...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-xxxxx@demeterbd-72054.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40demeterbd-72054.iam.gserviceaccount.com"}'
```

---

## 🆘 Solução de Problemas

### Erro: "Variável de ambiente FIREBASE_SERVICE_ACCOUNT não configurada"

- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se as variáveis estão escritas corretamente (sem espaços extras)
- Reinicie o servidor após modificar o `.env.local`

### Erro: "Não foi possível carregar as credenciais do Firebase"

- Verifique se o JSON da service account está válido
- Se estiver usando a Opção 1 (string), certifique-se de que o JSON está entre aspas simples
- Se estiver usando a Opção 2 (arquivo), verifique se o caminho está correto

### Erro: "Permission denied" ao acessar o Firebase

- Verifique se as regras do Realtime Database permitem leitura/escrita
- No console do Firebase, vá em "Realtime Database" → "Regras"
- Para desenvolvimento, você pode usar regras temporárias (apenas para testes):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **ATENÇÃO**: Essas regras permitem acesso total! Use apenas para desenvolvimento e ajuste para produção.

---

## 📚 Referências

- [Documentação do Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Configuração do Realtime Database](https://firebase.google.com/docs/database/admin/start)
- [Segurança do Firebase](https://firebase.google.com/docs/database/security)

---

**🎉 Pronto! Agora seu projeto está configurado para usar o Firebase Realtime Database!**

