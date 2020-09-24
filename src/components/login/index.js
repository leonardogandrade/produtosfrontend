import React,{Component} from 'react';
import './index.css';
import api from '../../services/api';
import {FaUserCircle} from 'react-icons/fa';

export default class Login extends Component{
    state = {
        email : '',
        senha : '',
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const response = await api.post('/autentica',{
            email : this.state.email,
            senha : this.state.senha,
        });

        if(response.data){
            localStorage.setItem('@sistemaProduto',response.data.cargo);
            this.props.history.push('/main');
        }

    }

    handleOnChange = event =>{
        this.setState({[event.target.name] : event.target.value});
    }

    render(){
        return(
            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <FaUserCircle color='#9a9ca8' size={80}/>
                    <input type='text'
                            placeholder='email@dominio.com.br'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleOnChange}/>

                    <input type='password'
                            placeholder='senha'
                            name='senha'
                            value={this.state.senha}
                            onChange={this.handleOnChange}/>

                    <button type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}