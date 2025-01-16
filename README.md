# 1-800-call-it-in ☎️

https://github.com/user-attachments/assets/8002ac78-0cdc-4ccc-8b26-2cac90c03a67

This is an extension that you can sideload into Chrome for calling in orders to restaurants from Grubhub. Why? Because delivery apps often take something between 5-20% of an order as a fee for their service. Sometimes this fee is foisted onto you, the customer. Other times, restaurants just eat the cost. Everybody gets fucked — not great! This application side-steps the middle-man by using some very modern technology (LLMs for input, transcribing, and interpreting transcription; generative voice models) on some very old rails (the good ol' telephone).

This is a pretty uninspired use case, and I'll probably just be leaving this one as is.

Some topics this application covers:

- Developing Chrome extensions with TypeScript
- Working with structured outputs API
- Basic LangChain usage

Some things this application does not cover:

- Strict type security between client and server
- Authentication
- Unit testing

### Dev setup

To try out this application:

1. Pull it down via `git clone`
2. Obtain [Vapi](https://docs.vapi.ai/quickstart/dashboard) and [OpenAI](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key) API keys.
3. Create an `.env` file in the root of the `/secrets` directory, using the `env.example` as a template.
4. To run your dev environment: run the following sequence of commands:

```
pnpm install
cd scripts
pnpm secrets
chmod +x ./src/db.sh
./src/db.sh init
cd -
pnpm dev
```

5. To build and try out in Chrome:

```
cd packages/extension
pnpm build
```

... and then sideload into Chrome via `chrome://extensions`.
