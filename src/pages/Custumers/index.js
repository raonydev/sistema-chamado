import React, { useState } from 'react';
import './custumers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Custumers(){

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setendereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
       
        //para adicionar no banco do firebase
        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('custumers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=> {
                setNomeFantasia('');
                setCnpj('');
                setendereco('');
                toast.info("Empresa cadastrada com sucesso");
            })
            .catch((error)=>{
                console.log(error);
                toast.error('Erro ao cadastrar essa empresa.');
            })
            
        }else{
            toast.error('Preencha todos os campos!');
        }
       
    }
    

        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name="Clientes">
                        <FiUser size={25}/>
                    </Title>

                    <div className="container">
                        <form className="form-profile custumers" onSubmit={handleAdd}>
                            <label>Nome fantasia</label>
                            <input type="text" placeholder="Nome da sua empresa" value={nomeFantasia} onChange={(e)=> setNomeFantasia(e.target.value)}/>

                            <label>CNPJ</label>
                            <input type="text" placeholder="Seu CNPJ" value={cnpj} onChange={(e)=> setCnpj(e.target.value)}/>

                            <label>Endereço</label>
                            <input type="text" placeholder="Endereço da empresa" value={endereco} onChange={(e)=> setendereco(e.target.value)}/>

                                <button type="submit">Cadastrar</button>

                        </form>

                    </div>
                    

                </div>
            </div>
        )
}