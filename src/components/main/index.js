import React,{Component} from 'react';
import './index.css';
import api from '../../services/api';
import {Link} from 'react-router-dom';

export default class Main extends Component{
    state = {
        docs : [],
        info : [],
        page : 1,
        nome_produto : ''
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) =>{
        //Acesso ao back-end
        const result = await api.get(`/produtos?&page=${page}`);
        const { docs,...info } = result.data;
        this.setState({docs,info,page});
    }

    nextPage = () =>{
        const {page,info} = this.state;
        
        if(page == info.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    prevPage = () =>{
        const {page} = this.state;
        if(page == 1) return;

        const pageNumber = page -1;
        this.loadProducts(pageNumber);
    }

    handleOnChange = event =>{
        this.setState({nome_produto : event.target.value});
    }

    searchProducts = async () => {
        const result = await api.get(`/produtos_nome/${this.state.nome_produto}`);
        this.setState({docs : [result.data]});
    }

    handleOnSubmit = event =>{
        event.preventDefault();
        if(this.state.nome_produto){
            this.searchProducts();
        }else{
            this.loadProducts();
        }
    }

    render(){
        const { info, page } = this.state;
        return(
            <div className='product-list'>
                <div className='search'>
                    <form onSubmit={this.handleOnSubmit}>
                        <input type='text'
                                name='nome_produto'
                                placeholder='Pesquise pelo nome do produto'
                                onChange={this.handleOnChange}
                                value={this.state.nome_produto}
                        />
                        <input type='submit' hidden/>
                    </form>
                </div>


                {this.state.docs.map(product =>(
                    <article key={product._id}>
                        <strong>{product.descricao}</strong>
                        <p>{product.fabricante}</p>
                        <Link to={`/product/${product._id}`} >Detalhes</Link>
                    </article>
                ))}

                {console.log(this.state.docs)}
                <div className='actions'>
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === info.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}
