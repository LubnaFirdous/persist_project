# Spiritual Connect

Spiritual Connect is a web application that allows users to share their vision for the future, transcribe voice inputs into text, and connect with like-minded individuals who share similar beliefs.

## 🌟 Features
- Voice Transcription: Uses OpenAI's Whisper AI to convert spoken words into text.
- User Vision Storage: Saves users' visions along with their interests in MongoDB.
- User Matching: Matches users based on shared interests.
- Connection Requests: Allows users to send connection requests to like-minded individuals.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI Whisper for voice transcription

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via cloud)

### Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/YOUR_USERNAME/spiritual-connect.git
   cd spiritual-connect
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up MongoDB**
   - Start your MongoDB server:
     ```sh
     mongod
     ```
   - Ensure MongoDB is running at `mongodb://localhost:27017/spiritual-connect`

4. **Set up OpenAI API**
   - Create an OpenAI account and get your API key.
   - Add your API key in `server.js`:
     ```javascript
     const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY" });
     ```

5. **Run the Server**
   ```sh
   node server.js
   ```

6. **Access the application**
   - Open your browser and go to:  
     ```
     http://localhost:5500
     ```

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transcribe` | Transcribes voice input using OpenAI Whisper |
| POST | `/save-vision` | Saves user vision and extracts interests |
| GET | `/match-users/:userId` | Finds users with similar interests |
| POST | `/connect-users` | Sends connection requests to users |

## 🛠️ Troubleshooting
### "Cannot find module 'express'"
Run:
```sh
npm install express
```

### "MongoDB connection error"
Ensure MongoDB is running:
```sh
mongod
```

### "Connect button not working"
- Open browser console (`F12` → Console tab)
- Check for JavaScript errors or missing `data-user-id` attributes

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

