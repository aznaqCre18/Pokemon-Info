import React, {Component} from 'react';
import { Input, Card } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import CardPokemon from './../../component/card/card';
import Dropdown from '../../component/dropdown/dropdown'

// import {getNameAction} from '../../_redux/_action/getNameAction';
//import Loading from './../../assets/img/loading.gif'
import './home.css'
const { Search } = Input;


class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            url: "https://pokeapi.co/api/v2/pokemon/",
            pokemon: null,
            isLoading: true,
            nextUrl:'',
            prevUrl: null
        }
    }

     componentDidMount(){
        this.getPokemon(null)
    }

    async getPokemon(url)
    {
        if(url === "" || url === null) {
            url = this.state.url
        }
        let res = await Axios.get(url);
        this.setState({
            isLoading: false,
            pokemon: res.data['results'],
            nextUrl: res.data.next,
            prevUrl: res.data.previous,
        }) 
    }


    next = () => {
        this.getPokemon(this.state.nextUrl)
        this.setState({isLoading: true})
    }

    prev = () => {
        this.getPokemon(this.state.prevUrl)
        this.setState({isLoading: true})
    }

    render(){
        const pokemonData = this.state.pokemon        
        return (
            <>
                <div className="container">
                    <div className="header">    
                        <img className="headerImg" src={require("./../../assets/img/pokemon.png")} alt="Header" onClick={() => window.location.href="http://localhost:3000/"}/>
                            
                        <ul className="menuBar">
                        <Search
                            className="search-bar"
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                            <li className="github" onClick={() => (window.open("https://github.com/aznaqCre18/"))}><div className="git">Github</div></li>
                            <li className="line">|</li>
                            <li className="linkedIn"><div className="git">About</div></li>
                        </ul>
                    </div>
                        <div className="wave">
                            <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EF5350" fillOpacity="1" d="M0,256L21.8,234.7C43.6,213,87,171,131,170.7C174.5,171,218,213,262,202.7C305.5,192,349,128,393,90.7C436.4,53,480,43,524,64C567.3,85,611,139,655,165.3C698.2,192,742,192,785,197.3C829.1,203,873,213,916,186.7C960,160,1004,96,1047,80C1090.9,64,1135,96,1178,106.7C1221.8,117,1265,107,1309,112C1352.7,117,1396,139,1418,149.3L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
                        </div>
                    
                    <div className="field">
                        <div className="title">P O K E M O N</div>
                        {/* <Dropdown/> */}
                        <div className="card-container">
                            {this.state.isLoading !== true ? 
                            
                            <div className="card">

                                {this.state.pokemon !== null ? this.state.pokemon.map((item, index) => {
                                    return(
                                        <CardPokemon key={index} name={item.name} url={item.url}/>
                                    )
                                }) : null}  

                            </div>

                            : <div style={{marginLeft: '300px'}}><img src={require('../../assets/img/loading.gif')} style={{width: '150px', height: '150'}}/></div>}
                            
                        <div className="clear"></div>
                        <div className="next-back">
                            {this.state.prevUrl === null ? <div className="btnDisabled">PREV</div> : <div onClick={this.prev} className="back">PREV</div>}
                            {this.state.nextUrl === null ? <div className="btnDisabled">NEXT</div> : <div onClick={this.next} className="next">NEXT</div>}
                        </div> 
                        <div className="clear"></div>
                        </div>
                    </div>
                <div className="footer">
                    Copyright © 2020 Aziz Nur Abdul Qodir. All Rights Reserved
                </div>
                </div>
            </>
        )
    }
}


export default Home