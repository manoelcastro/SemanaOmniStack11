import connection from '../../database/connection';

const Profiles = () => connection('incidents');

class ProfilesController{
  async index(req, res) {
    const ong_id = req.headers.authorization;
    const profiles = await Profiles().where({ ong_id }).select('*');
    
    return res.json(profiles);
  }
}

export default new ProfilesController();