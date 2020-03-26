import connection from '../../database/connection';

const Session = () => connection('ongs');

class SessionController {
  async store(req, res) {
    const { id } = req.body;
    const ong = await Session().where({ id }).select('name').first();
  
    if (!ong) {
      return res.status(400).json({ error: 'This ONG not exists' });
    }

    return res.json(ong);
  }
}

export default new SessionController();