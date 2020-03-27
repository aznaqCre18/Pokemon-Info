import React, {Component} from 'react';
import { Card, Modal, Col, Row} from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios'
import typeColors from './../../assets/helpers/colorCategory'
// import ModalDetail from './../modal/modal'

class CardPokemon extends Component {
    state= {
        name: '',
        url: '',
        imageUrl: '',
        pokemonIndex:0,
        modal2Visible: false,
        pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/',
        speciesUrl: 'https://pokeapi.co/api/v2/pokemon-species/',
        
        imgUrl: '',
        desc: '',

        height: '',
        weight: '',
        types: [],
        
    }

    setModal2Visible(show) {
        this.setState({ modal2Visible:  show});
        this.handleCardClick()
    }

    dataPokemon = async (name) => {
        let data = await Axios.get(this.state.pokemonUrl + name);
        await Axios.get(this.state.speciesUrl + name).then (res => {
            let desc = '';
            res.data.flavor_text_entries.some( flavor => {
                if(flavor.language.name === 'en') {
                    desc = flavor.flavor_text;
                    return desc;
                }
            })
            this.setState({desc})
        })

        const imgUrl = data.data.sprites.front_default;
        const height = Math.round((data.data.height * 0.328084 + 0.0001) * 100) / 100;
        const weight = Math.round((data.data.weight * 0.220462 + 0.0001) * 100) / 100;
        const types = data.data.types.map( type => type.type.name);
        

        this.setState({
            imgUrl,
            types,
            height,
            weight
        })
    }

    handleCardClick = () => {
        this.dataPokemon(this.props.name)
    }

    onOk = (name) => {
        window.location.href=`http://localhost:3000/#/detail/${name}`
    }

    getImage = (url) => {
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
        return imageUrl
    }

    getIndex = (url) => {
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        return pokemonIndex
    }

    render() {
        return (
            <>
                <Card
                    type="inner"
                    hoverable
                    title={this.getIndex(this.props.url)}
                    className="card1"
                    style={{ width: 170, height: 170 }}
                    onClick={() => this.setModal2Visible(true)}
                >
                        <img alt="Pokemon Image" src={this.getImage(this.props.url)} style={{marginLeft: '-15px'}} className="image-card"/>
                        <div className="pokemonName">
                            {this.props.name
                                .toLowerCase()
                                .split(' ')
                                .map(
                                    letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                )
                            .join(' ')}
                        </div>
                </Card>
            <>
            
                <Modal
                    title={this.props.name
                            .toLowerCase()
                            .split(' ')
                            .map(
                                    letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                            )}
                    style={{fontFamily:'Segoe UI'}}
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.onOk(this.props.name)}
                    onCancel={() => this.setState({modal2Visible: false})}
                    okText="Detail"
                    cancelText="Back"
                >
                    
                    <Row>
                        <Col span={18} push={6}>
                            <div style={{fontSize: '11px'}}><b style={{fontWeight: 'bold'}}>Weight</b> &nbsp; : {this.state.weight} lbs</div>
                            <div style={{fontSize: '11px', marginBottom: '10px'}}><b style={{fontWeight: 'bold'}}>Height</b> &nbsp;  : {this.state.height} ft</div>
                            <div style={{fontWeight: 'bold', fontSize: '15px'}}>Description</div>
                            <div>{this.state.desc}</div>
                        </Col>
                        <Col span={6} pull={18}>
                            <img src={this.state.imgUrl} style={{width: '120px', height: '120px'}}/>
                            {this.state.types.map((type, i) => {
                                return(
                                <>    
                                    <span 
                                        style={
                                            {
                                                display: 'inline',
                                                marginLeft: '5px', 
                                                backgroundColor: `${typeColors[type]}`, 
                                                paddingLeft: '5px', paddingRight: '5px', 
                                                borderRadius: '3px', color: '#fff',
                                                marginTop: '10px'
                                            }
                                        } 
                                        key={i}
                                    >
                                        {type
                                            .toLowerCase()
                                            .split(' ')
                                            .map( type => type.charAt(0).toUpperCase() + type.substring(1))
                                        }
                                    </span>
                                    
                                </>
                                )
                            })}
                        </Col>
                    </Row>
                </Modal>
            </>
        </>
        )
    }
}

export default CardPokemon

