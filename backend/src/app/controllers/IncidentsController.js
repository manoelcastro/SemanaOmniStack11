import connection from '../../database/connection';

const Incidents = () => connection('incidents');

class IncidentsController{
  async index(req, res) {
    const [count] = await Incidents().count();
    const { page = 1 } = req.query;

    const incidents = await Incidents()
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);
      
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }

  async store(req, res) {
    const ong_id = req.headers.authorization;
    const { title, description, value } = req.body;
    
    const [ id ] = await Incidents().insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  }

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;
    
    const incident = await Incidents()
      .where({ id })
      .select('ong_id')
      .first();

    if (!incident) {
      return res.status(401).json({ error: 'Id not exists' });
    }
    
    if (incident.ong_id !== ong_id) {
      return res.status(401)
        .json({ error: 'Invalid operation. Check the submitted ID' });      
    }

    await Incidents().where({ id }).delete();
    
    return res.json({ message: 'Incident was removed!'});
  }
}

export default new IncidentsController();
