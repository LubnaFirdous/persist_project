const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { OpenAI } = require("openai");
const mongoose = require("mongoose");

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API Setup (for Whisper AI)
const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY" });

// MongoDB Setup (Replace with your DB connection)
mongoose.connect("mongodb://127.0.0.1:27017/spiritual-connect")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    vision: String,
    interests: [String],
});
const User = mongoose.model("User", UserSchema);

// Multer Setup for Handling Audio Files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// **Route 1: Transcribe Voice Data (AI Processing)**
app.post("/transcribe", upload.single("audio"), async (req, res) => {
    try {
        const audioBuffer = req.file.buffer;
        const response = await openai.audio.transcriptions.create({
            file: audioBuffer,
            model: "whisper-1",
        });

        const transcribedText = response.text;
        res.json({ transcription: transcribedText });
    } catch (error) {
        console.error("Error transcribing:", error);
        res.status(500).json({ error: "Transcription failed." });
    }
});

// **Route 2: Save User Vision**
app.post("/save-vision", async (req, res) => {
    const { name, vision } = req.body;
    const interests = extractInterests(vision); // NLP-based interest extraction (basic)

    const newUser = new User({ name, vision, interests });
    await newUser.save();
    res.json({ message: "User vision saved!", interests });
});

// **Route 3: Match Users by Interests**
app.get("/match-users/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Find users with similar interests, excluding the current user
        const matches = await User.find({
            _id: { $ne: user._id }, // Exclude the current user
            interests: { $in: user.interests }
        }).limit(5);

        res.json({ matches });
    } catch (error) {
        console.error("Error finding matches:", error);
        res.status(500).json({ error: "Failed to find matches." });
    }
});

// **Route 4: Connect Two Users**
app.post("/connect-users", async (req, res) => {
    const { userId, connectWithId } = req.body;

    try {
        const user = await User.findById(userId);
        const connectWith = await User.findById(connectWithId);

        if (!user || !connectWith) {
            return res.status(404).json({ message: "User not found" });
        }

        // Simulate connection (You can store connections in the database)
        res.json({ message: `You are now connected with ${connectWith.name}!` });
    } catch (error) {
        console.error("Error connecting users:", error);
        res.status(500).json({ error: "Connection failed." });
    }
});

app.post("/connect-users", async (req, res) => {
    const { userId, connectWithId } = req.body;

    if (!userId || !connectWithId) {
        return res.status(400).json({ message: "Invalid user data!" });
    }

    console.log(`User ${userId} wants to connect with ${connectWithId}`);

    // Example: You could save this connection in MongoDB
    res.json({ message: `Connection request sent to user ${connectWithId}` });
});



// **Basic NLP for Interest Extraction (You can replace this with AI)**
function extractInterests(text) {
    const keywords = ["spirituality", "meditation", "self-growth", "divine", "soul"];
    return keywords.filter((word) => text.toLowerCase().includes(word));
}

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
.3
