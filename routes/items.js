const  express = require("express");

const  Item = require("../models/Item.js");


const router = express.Router();

// Create
router.post("/", async (req, res) => {
 
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    // await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
      if (isNaN(postId)) {
      return res.status(400).json({ error: "Invalid number parameter" });
    }
    
    const item = await Item.findOne({ postId: parseInt(postId) });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update by postId
router.put("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedItem = await Item.findOneAndUpdate(
      { postId: parseInt(postId) },
      req.body, 
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
