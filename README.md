# 🌱 EcoSnap – Sustainability Scanner

EcoSnap is an AI-powered sustainability awareness application that helps users evaluate the environmental impact of everyday products. By using image-based analysis and generative AI, the app provides eco scores, greener alternatives, and waste segregation guidance to promote eco-friendly living.

<img width="1920" height="1080" alt="Untitled design (7)" src="https://github.com/user-attachments/assets/a94a1c4c-43ad-4dba-a1a0-3b5aaeba05c6" />


## 🚀 Features

### 📷 Product Sustainability Scanner
- Upload or scan product images  
- AI identifies product type and material  
- Generates an **Eco Score (1–10)**  
- Provides environmental impact explanation  
- Gives eco-friendly tips  


### 🌍 Greener Alternatives
- Suggests eco-friendly substitutes  
- Encourages reusable and biodegradable products  
- Helps users make sustainable choices  



### 🗑️ Waste Segregation Guide
- Classifies waste into:
  - Wet Waste  
  - Dry Waste  
  - E-Waste  
- Provides disposal tips  



## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- HTML/CSS
- JavaScript

**AI Integration**
- Google Gemini API (AI Studio)
- Multimodal AI (Image + Text understanding)

**Other Tools**
- REST API calls
- JSON data handling
- Image upload/camera input



## 🧠 How It Works

1. User uploads/scans a product image  
2. Image is sent to Gemini AI API  
3. AI analyzes product type and materials  
4. AI generates:
   - Eco Score  
   - Explanation  
   - Tips  
   - Alternatives  
5. Results displayed in user-friendly cards  



## 📂 Project Structure
EcoSnap/
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
│
├── public/
├── package.json
└── README.md



## ⚙️ Installation

### 1️⃣ Clone the Repository
git clone https://github.com/beingnehallish/EcoSnap---Sustainability-Scanner.git

### 2️⃣ Install Dependencies
npm install


### 3️⃣ Add Environment Variables
Create `.env` file:
VITE_GEMINI_API_KEY=your_api_key_here


### 4️⃣ Run the App
npm run dev



## 🔐 Security
- API keys stored in environment variables  
- No personal user data stored  
- Stateless AI requests  


## 🌱 Future Enhancements
- Barcode scanning  
- Carbon footprint tracking  
- User eco-history dashboard  
- Gamification (Eco Points & Rewards)  
- Product sustainability database  



## 🎯 Objective

To make sustainability decisions simple and accessible by turning complex environmental data into easy AI-driven insights.

---

## 👨‍💻 Author
Developed as an AI prototype project to promote sustainable living and environmental awareness.



## 📜 License
This project is for educational and prototype purposes.


