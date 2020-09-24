import React,{Component} from 'react';
import './index.css';
import api from '../../services/api';

export default class ProductRecord extends Component{
    state = {
        descricao : '',
        peso : '',
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const response = await api.post('/produtos',{
            descricao : this.state.descricao,
            peso : this.state.peso,
        });

        this.props.history.push('/main');

    }

    handleOnChange = event =>{
        this.setState({[event.target.name] : event.target.value});
    }

    render(){
        return(
            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <input type='text'
                            placeholder='Descrição do produto'
                            name='descricao'
                            value={this.state.descricao}
                            onChange={this.handleOnChange}/>

                    <input type='text'
                            placeholder='peso Kg ou g'
                            name='peso'
                            value={this.state.peso}
                            onChange={this.handleOnChange}/>

                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
        )
    }
}