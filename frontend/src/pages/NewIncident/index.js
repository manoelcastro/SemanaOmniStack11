import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ value, setValue ] = useState('');

  async function handleIncidentNew(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('incident', data, {
        headers: {
          Authorization: ongId,
        }
      });
      alert('Novo caso inserido com sucesso.');
      history.push('/profile');  
    } catch (error) {
      alert('Algo errado')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleIncidentNew} >
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Titulo do caso"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em Reais"
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}