const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const session = req.app.locals.neo4j.session();
    try {
        const { name, description } = req.body;
        const result = await session.executeWrite(tx => tx.run(
            `CREATE (n:Item {name: $name, description: $description, createdAt: datetime()})
         RETURN n`,
            { name, description }
        ));

        const node = result.records[0].get('n');
        res.status(201).json(node.properties);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    } finally {
        await session.close();
    }
});

router.get('/', async (req, res) => {
    const session = req.app.locals.neo4j.session();
    try {
        const result = await session.executeRead(tx => tx.run(
            'MATCH (n:Item) RETURN n ORDER BY n.createdAt DESC'
        ));

        const items = result.records.map(record => record.get('n'));
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    } finally {
        await session.close();
    }
});

router.get('/:id', async (req, res) => {
    const session = req.app.locals.neo4j.session();
    try {
        const result = await session.executeRead(tx => tx.run(
            'MATCH (n:Item) WHERE elementId(n) = $id RETURN n',
            { id: req.params.id }
        ));

        if (result.records.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const node = result.records[0].get('n');
        res.json(node.properties);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    } finally {
        await session.close();
    }
});

router.put('/:id', async (req, res) => {
    const session = req.app.locals.neo4j.session();
    try {
        const result = await session.executeWrite(tx => tx.run(
            `MATCH (n:Item) WHERE elementId(n) = $id
         SET n += $properties, n.updatedAt = datetime()
         RETURN n`,
            { id: req.params.id, properties: req.body }
        ));

        if (result.records.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const node = result.records[0].get('n');
        res.json(node.properties);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    } finally {
        await session.close();
    }
});

router.delete('/:id', async (req, res) => {
    const session = req.app.locals.neo4j.session();
    try {
        const result = await session.executeWrite(tx => tx.run(
            'MATCH (n:Item) WHERE elementId(n) = $id DELETE n',
            { id: req.params.id }
        ));

        if (result.summary.counters._stats.nodesDeleted === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    } finally {
        await session.close();
    }
});

module.exports = router;