import crypto from 'crypto';
import connection from '../../database/connection';

const Ongs = () => connection('ongs');

class OngsController {
  async index(req, res) {
    const list_ongs = await Ongs().select('*');
    
    return res.json(list_ongs);
  }
  
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await Ongs().insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
}

export default new OngsController();
