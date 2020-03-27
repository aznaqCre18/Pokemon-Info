import React, {Component} from 'react';
import Axios from 'axios';
import { Row, Col, Progress } from 'antd'; 
import 'antd/dist/antd.css';
import './detailPage.css';
import colorCategory from '../../../assets/helpers/colorCategory'

class DetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataSec: [],

            name: '',
            imgUrl: '',
            types: '',
            desc: '',
            weight: '',
            height: '',
            abilities: [],
            stats: {
                hp : "",
                attack: "",
                defense: "",
                speed: "",
                specialAttack: "",
                specialDefense: ""   
            },

            eggGroups: [],
            catchRate: '',
            hatchSteps: '',
        }
    }

    async componentDidMount() {
        const detailUrl = this.props.match.params.pokemonIndex;

        const detail = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${detailUrl}`)

        this.setState({
            data: detail.data,
        })

        const detailIsi = this.state.data;
        const descript = this.state.dataSec;
        console.log(descript)
        const name = detailIsi.name
                    .toLowerCase()
                    .split(' ')
                    .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                    .join(' ')
        const types =  detailIsi.types.map( type => {
            return(
                type.type.name
            )
        })
        const imgUrl = detailIsi.sprites.front_default;
        const height = Math.round((detailIsi.height * 0.328084 + 0.0001) * 100) / 100;
        const weight = Math.round((detailIsi.weight * 0.220462 + 0.0001) * 100) / 100;
        const abilities = detailIsi.abilities.map( abl => {
            return abl.ability.name
            .toLowerCase()
            .split(', ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })

        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        detailIsi.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp': 
                    hp = stat['base_stat']
                    break;
                case 'attack': 
                    attack = stat['base_stat']
                    break;
                case 'defense': 
                    defense = stat['base_stat']
                    break;
                case 'speed': 
                    speed = stat['base_stat']
                    break;
                case 'special-attack': 
                    specialAttack = stat['base_stat']
                    break;
                case 'special-defense': 
                    specialDefense = stat['base_stat']
                    break;
            }
        })

        this.setState({
            name,
            types,
            imgUrl,
            height,
            weight,
            abilities,
            stats : {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            }
        })   

        await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${detailUrl}`).then (res => {
            let desc = '';
            res.data.flavor_text_entries.some( flavor => {
                if(flavor.language.name === 'en') {
                    desc = flavor.flavor_text;
                    return desc
                }
            })
            
            let eggGroups = res.data.egg_groups;
            const catchRate = Math.round((100 / 255) * res.data.capture_rate);
            const hatchSteps = 255 * (res.data.hatch_counter + 1)

            this.setState({
                desc,
                eggGroups,
                catchRate,
                hatchSteps
            })
        })
    }


    render() {
        const tipe = this.state.types
        return (
            <>
                <div className="header">    
                        <img className="headerImg" src={require("./../../../assets/img/pokemon.png")} alt="Header" onClick={() => window.location.href="http://localhost:3000/"}/>
                            
                        <ul className="menuBar">
                            <li className="github" onClick={() => (window.open("https://github.com/aznaqCre18/"))}><div className="git">Github</div></li>
                            <li className="line">|</li>
                            <li className="linkedIn"><div className="git">About</div></li>
                        </ul>
                </div>
                <div className="detail">
                   <div className="detail-box">
                    <div className="header-detail">
                        <span>{this.state.name}</span>
                        <div className="type">
                            {tipe.length >= 1 ? 

                            this.state.types.map( (item, i) => {
                                return(
                                    <span style={{backgroundColor: `${colorCategory[item]}`}} key={i}>
                                        {
                                            item
                                            .toLowerCase()
                                            .split(' ')
                                            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                            .join(' ')
                                        }
                                    </span>
                                )
                            })
                            
                            : null}
                            
                        </div>
                    </div>
                   </div>
                    <div className="desc-detail">
                        <Row>
                            <Col span={18} push={6}>
                                <Row>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category line'>HP<br/></div>
                                                <Progress 
                                                    type="circle" 
                                                    percent={this.state.stats.hp} 
                                                    width={80}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category line'>Attack <br/></div>
                                                <Progress type="circle" percent={this.state.stats.attack} width={80} status="normal" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category line'>Defense <br/></div>
                                                <Progress type="circle" percent={this.state.stats.defense} width={80} status="normal" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category line'>Speed <br/></div>
                                                <Progress type="circle" percent={this.state.stats.speed} width={80} status="normal" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category'>Special Attack</div>
                                                <Progress type="circle" percent={this.state.stats.specialAttack} width={80} status="normal" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className="progress-detail">
                                            <div className="hp">
                                                <div className='category'>Special Deffense</div>
                                                <Progress type="circle" percent={this.state.stats.specialDefense} width={80} status="normal" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                            <div className="clear"></div>
                            <p style={{fontWeight: 'bold', paddingBottom: '10px'}}>Description</p>
                            <p className="description">
                                    {this.state.desc}
                            </p>
                            </Col>
                            <Col span={6} pull={18}>
                                <img className="img-detail" src={this.state.imgUrl} alt="Pokemon"/>
                            </Col>
                        </Row>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-title">PROFILE</div>
                        <div className="detail-info">
                            <Row>
                                <Col span={12}>
                                    <Row className="data-info"> 
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Height &nbsp; : &nbsp; &nbsp;
                                        </Col>
                                        <Col span={12}>
                                            {this.state.height} ft
                                        </Col>  
                                    </Row>
                                    <Row className="data-info">
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Weight &nbsp; : &nbsp; &nbsp;
                                        </Col>
                                        <Col span={12}>
                                            {this.state.weight} lbs
                                        </Col>  
                                    </Row>
                                    <Row className="data-info">
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Egg Groups &nbsp; : &nbsp; &nbsp;
                                        </Col>
                                        <Col span={12}>
                                            <ul>
                                                {this.state.eggGroups !== null ?
                                                    this.state.eggGroups.map ( egg => (
                                                        <li key={egg.name}>{
                                                            egg.name
                                                            .toLowerCase()
                                                            .split(', ')
                                                            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                                            .join(', ')
                                                        }</li>
                                                    ))
                                                : null}
                                            </ul>
                                        </Col>  
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span>
                                        <Row className="data-info"> 
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Catch Rate &nbsp; : &nbsp; &nbsp; 
                                        </Col>
                                        <Col span={12}>
                                            {this.state.catchRate} %
                                        </Col>  
                                    </Row>
                                    <Row className="data-info">
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Hatch Steps &nbsp; : &nbsp; &nbsp;
                                        </Col>
                                        <Col span={12}>
                                            {this.state.hatchSteps}
                                        </Col>  
                                    </Row>
                                    <Row className="data-info">
                                        <Col style={{paddingLeft: '40px', textAlign: "right"}} span={12}>
                                            Abilities &nbsp; : &nbsp; &nbsp; 
                                        </Col>
                                        <Col span={12}>
                                            <ul>
                                                {this.state.abilities !== null ?
                                                    this.state.abilities.map ( abl => (
                                                        <li key={abl}>{abl}</li>
                                                    ))
                                                : null}
                                            </ul>
                                        </Col>  
                                    </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="credits">
                        <span className="credit">Data From <a href="https://pokeapi.co/">PokeAPI.co</a></span>
                        <span className="copyright">Copyright © 2020 Aziz Nur Abdul Qodir. All Rights Reserved</span>
                    </div>
                </div>
            </>
        )
    }
}

export default DetailPage