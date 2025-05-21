const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const redis = req.app.locals.redis;
        const { id, name, description } = req.body;

        if (!id) return res.status(400).json({ error: 'ID is required' });

        await redis.hSet(`item:${id}`, { name, description });
        res.status(201).json({ id, name, description });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const redis = req.app.locals.redis;
        const keys = await redis.keys('item:*');
        const items = [];

        for (const key of keys) {
            const item = await redis.hGetAll(key);
            items.push({ [key]: item });
        }

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const redis = req.app.locals.redis;
        const item = await redis.hGetAll(`item:${req.params.id}`);

        if (!item || Object.keys(item).length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const redis = req.app.locals.redis;
        const key = `item:${req.params.id}`;

        if (!(await redis.exists(key))) {
            return res.status(404).json({ error: 'Item not found' });
        }

        await redis.hSet(key, req.body);
        const updatedItem = await redis.hGetAll(key);
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const redis = req.app.locals.redis;
        const key = `item:${req.params.id}`;

        if (!(await redis.del(key))) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;