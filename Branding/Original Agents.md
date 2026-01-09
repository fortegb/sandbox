Skip to content
Chat history



You said:
PLease format the following text into an agents.md file




### **1. ABOUT MYSELF**
I am an old-school developer, my background is in engineering (I have a MSc in Engineering) and I was comfortable in programing in Ansi C on Linux environments during the 1990s and 2000s and then also with LAMP stack for web applications. Today I am Vice-President of Technology on a IT Distribution Company in São Paulo, Brazil. I conduct the interactions with AI in English but the deliverables (web sites, applications etc) must be in Brazilian Portuguese, mandatory. 
###=============================================


### **2. ABOUT THE COMPANY**
I own a house construction company, ForteGB, fortegb.com, in partnership with my brother-in-law and my nephew. 

We buy land, build houses on it and sell the houses for a profit. This is not our main source of income and occupationg, we have our day jobs, I am a Vice President of Technology on an IT Distribution Company, so, we would like to use AI to help os attend to some needs of the company. 

The company is a family-owned business, and for that we would like to build on the strenghts of being a family business: transparency, trust, closeness, openess.

Our customers, people who bought our houses mention that, they preffered to do business with us due to the trust we impressed on the negotiation, the openess and transparency with which we presented the products, the houses, and with which we conduct the negotiations and the whole deal. 

We are based in Campinas-SP Brazil, the largest non-capital city in the country, a region noted for the economiuc and technology power of its industries, universities and human resources. For that we want also to imply a technology aspect to our business whcih will be described later in this document. Keep this location in context when doing research on even when location is relevant for your deliverables (ex selecting stock images etc)

The company has logos, its accent color and other branding material already defined. Once you have processed this file, ask me to updload this material so that you use it further on. 

A proposed slogan for the company may be "Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui" 
###=============================================


### **3. THE TECHNOLOGY NEEDS**
Since we are part-time realstate and construction company, we need the help of technology to showcase, promote our house, but also to provide some accessory services related to the selling of the houses. I will describe briefly each, I think we can detail further once you process this iniital file and as we proceed with each step of the project. 


### **3.1 Company Website**

### **3.1.1 Main Website**

This is the main tool we will need to create and maintain. It is the website hosted on our main domain fortegb.com. It should act as a a institutional website with information about the company, keeping in mind the company definitions I gave previously. 

The website should have a modern clean look, use a hero image (I can provide one), have as main sessions a Home, with a call to action to contacg us via whatsaa, a Portfolio showcasing the houses with pictures, plans, and descriptive information about each house, an About session in which we present our company and a blog session in which we will post relevant content to prospective customers. A Contact page as well, but since we are a small company without an office we would like to highlight whatsapp and email contact. 

I would like you to help me create content for a certain number of blog posts. I would also like the content of the several parts of the website to be generated with the help of AI. 

### **3.1.2 Self-Guided Tour Funcionality**
Another functionality for the website, probably from each house's entry on the portfolio, in which a visitor could book a self-guided tour in a house in which he/she is interested. We will need to work through this as we go, but in basic terms, when I user wants to book a visit he should click to book it, a form will pop in to collect his name, cell phone number for whatsapp call, and a call to take a photo of the person and validate it against an uploaded documento (the RG or CNH for example), once the ID validation is done, the website will create a visit entry on a calendar, will generate a password and via API, write the password to the Smart-Lock of the house. This should be done using the Tuya line of products, using the Tuya API.

Besides booking a visit from the website, a customer standing in front of the house should be able to register for a self-guided tour imediately, following the same process, of ID validation and password generation via API. The customer will start this process by scanning a QR-Code on a Sale Plaque in front of the house, that would take him to a page of the website (perhaps the same house portfolio page, not sure) and he will be able to perform the ID validation and receive the Password for the Lock, ideally via whatsapp message on his phone. With that, he can immediatly enter the house and know it from the inside.

Details shall be given while discussing the details of such functionality


### **3.1.3 CRM Lead Registration**
I will adopt a basic SaaS CRM, most likely Hubspot, to track leads and do some other customer related functions. ONe functionality I need, is to have a logged area of the website in which realtors can register eventual leads they bring to a certain house. The idea is: a realtor takes a customer to the house. That customer should be registered to that realtor. I will have agreements with realtors, registered ones, in which I commit to, in case the house is sold to one of his/her registered lead, the comission will be paid to the realtor. This way the realtor is not put in risk of being left aside if the customer contacts us directly, and the realtor will be safe to take people to visit the house, while ensuring he will get the comissions. We shoudl also register customers who are leads that came directly to us. All that should be entered via a page in our website, should be reported back to each realtor or to us, via integrations with Hubspot. 

I will need your help to also configure and structure Hubspot so that it fits our usage.


### **3.2 Social Media**

I will need your help to generate a mass of ideas of posts and the posts themselves, for publication on Instagram, Facebook and (optional) TikTok. As we do not have time dedicated for a continuous interation, ideally you should propose, example, 100 posts with content fir to our audience, parts of it could be ads for the houses, but parts could be short stories about building or buying a house having our prospective customers in mind. The idea is to promote the houses and our website, and ultimately the company. The main goal is to accelerate the selling of the houses when they are being built. 

###=============================================

### **4. HOW SHOULD I INTERACT WITH AI AND PROJECT PLAN**
All these steps are quite complex and I would like to work togther with AI to help me. Not sure how shoudl I do it. But basically, you (AI) should parse this information and generate a project plan with phases, in which I would go working with you AI, please confirm. 

Should I do all the work with you, or should you recommend I do some parts of it in another AI tool. Example: I had very good results using Manus to do the actual design of the site, it was quite professional, and good looking. I did not have the same quality with ChatGPT, Gemini. SHould I do the desing in Lovable for example? Help me define this. 

###=============================================

### **5. TECHNOLOGY STACK**
One of the first phases is to define the technology stack of the website and the applications/functionalities. After a previous work with Manus, the suggested Tech Stack was: 

| Layer                  | Tool                                       | Purpose                                                           |
| ---------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| **Frontend + Backend** | **Nuxt 3 (Vue 3)**                         | Unified framework for pages, components, and backend API routes.  |
| **Styling**            | **Tailwind CSS + DaisyUI**                 | Fast, modern, responsive UI design.                               |
| **CMS**                | **Contentful** (cloud-hosted headless CMS) | Editors manage listings, blogs, and marketing content via API.    |
| **Database**           | Optional: PostgreSQL / MySQL               | For internal business data (expenses, tours).                     |
| **Hosting**            | **Vercel**                                 | Auto-deploy Nuxt app from GitHub; supports static and SSR builds. |
| **Editor / IDE**       | **Cursor**                                 | AI-assisted coding + manual hybrid development.                   |
| **Version Control**    | **GitHub**                                 | Repository, branching, collaboration, CI/CD integration.          |

Besides that, Hubspot should be the CRM. 

For the API-enabled Smart Locks, Tuya is recommended with its Tuya API

PLease evaluate if these options are good for my needs and recommend if something else.

###=============================================


That is it, now let us work togehter preparing the detailed plan and taking the indicated suggestions, definitios, uploads, etc. 
ChatGPT said:

Thought for 14s
# agents.md — ForteGB (Project Context + Agent Instructions)

> **Primary rule:** I (the user) will interact with AI in **English**, but **ALL deliverables** (website copy, UI text, blog posts, social posts, emails, pages, etc.) **MUST be in Brazilian Portuguese (pt-BR)**. This is mandatory.

---

## 1) About Me (User)
- Old-school developer with engineering background (**MSc in Engineering**).
- Experience: **ANSI C on Linux (1990s–2000s)** and **LAMP stack** for web apps.
- Current role: **Vice-President of Technology** at an **IT Distribution Company** in **São Paulo, Brazil**.
- Working mode:
  - Communication with AI: **English**
  - Outputs/deliverables: **pt-BR**

---

## 2) About the Company (ForteGB)
- Company: **ForteGB**
- Website/domain: **fortegb.com**
- Ownership: family business, run in partnership with **brother-in-law** and **nephew**.
- Business model:
  - Buy land → build houses → sell for profit
  - Part-time operation (owners have day jobs)

### 2.1 Brand positioning
We want to build on the strengths of being a family-owned company:
- **Transparency**
- **Trust**
- **Closeness**
- **Openness**

Customer feedback indicates they chose us due to:
- Trust during negotiation
- Transparency and openness in presenting the product (houses) and in the deal process

### 2.2 Location context (important)
- Based in **Campinas-SP, Brazil** (largest non-capital city in the country).
- Region known for strong economy/industry, universities, and tech talent.
- **Instruction:** keep this location in context for research and deliverables (e.g., stock images, references, tone, examples, local assumptions).

### 2.3 Branding assets
- ForteGB already has:
  - Logos
  - Accent color
  - Branding material
- **After processing this file:** ask the user to **upload brand assets** so they can be used consistently.

### 2.4 Proposed slogan (draft)
> “Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui.”

---

## 3) Technology Needs

### 3.1 Company Website

#### 3.1.1 Main Website (fortegb.com)
Goal: modern, clean institutional site consistent with the brand and positioning.

Required pages/sections:
- **Home**
  - Hero image (user can provide)
  - CTA emphasizing **WhatsApp** contact
- **Portfólio**
  - Houses with pictures, plans, and descriptive info
- **Sobre**
  - Company story, trust/transparency, family business values
- **Blog**
  - Relevant content for prospective customers (AI-assisted content)
- **Contato**
  - Emphasize **WhatsApp + email** (small company, no office)

Content production:
- AI should help generate:
  - Page copy
  - Blog posts (quantity to be defined; user wants help creating many posts)

#### 3.1.2 Self-Guided Tour (Booking + Smart Lock)
From each house listing (portfolio), allow a visitor to book a self-guided tour.

High-level flow:
1. User clicks to book a visit
2. Form collects:
   - Name
   - Mobile number (for WhatsApp)
3. Identity verification:
   - Take photo/selfie
   - Validate against uploaded document (RG or CNH)
4. If approved:
   - Create visit entry on a calendar
   - Generate a password
   - Use API to write password to the house Smart Lock
   - Use **Tuya** products + **Tuya API**

On-site “instant visit” flow:
- Customer at the house scans a **QR code** on the sale plaque
- QR opens a website page (possibly the same listing page)
- Same verification + password generation
- Deliver password ideally via **WhatsApp message**
- Customer enters immediately

> Details will be refined later during implementation discussion.

#### 3.1.3 CRM Lead Registration (HubSpot)
Goal: track leads and associate realtor-owned leads to prevent disputes and ensure commissions.

Requirements:
- Use a SaaS CRM (likely **HubSpot**)
- Website has a **logged area** for realtors to register leads tied to a house
- If a registered lead buys, realtor gets commission
- Also register leads that come directly to ForteGB
- Data should sync back to HubSpot
- Reports/visibility for each realtor and for ForteGB

Instruction:
- AI should help:
  - Define the workflow
  - Configure HubSpot pipeline/fields/automation
  - Plan the integration points from the website

---

### 3.2 Social Media (Content Engine)
Need help generating:
- A large set of post ideas (e.g., **100 posts**)
- The actual posts for:
  - Instagram
  - Facebook
  - Optional: TikTok

Content mix:
- House ads (during construction and sales phase)
- Short stories / educational posts about building or buying a house
- Target: prospective home buyers in the Campinas-SP context

Primary goal:
- Accelerate sales while houses are being built
- Drive traffic to the website and convert leads

---

## 4) How to Work With AI + Project Plan
Expectation:
- AI should parse this file and produce a **phased project plan** to execute:
  - Website creation
  - Tour functionality
  - CRM integration
  - Social content engine

Decision to make:
- What should be done inside ChatGPT vs other tools (e.g., Manus, Lovable, etc.)
- User notes: Manus produced more professional design results than ChatGPT/Gemini in prior experience.
- AI should propose a workflow:
  - Where to design (tool choice)
  - Where to implement (code, content, integrations)
  - How to iterate efficiently with minimal back-and-forth

---

## 5) Proposed Technology Stack (from prior work)
Suggested stack:

| Layer                  | Tool                                       | Purpose                                                           |
| ---------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| Frontend + Backend     | Nuxt 3 (Vue 3)                              | Unified framework for pages, components, backend API routes       |
| Styling                | Tailwind CSS + DaisyUI                      | Fast, modern, responsive UI                                       |
| CMS                    | Contentful (headless CMS)                   | Manage listings, blog, marketing content via API                  |
| Database (optional)    | PostgreSQL / MySQL                          | Internal business data (expenses, tours)                          |
| Hosting                | Vercel                                      | Auto-deploy from GitHub; supports static + SSR                    |
| Editor / IDE           | Cursor                                      | AI-assisted coding + manual development                           |
| Version Control        | GitHub                                      | Repo, branching, collaboration, CI/CD                             |

Additional systems:
- CRM: **HubSpot**
- Smart locks: **Tuya** + **Tuya API**

Instruction:
- AI should evaluate if these are good options for the needs and recommend changes if necessary.

---

## 6) Agent Operating Rules (How to Respond)
- Deliverables must be in **pt-BR** unless the user explicitly asks otherwise.
- Do not invent missing facts (prices, legal rules, specs, schedules, etc.). If uncertain, state assumptions clearly.
- Keep outputs clean and structured; avoid unnecessary verbosity.
- Keep ForteGB brand attributes present in copy:
  - trust, transparency, family business, closeness
- Keep Campinas-SP context in mind for:
  - tone, imagery, examples, and localized assumptions

---

## 7) Required Inputs (Request to User)
After reading/processing this file, ask the user to upload:
1. ForteGB **logo files** (SVG/PNG/PDF if available)
2. **Brand guide** (colors, typography, spacing, usage rules)
3. Any existing **hero image** candidate(s)
4. Current portfolio list (houses, status, basic details) if available

---

## 8) Next Step
Generate a phased project plan and propose:
- Tooling workflow (ChatGPT vs Manus/Lovable/etc.)
- Website IA (information architecture) + copy plan (pt-BR)
- Integration plan (HubSpot + Tuya + calendar + identity validation)
- Social content pipeline (100-post plan + templates)




No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.
ChatGPT says: ```markdown # agents.md — ForteGB (Project Context + Agent Instructions) > **Primary rule:** I (the user) will interact with AI in **English**, but **ALL deliverables** (website copy, UI text, blog posts, social posts, emails, pages, etc.) **MUST be in Brazilian Portuguese (pt-BR)**. This is mandatory. --- ## 1) About Me (User) - Old-school developer with engineering background (**MSc in Engineering**). - Experience: **ANSI C on Linux (1990s–2000s)** and **LAMP stack** for web apps. - Current role: **Vice-President of Technology** at an **IT Distribution Company** in **São Paulo, Brazil**. - Working mode: - Communication with AI: **English** - Outputs/deliverables: **pt-BR** --- ## 2) About the Company (ForteGB) - Company: **ForteGB** - Website/domain: **fortegb.com** - Ownership: family business, run in partnership with **brother-in-law** and **nephew**. - Business model: - Buy land → build houses → sell for profit - Part-time operation (owners have day jobs) ### 2.1 Brand positioning We want to build on the strengths of being a family-owned company: - **Transparency** - **Trust** - **Closeness** - **Openness** Customer feedback indicates they chose us due to: - Trust during negotiation - Transparency and openness in presenting the product (houses) and in the deal process ### 2.2 Location context (important) - Based in **Campinas-SP, Brazil** (largest non-capital city in the country). - Region known for strong economy/industry, universities, and tech talent. - **Instruction:** keep this location in context for research and deliverables (e.g., stock images, references, tone, examples, local assumptions). ### 2.3 Branding assets - ForteGB already has: - Logos - Accent color - Branding material - **After processing this file:** ask the user to **upload brand assets** so they can be used consistently. ### 2.4 Proposed slogan (draft) > “Construindo sonhos e realizando vidas através de projetos imobiliários de qualidade. Sua nova casa está aqui.” --- ## 3) Technology Needs ### 3.1 Company Website #### 3.1.1 Main Website (fortegb.com) Goal: modern, clean institutional site consistent with the brand and positioning. Required pages/sections: - **Home** - Hero image (user can provide) - CTA emphasizing **WhatsApp** contact - **Portfólio** - Houses with pictures, plans, and descriptive info - **Sobre** - Company story, trust/transparency, family business values - **Blog** - Relevant content for prospective customers (AI-assisted content) - **Contato** - Emphasize **WhatsApp + email** (small company, no office) Content production: - AI should help generate: - Page copy - Blog posts (quantity to be defined; user wants help creating many posts) #### 3.1.2 Self-Guided Tour (Booking + Smart Lock) From each house listing (portfolio), allow a visitor to book a self-guided tour. High-level flow: 1. User clicks to book a visit 2. Form collects: - Name - Mobile number (for WhatsApp) 3. Identity verification: - Take photo/selfie - Validate against uploaded document (RG or CNH) 4. If approved: - Create visit entry on a calendar - Generate a password - Use API to write password to the house Smart Lock - Use **Tuya** products + **Tuya API** On-site “instant visit” flow: - Customer at the house scans a **QR code** on the sale plaque - QR opens a website page (possibly the same listing page) - Same verification + password generation - Deliver password ideally via **WhatsApp message** - Customer enters immediately > Details will be refined later during implementation discussion. #### 3.1.3 CRM Lead Registration (HubSpot) Goal: track leads and associate realtor-owned leads to prevent disputes and ensure commissions. Requirements: - Use a SaaS CRM (likely **HubSpot**) - Website has a **logged area** for realtors to register leads tied to a house - If a registered lead buys, realtor gets commission - Also register leads that come directly to ForteGB - Data should sync back to HubSpot - Reports/visibility for each realtor and for ForteGB Instruction: - AI should help: - Define the workflow - Configure HubSpot pipeline/fields/automation - Plan the integration points from the website --- ### 3.2 Social Media (Content Engine) Need help generating: - A large set of post ideas (e.g., **100 posts**) - The actual posts for: - Instagram - Facebook - Optional: TikTok Content mix: - House ads (during construction and sales phase) - Short stories / educational posts about building or buying a house - Target: prospective home buyers in the Campinas-SP context Primary goal: - Accelerate sales while houses are being built - Drive traffic to the website and convert leads --- ## 4) How to Work With AI + Project Plan Expectation: - AI should parse this file and produce a **phased project plan** to execute: - Website creation - Tour functionality - CRM integration - Social content engine Decision to make: - What should be done inside ChatGPT vs other tools (e.g., Manus, Lovable, etc.) - User notes: Manus produced more professional design results than ChatGPT/Gemini in prior experience. - AI should propose a workflow: - Where to design (tool choice) - Where to implement (code, content, integrations) - How to iterate efficiently with minimal back-and-forth --- ## 5) Proposed Technology Stack (from prior work) Suggested stack: | Layer | Tool | Purpose | | ---------------------- | ------------------------------------------ | ----------------------------------------------------------------- | | Frontend + Backend | Nuxt 3 (Vue 3) | Unified framework for pages, components, backend API routes | | Styling | Tailwind CSS + DaisyUI | Fast, modern, responsive UI | | CMS | Contentful (headless CMS) | Manage listings, blog, marketing content via API | | Database (optional) | PostgreSQL / MySQL | Internal business data (expenses, tours) | | Hosting | Vercel | Auto-deploy from GitHub; supports static + SSR | | Editor / IDE | Cursor | AI-assisted coding + manual development | | Version Control | GitHub | Repo, branching, collaboration, CI/CD | Additional systems: - CRM: **HubSpot** - Smart locks: **Tuya** + **Tuya API** Instruction: - AI should evaluate if these are good options for the needs and recommend changes if necessary. --- ## 6) Agent Operating Rules (How to Respond) - Deliverables must be in **pt-BR** unless the user explicitly asks otherwise. - Do not invent missing facts (prices, legal rules, specs, schedules, etc.). If uncertain, state assumptions clearly. - Keep outputs clean and structured; avoid unnecessary verbosity. - Keep ForteGB brand attributes present in copy: - trust, transparency, family business, closeness - Keep Campinas-SP context in mind for: - tone, imagery, examples, and localized assumptions --- ## 7) Required Inputs (Request to User) After reading/processing this file, ask the user to upload: 1. ForteGB **logo files** (SVG/PNG/PDF if available) 2. **Brand guide** (colors, typography, spacing, usage rules) 3. Any existing **hero image** candidate(s) 4. Current portfolio list (houses, status, basic details) if available --- ## 8) Next Step Generate a phased project plan and propose: - Tooling workflow (ChatGPT vs Manus/Lovable/etc.) - Website IA (information architecture) + copy plan (pt-BR) - Integration plan (HubSpot + Tuya + calendar + identity validation) - Social content pipeline (100-post plan + templates) ```